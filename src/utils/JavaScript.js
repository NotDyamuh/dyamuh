export function injectJS() {
  try {
    const customCursor = document.getElementById("customCursor");
    const rainCanvas = document.getElementById("rainCanvas");

    if (!rainCanvas || !customCursor) {
      console.warn("Required elements not found. injectJS cannot initialize.");
      return;
    }

    const ctx = rainCanvas.getContext("2d");
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
    let raindrops = [];

    for (let i = 0; i < 150; i++) {
      raindrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        speed: Math.random() * 2 + 1,
        chars: generateRandomString(Math.floor(Math.random() * 15) + 10),
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    function generateRandomString(length) {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += Math.random() > 0.5 ? "1" : "0";
      }
      return result;
    }

    function drawRain() {
      ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

      ctx.font = "14px monospace";
      ctx.textAlign = "center";

      for (let drop of raindrops) {
        for (let i = 0; i < drop.chars.length; i++) {
          const charY = drop.y - i * 16;

          if (charY > -20 && charY < rainCanvas.height + 20) {
            const fadeRatio = (drop.chars.length - i) / drop.chars.length;
            const alpha = (fadeRatio * drop.opacity).toFixed(2);

            ctx.fillStyle = `rgba(0, 255, 150, ${alpha})`;

            const wobble = Math.sin(Date.now() * 0.001 + i) * 0.5;
            ctx.fillText(drop.chars[i], drop.x + wobble, charY);
          }
        }

        drop.y += drop.speed;

        if (drop.y > rainCanvas.height + drop.chars.length * 16) {
          drop.y = -drop.chars.length * 16;
          drop.x = Math.random() * rainCanvas.width;
          drop.chars = generateRandomString(
            Math.floor(Math.random() * 15) + 10
          );
          drop.opacity = Math.random() * 0.5 + 0.3;
        }

        if (Math.random() < 0.02) {
          const randomIndex = Math.floor(Math.random() * drop.chars.length);
          const newChar = Math.random() > 0.5 ? "1" : "0";
          drop.chars =
            drop.chars.substring(0, randomIndex) +
            newChar +
            drop.chars.substring(randomIndex + 1);
        }
      }
    }

    function animate() {
      drawRain();
      requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener("mousemove", (e) => {
      customCursor.style.transform = `translate(${e.clientX - 12.5}px, ${
        e.clientY - 12.5
      }px)`;
    });

    window.addEventListener("resize", () => {
      rainCanvas.width = window.innerWidth;
      rainCanvas.height = window.innerHeight;
    });

    const audio = document.getElementById("backgroundAudio");
    const playButton = document.getElementById("playButton");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const songTitle = document.getElementById("songTitle");
    const artist = document.getElementById("artist");
    const audioModal = document.getElementById("audioModal");

    // Guard against missing audio elements
    if (
      !audio ||
      !playButton ||
      !prevButton ||
      !nextButton ||
      !songTitle ||
      !artist ||
      !audioModal
    ) {
      console.warn(
        "Some audio elements are missing. Audio functionality disabled."
      );
      return;
    }

    let isPlaying = true;

    const playlist = [
      { title: "bigger thën everything", artist: "by Yeat", src: "bte.mp3" },
      { title: "2TONE", artist: "by Yeat ft. Don Toliver", src: "2TONE.mp3" }
    ];

    let currentSongIndex = 0;

    function playSong(index) {
      if (index < 0) index = playlist.length - 1;
      if (index >= playlist.length) index = 0;

      const song = playlist[index];
      audio.src = song.src;
      audio.load();
      audio
        .play()
        .then(() => {
          playButton.innerHTML = '<i class="fas fa-pause"></i>';
          isPlaying = true;
          updateSongInfo(song.title, song.artist);
          currentSongIndex = index;
        })
        .catch((error) => {
          console.error("Error playing song:", error);
          isPlaying = false;
          playButton.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    playButton.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
      }
      isPlaying = !isPlaying;
    });

    prevButton.addEventListener("click", () => {
      playSong(currentSongIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      playSong(currentSongIndex + 1);
    });

    function updateSongInfo(title, artistName) {
      songTitle.textContent = title;
      artist.textContent = artistName;
    }

    window.addEventListener("load", () => {
      playSong(currentSongIndex);
      if (!audio.paused) {
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
      }
      audioModal.style.display = "flex";
    });

    audioModal.addEventListener("click", () => {
      audioModal.style.display = "none";
      if (audio.src) {
        audio
          .play()
          .then(() => {
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
            isPlaying = false;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
          });
      } else {
        playSong(currentSongIndex);
      }
    });
  } catch (error) {
    console.error("Error in injectJS:", error);
  }
}
