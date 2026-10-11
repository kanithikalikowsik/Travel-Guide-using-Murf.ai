import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from google import genai
import requests
import base64

load_dotenv()

frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Frontend'))

app = Flask(__name__, static_folder=frontend_dir, static_url_path='')
CORS(app)

MURF_API_KEY = os.getenv("MURF_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

PROMPTS = {
    "Summary": """
You are a professional tourist guide.
Provide a high-level overview of "{place}" in {language}.

Focus on:
- The historical significance
- Why the place is famous
- Key architectural or cultural highlights

Keep the explanation concise, engaging, and easy to follow.
Avoid excessive details and dates.
Limit the response to around 200 words.

Respond ONLY in {language}.
""",

    "Detailed": """
You are a professional tourist guide.
Provide a detailed and immersive explanation of "{place}" in {language}.

Cover:
- Historical background and timeline
- Architectural design and unique features
- Cultural importance and notable events
- Interesting facts and visitor insights

Explain concepts clearly and in a storytelling manner.
Include relevant details and examples to create a rich experience.
Limit the response to around 400 words.

Respond ONLY in {language}.
"""
}


def generate_speech(text, voice_id, locale):
    url = "https://global.api.murf.ai/v1/speech/stream"
    headers = {
        "api-key": "ap2_06c3aeb7-8b8d-4ddb-b2a2-a5b5880a339c",
        "Content-Type": "application/json"
    }
    data = {
        "voice_id": voice_id,
        "text": text,
        "locale": locale,
        "model": "FALCON",
        "format": "MP3",
        "sampleRate": 24000,
        "channelType": "MONO"
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        if response.status_code == 200:
            return response.content
        else:
            print(f"Murf API Error ({response.status_code}): {response.text}")
            return None
    except Exception as e:
        print(f"Error calling Murf API: {e}")
        return None


def generate_description(place, answer_type, language):
    if not client:
        raise ValueError("GEMINI_API_KEY environment variable is not set")
    prompt = PROMPTS[answer_type].format(place=place, language=language)
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )
    return response.text


@app.route("/", methods=["GET"])
def home():
    return send_from_directory(frontend_dir, "index.html")


@app.route("/favicon.ico", methods=["GET"])
def favicon():
    return "", 204


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "AI Travel Guide API",
        "endpoints": ["/generate-audio-guide"]
    })


@app.route("/generate-audio-guide", methods=["POST"])
def generate_audio_guide():
    data = request.json or {}
    place = data.get("place", "")
    answer_type = data.get("answerType", "Summary")
    language = data.get("language", "English")
    voice_id = data.get("voiceId", "Matthew")
    locale = data.get("locale", "en-US")

    if not place:
        return jsonify({"error": "Place name is required"}), 400

    try:
        text_description = generate_description(place, answer_type, language)
        audio_bytes = generate_speech(text_description, voice_id, locale)
        encoded_audio = base64.b64encode(audio_bytes).decode("utf-8") if audio_bytes else ""

        return jsonify({
            "description": text_description,
            "audioBase64": encoded_audio
        })
    except Exception as e:
        print(f"Error generating audio guide: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)