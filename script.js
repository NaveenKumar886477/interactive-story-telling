const storyText = document.getElementById("story-text");
const subtitleBox = document.getElementById("subtitle-box");
const startBtn = document.getElementById("start-btn");
const credits = document.getElementById("credits");
let voices = [];

speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
};

function speakCharacter(text, character) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-IN";
  const maleVoice = voices.find(v => v.name.includes("Male") || v.name.includes("Daniel") || v.name.includes("Google UK English Male"));
  const femaleVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Google UK English Female"));
  utter.voice = (character === "Meera") ? (femaleVoice || voices[0]) : (maleVoice || voices[0]);
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

function typeWriter(text, character) {
  let i = 0;
  storyText.textContent = "";
  speakCharacter(text, character);
  const interval = setInterval(() => {
    storyText.textContent += text.charAt(i++);
    if (i > text.length) clearInterval(interval);
  }, 30);
}

const timeline = [
  { delay: 0, scene: "scene-default", music: "intro-song", character: "Veeran", text: "Chennai, 2025. A silent city hides your loud past.", subtitle: "चेन्नई, 2025। एक शांत शहर तुम्हारे तूफ़ानी अतीत को छुपा रहा है।" },
  { delay: 8000, character: "Veeran", text: "At age 10, you watched your parents fall to bullets. Raised by a secret agency.", subtitle: "10 साल की उम्र में तुमने अपने माता-पिता को गोलियों से गिरते देखा। एक गुप्त एजेंसी ने तुम्हें पाला।" },
  { delay: 16000, character: "Veeran", text: "A voice note: 'Dhandapani is alive. He betrayed your family.'", subtitle: "एक आवाज़ आई: 'धंडपानी ज़िंदा है। उसी ने तुम्हारे परिवार से विश्वासघात किया था।'" },
  { delay: 24000, scene: "scene-action", music: "action-bgm", character: "Veeran", text: "You storm Ennore Port. Fists fly. Bullets blaze. You confront Dhandapani.", subtitle: "तुम एन्नोर पोर्ट पहुँचते हो। मुक्के चल रहे हैं। गोलियाँ बरस रही हैं। तुम धंडपानी का सामना करते हो।" },
  { delay: 32000, character: "Dhandapani", text: "I had no choice, Veeran. I was ordered to... protect more than destroy.", subtitle: "मेरे पास कोई चारा नहीं था, वीरन। मुझे आदेश मिला था... बचाने के लिए, न कि नष्ट करने के लिए।" },
  { delay: 40000, scene: "scene-romance", music: "love-theme", character: "Meera", text: "I'm with you. Let's finish this together.", subtitle: "मैं तुम्हारे साथ हूँ। चलो इसे साथ में खत्म करें।" },
  { delay: 48000, character: "Meera", text: "The agency that raised you also used you, Veeran.", subtitle: "जिस एजेंसी ने तुम्हें पाला, उसी ने तुम्हारा इस्तेमाल भी किया, वीरन।" },
  { delay: 56000, scene: "scene-climax", music: "climax-theme", character: "Veeran", text: "Your past choices broke you. But today you stand tall—stronger than pain.", subtitle: "तुम्हारे पुराने फैसलों ने तुम्हें तोड़ा। लेकिन आज तुम खड़े हो — दर्द से भी मजबूत।" },
  { delay: 64000, scene: "scene-success", music: "victory-theme", character: "Veeran", text: "The dawn breaks. Chennai breathes freedom again. You are Veeran.", subtitle: "सवेरा हो गया है। चेन्नई फिर से आज़ादी की साँस ले रहा है। तुम हो वीरन।" },
  { delay: 72000, credits: true }
];

function runTimeline() {
  timeline.forEach(item => {
    setTimeout(() => {
      if (item.scene) document.body.className = item.scene;
      if (item.music) playSong(item.music);
      if (item.text) typeWriter(item.text, item.character);
      if (item.subtitle) {
        subtitleBox.textContent = item.subtitle;
        subtitleBox.style.color = "yellow";
      }
      if (item.credits) {
        showCredits();
      }
    }, item.delay);
  });
}

function playSong(id) {
  const songIds = ["intro-song","love-theme","action-bgm","climax-theme","victory-theme"];
  songIds.forEach(songId => {
    const audio = document.getElementById(songId);
    if (songId === id) {
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
    }
  });
}

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  subtitleBox.style.display = "block";
  runTimeline();
});

function showCredits() {
  // Stop any playing music
  const allSongs = ["intro-song","love-theme","action-bgm","climax-theme","victory-theme"];
  allSongs.forEach(id => document.getElementById(id).pause());

  // Set background image for credits
  document.body.style.backgroundImage = "url('./images/credits-bg.jpg')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";

  // Hide subtitle and story text
  subtitleBox.style.display = "none";
  storyText.style.display = "none";

  // Show credits
  credits.style.display = "block";
}
