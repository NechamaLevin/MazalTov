// MusicNotes.js
import React, { useEffect, useState } from "react";
import "./MusicNotes.css";

const MusicNotes = ({ isPlaying }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 80 + 10;
      setNotes((prev) => [...prev, { id, left }]);
      setTimeout(() => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
      }, 3000);
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="notes-container">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{ left: `${note.left}%` }}
        >
          🎶
        </div>
      ))}
    </div>
  );
};

export default MusicNotes;
