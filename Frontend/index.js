// --- Constants ---
const VOICES = {
  English: { Male: "Matthew", Female: "Alicia" },
  Hindi: { Male: "Aman", Female: "Namrita" },
  Tamil: { Male: "Murali", Female: "Iniya" },
  Telugu: { Male: "Zion", Female: "Josie" }
};

const LOCALES = {
  English: "en-US",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN"
};


// --- State ---
const state = {
  place: '',
  image: '',
  length: 'Summary',
  voice: 'Male'
};

// --- DOM Elements ---
const cardsContainer = document.querySelector('.cards');
const experiencePanel = document.getElementById('experience');
const previewTitle = document.getElementById('previewTitle');
const audioSection = document.getElementById('audioSection');
const audioPlayer = document.getElementById('audioPlayer');
const transcriptText = document.getElementById('scriptText');
const generateButton = document.getElementById('generateBtn');
const languageSelect = document.getElementById('selectLanguage');
const closeButton = document.getElementById('closeExperience');
const searchPreviewCard = document.getElementById('searchPreviewCard');
const searchPreviewImage = document.getElementById('searchPreviewImage');
const searchPreviewTitle = document.getElementById('searchPreviewTitle');
const transcriptToggle = document.getElementById('transcriptToggle');
const transcriptContent = document.getElementById('transcriptContent');
const transcriptArrow = document.getElementById('transcriptArrow');

// --- Functions ---

function selectDestination(place, image, clickedCard = null) {
  state.place = place;
  state.image = image;

  // Update UI content
  previewTitle.textContent = place;
  cardsContainer.classList.add('faded');

  // Reset previous states
  document.querySelectorAll('.place-card').forEach(card => card.classList.remove('active'));
  searchPreviewCard.classList.add('hidden');

  // Handle Card Visibility
  if (clickedCard) {
    clickedCard.classList.add('active');
  } else {
    // If it's a search result, show the preview card
    searchPreviewImage.src = image;
    searchPreviewTitle.textContent = place;
    searchPreviewCard.classList.remove('hidden');
    searchPreviewCard.classList.add('active');
  }

  // Reset Audio Panel
  audioSection.classList.add('hidden');
  audioPlayer.src = '';
  transcriptText.textContent = '';
  generateButton.textContent = 'Generate Audio Guide';
  generateButton.disabled = false;

  // Show Panel with animation
  experiencePanel.classList.remove('hidden');
  setTimeout(() => {
    experiencePanel.classList.add('visible');
  }, 10);
}

function deselectDestination() {
  experiencePanel.classList.remove('visible');

  // Wait for animation to finish before hiding
  setTimeout(() => {
    experiencePanel.classList.add('hidden');
    cardsContainer.classList.remove('faded');
    searchPreviewCard.classList.add('hidden');
    document.querySelectorAll('.place-card').forEach(card => card.classList.remove('active'));
  }, 300);
}

// --- Event Listeners ---

// Close Button
closeButton.addEventListener('click', deselectDestination);

// Card Clicks
document.querySelectorAll('.place-card:not(.search-preview-card)').forEach(card => {
  card.addEventListener('click', () => {
    selectDestination(card.dataset.place, card.dataset.image, card);
  });
});

// Option Toggles (History Type)
const lengthButtons = document.querySelectorAll('[data-group="length"] button');
lengthButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    lengthButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.length = btn.dataset.value;
  });
});

// Option Toggles (Voice Gender)
const voiceButtons = document.querySelectorAll('[data-group="voice"] button');
voiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    voiceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.voice = btn.dataset.value;
  });
});


// Generate Audio guide button Logic

const GENERATE_AUDIO_GUIDE_API_URL = "http://127.0.0.1:5000/generate-audio-guide";

generateButton.addEventListener('click', async () => {
  generateButton.disabled = true;
  generateButton.textContent = '⏳ Generating Audio...';

  try {
    const selectedLanguage = languageSelect.value;
    const selectedVoice = state.voice;

    const response = await fetch(GENERATE_AUDIO_GUIDE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place: state.place,
        answerType: state.length,
        language: selectedLanguage,
        voiceId: VOICES[selectedLanguage][selectedVoice],
        locale: LOCALES[selectedLanguage]
      })
    });

    if (!response.ok) throw new Error('Generation failed');

    const data = await response.json();

    // Update UI with Result
    transcriptText.textContent = data.description;
    audioSection.classList.remove('hidden');

    if (data.audioBase64) {
      audioPlayer.src = `data:audio/mp3;base64,${data.audioBase64}`;
      audioPlayer.load();
      audioPlayer.classList.remove('hidden');
      generateButton.textContent = 'Listen to Audio';
    } else {
      audioPlayer.classList.add('hidden');
      generateButton.textContent = 'Audio Not Available';
    }

  } catch (err) {
    console.error(err);
    alert('Generation failed. Please check your connection.');
    generateButton.textContent = 'Generate Audio Guide';
    generateButton.disabled = false;
  }
});

// Transcript Toggle
transcriptToggle.addEventListener('click', () => {
  transcriptContent.classList.toggle('hidden');
  transcriptArrow.classList.toggle('rotate-180');
});
