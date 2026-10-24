let synth: SpeechSynthesis | null = null;
let voices: SpeechSynthesisVoice[] = [];

export function initSpeech() {
  if (typeof window === "undefined") return;
  synth = window.speechSynthesis;

  const loadVoices = () => {
    voices = synth?.getVoices() ?? [];
  };

  loadVoices();
  if (synth && voices.length === 0) {
    synth.onvoiceschanged = loadVoices;
  }
}

export function speak(text: string) {
  if (!synth) {
    initSpeech();
  }
  if (!synth) return;

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  const enVoice = voices.find(
    (v) => v.lang.startsWith("en") && v.name.includes("Google")
  ) ?? voices.find((v) => v.lang.startsWith("en")) ?? voices[0];

  if (enVoice) {
    utterance.voice = enVoice;
  }

  synth.speak(utterance);
}

export function stopSpeaking() {
  if (synth) {
    synth.cancel();
  }
}
