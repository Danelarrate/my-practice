import { useEffect, useState } from "react";

function Pad({ clip, setNote }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      setNote(clip.text);
      playSound();
    }
  };

  const playSound = () => {
    setNote(clip.text);
    const audio = document.getElementById(clip.keyTrigger);
    audio.currentTime = 0;
    audio.play();
    setActive(true);
    setTimeout(() => setActive(false), 200);
  };

  return (
    <button
      className={active ? "drum-pad btn active" : "drum-pad btn"}
      onClick={playSound}
      id={clip.id}
    >
      <audio id={clip.keyTrigger} src={clip.url} className="clip" />
      {clip.keyTrigger}
    </button>
  );
}

export default Pad;
