import { useState } from "react";
import "./DrumMachine.css";
import data from "./data";
import Pad from "./Pad";

function DrumMachine() {
  const [note, setNote] = useState("");

  return (
    <div className="DM-display">
      <header className="DM-header" id="drum-machine">
        <div>
          DRUM MACHINE<br></br>
          <p id="display">{note}</p>
        </div>
        <div className="pad">
          {data.map((clip) => {
            return <Pad clip={clip} key={clip.id} setNote={setNote} />;
          })}
        </div>
      </header>
    </div>
  );
}

export default DrumMachine;
