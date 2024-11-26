// script.js
document.addEventListener("DOMContentLoaded", () => {
    const moodButtons = document.querySelectorAll(".mood-options button");
    const moodList = document.getElementById("mood-list");
    const quoteDiv = document.getElementById("quote");
    const playlistDiv = document.getElementById("playlist");
  
    const moodHistory = JSON.parse(localStorage.getItem("moods")) || [];
    updateMoodList();
  
    const moodStyles = {
      "😊": { background: "#ffeb3b", text: "#333" },
      "😢": { background: "#90caf9", text: "#000" },
      "😡": { background: "#ef5350", text: "#000" },
      "😌": { background: "#a5d6a7", text: "#000" },
      "🤔": { background: "#ce93d8", text: "#000" },
    };
  
    const playlists = {
      "😊": "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC", // Feel Good
      "😢": "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1", // Sad Songs
      "😡": "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U", // Anger Release
      "😌": "https://open.spotify.com/playlist/37i9dQZF1DWVzZlRWgqAGH", // Chill Vibes
      "🤔": "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS", // Thoughtful Tracks
    };
  
    moodButtons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
  
        button.style.setProperty("--rotateX", `${-y / 10}deg`);
        button.style.setProperty("--rotateY", `${x / 10}deg`);
      });
  
      button.addEventListener("mouseleave", () => {
        button.style.setProperty("--rotateX", "0deg");
        button.style.setProperty("--rotateY", "0deg");
      });
  
      button.addEventListener("click", () => {
        const mood = button.getAttribute("data-mood");
        const today = new Date().toLocaleDateString();
  
        // Update Mood History
        moodHistory.push({ mood, date: today });
        localStorage.setItem("moods", JSON.stringify(moodHistory));
        updateMoodList();
  
        // Update Background and Text Color
        const { background, text } = moodStyles[mood] || {};
        document.body.style.backgroundColor = background || "#f4f6f8";
        document.body.style.setProperty("--textColor", text || "#333");
  
        // Display Quote
        const quote = getQuote(mood);
        quoteDiv.textContent = `Quote for you: "${quote}"`;
  
        // Suggest Playlist
        const playlistURL = playlists[mood];
        playlistDiv.innerHTML = `Suggested Playlist: <a href="${playlistURL}" target="_blank">Listen on Spotify</a>`;
      });
    });
  
    function updateMoodList() {
      moodList.innerHTML = ""; // Clear list
      moodHistory.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.date}: ${entry.mood}`;
        moodList.appendChild(li);
      });
    }
  
    function getQuote(mood) {
      const quotes = {
        "😊": "Keep shining, you're doing amazing!",
        "😢": "It's okay to feel down. Better days are coming!",
        "😡": "Take a deep breath. Let it go.",
        "😌": "Relaxation is key to a healthy mind.",
        "🤔": "Reflect and grow; you're on the right path!",
      };
      return quotes[mood] || "Stay awesome!";
    }
  });
  