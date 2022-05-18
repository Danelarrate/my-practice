import "./Pomodoro.css";
import React from "react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25 * 60,
      rest: 5 * 60,
      display: 25 * 60,
      onBreak: false,
      timerOn: false,
    };
  }
  setSession = (session) => this.setState({ session });
  setRest = (rest) => this.setState({ rest });
  setDisplay = (display) => this.setState({ display });
  setOnBreak = (onBreak) => this.setState({ onBreak });
  setTimerOn = (timerOn) => this.setState({ timerOn });
  timer = (_timer) => {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  };
  Decrement = (x) => {
    if (this.state.rest > 60 && x === "break" && !this.state.timerOn) {
      this.setRest(this.state.rest - 60);
    }
    if (this.state.session > 60 && x === "session" && !this.state.timerOn) {
      this.setSession(this.state.session - 60);
      if (!this.state.timerOn) {
        this.setDisplay(this.state.session - 60);
      }
    }
  };
  Increment = (x) => {
    if (this.state.rest < 60 * 60 && x === "break" && !this.state.timerOn) {
      this.setRest(this.state.rest + 60);
    }
    if (
      this.state.session < 60 * 60 &&
      x === "session" &&
      !this.state.timerOn
    ) {
      this.setSession(this.state.session + 60);
      if (!this.state.timerOn) {
        this.setDisplay(this.state.session + 60);
      }
    }
  };
  controlTime = () => {
    let second = 1000;
    let tiempo = this.state.display;
    this.timer(tiempo);
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = this.state.onBreak;
    if (!this.state.timerOn) {
      let interval = setInterval(() => {
        let tiempo = this.state.display;
        this.timer(tiempo);
        date = new Date().getTime();
        if (date > nextDate) {
          {
            if (this.state.display <= 0 && !onBreakVariable) {
              onBreakVariable = true;
              this.setOnBreak(true);
              this.setDisplay(this.state.rest);
            } else if (this.state.display <= 0 && onBreakVariable) {
              onBreakVariable = false;
              this.setOnBreak(false);
              this.setDisplay(this.state.session);
            } else {
              this.setDisplay(this.state.display - 1);
            }
          }

          nextDate += second;
        }
      }, 1000);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (this.state.timerOn) {
      window.clearInterval(localStorage.getItem("interval-id"));
    }
    this.setTimerOn(!this.state.timerOn);
  };
  Restart = () => {
    this.setRest(5 * 60);
    this.setSession(25 * 60);
    this.setDisplay(25 * 60);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    if (this.state.timerOn) {
      this.controlTime();
      this.onBreakVariable = false;
      this.setOnBreak(false);
    }
  };
  formatTime = (tiempo) => {
    let minutes = Math.floor(tiempo / 60);
    let seconds = tiempo % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };
  formatMinute = (tiempo) => {
    let minutes = Math.floor(tiempo / 60);
    return minutes;
  };
  render() {
    return (
      <section className="section3">
        <section className="pomodoro-section">
          <div className="items-div">
            <article id="break-label" className="left">
              <span>Break Length</span>
              <div className="buttons-div">
                <button
                  onClick={() => this.Decrement("break")}
                  id="break-decrement"
                >
                  <BsChevronDoubleDown />
                </button>
                <h3 id="break-length">{this.formatMinute(this.state.rest)}</h3>
                <button
                  onClick={() => this.Increment("break")}
                  id="break-increment"
                >
                  <BsChevronDoubleUp />
                </button>
              </div>
            </article>
            <article id="session-label" className="right">
              <span>Session Length</span>
              <div className="buttons-div">
                <button
                  onClick={() => this.Decrement("session")}
                  id="session-decrement"
                >
                  <BsChevronDoubleDown />
                </button>
                <h3 id="session-length">
                  {this.formatMinute(this.state.session)}
                </h3>
                <button
                  onClick={() => this.Increment("session")}
                  id="session-increment"
                >
                  <BsChevronDoubleUp />
                </button>
              </div>
            </article>
          </div>
          <div className="display-div">
            <article className="display-article1">
              <h2 id="timer-label">
                {this.state.onBreak ? "Break" : "Session"}{" "}
              </h2>
              <h1 id="time-left">{this.formatTime(this.state.display)}</h1>
            </article>
            <article className="display-article2">
              <button onClick={this.controlTime} id="start_stop">
                {!this.state.timerOn ? <FaPlay /> : <FaPause />}
              </button>
              <button onClick={this.Restart} id="reset">
                <FaRedo />
              </button>
            </article>
          </div>
          <audio
            id="beep"
            preload="auto"
            ref={(audio) => {
              this.audioBeep = audio;
            }}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </section>
      </section>
    );
  }
}
export default Pomodoro;
