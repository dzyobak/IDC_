// src/components/MusicPlayer.jsx
import { useEffect, useRef, useState } from "react";

const MusicPlayer = () => {
  // Playlist with song names and paths
  const [playlist, setPlaylist] = useState([
    { name: "Song 1", src: "/public/song1.mp3" },
    { name: "Song 2", src: "/public/song2.mp3" },
    { name: "Song 3", src: "/public/song3.mp3" },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play or pause the current song
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Go to the next song
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true); // Auto-play the next song
  };

  // Go to the previous song
  const previousSong = () => {
    const prevIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true); // Auto-play the previous song
  };

  // Update the audio source when the current song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSongIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, playlist]);

  return (
    <div>
      {/* Display the currently playing song name at the top */}
      {/* <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h3>Now Playing: {playlist[currentSongIndex].name}</h3>
      </div> */}

      {/* Fixed small music player under the logo */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "0px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button onClick={previousSong}>⏮️</button>
        <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <button onClick={nextSong}>⏭️</button>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        onEnded={nextSong} // Automatically play the next song when the current one ends
        loop={false}
      >
        <source src={playlist[currentSongIndex].src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
