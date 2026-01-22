document.getElementById("start").addEventListener("click", async () => {
  console.log("✅ Button clicked");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("🎤 Mic permission granted", stream);
  } catch (e) {
    alert("❌ Microphone permission denied");
    console.error(e);
    return;
  }

  alert("🎙 Listening started");

  const recognition = new webkitSpeechRecognition();
  recognition.lang = document.getElementById("lang").value;
  recognition.continuous = true;

  recognition.onstart = () => {
    console.log("🟢 Speech recognition started");
  };

  recognition.onresult = (event) => {
    const text = event.results[event.results.length - 1][0].transcript;
    console.log("📝 Detected:", text);

    const speak = new SpeechSynthesisUtterance(text);
    speak.lang = "hi-IN";
    speechSynthesis.speak(speak);
  };

  recognition.onerror = (e) => {
    console.error("❌ Speech error:", e);
    alert("Speech error: " + e.error);
  };

  recognition.start();
});
