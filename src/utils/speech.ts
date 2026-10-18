/**
 * Audio Speech Synthesis for Japanese vocabulary
 */
export const speakJapanese = (text: string, rate: number = 0.9) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Clean text from symbols like "〜", "(お)", etc. for clean pronunciation
  const cleanText = text
    .replace(/[〜~]/g, '')
    .replace(/[()（）]/g, '')
    .replace(/[？?!！]/g, '')
    .trim();

  if (!cleanText) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = rate; // 0.85 or 0.9 for clear study pronunciation

    // Find best Japanese voice if available
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(
      (v) => v.lang === 'ja-JP' || v.lang.startsWith('ja')
    );
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Speech synthesis error:', err);
  }
};
