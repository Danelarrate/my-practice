import numbers from "./numbers";
import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [digits, setDigits] = useState("");
  const [result, setResult] = useState(digits);
  const [decimal, setDecimal] = useState("true");

  const handleDecimal = () => {
    if (decimal === "true") {
      setDecimal("false");
      setDigits(digits + ".");
    } else {
      setDigits(digits + "");
    }
  };

  const show = (operator) => {
    if (/[+*-/]/.test(operator)) {
      setDecimal("true");
    }
    if (/[+*-/]/.test(digits[digits.length - 1])) {
      let digitsArr = digits.split("");

      if (digitsArr[digitsArr.length - 1] === operator) {
        digitsArr[digitsArr.length - 1] = operator;
        setDigits(digitsArr.join(""));
      } else {
        setDigits(digits + operator);
      }
    } else {
      setDigits(digits + operator);
    }
  };

  const igual = () => {
    setDecimal("true");
    if (result !== 0) {
      let filtered = (result + digits)
        .match(/(\*|\+|\/|-)?(\.|-)?\d+/g)
        .join("");
      let sum = eval(filtered);
      setResult(sum);
    } else {
      let filtered = digits.match(/(\*|\+|\/|-)?(\.|-)?\d+/g).join("");
      let sum = eval(filtered);
      setResult(eval(sum));
    }
    setDigits("");
  };

  const clear = () => {
    setDecimal("true");
    setDigits("");
    setResult(0);
  };

  return (
    <section className="section2">
      <section className="container">
        <div style={{ height: "15%" }} className="visor-div">
          <article className="visor" id="calculator-display">
            {result === 0 ? (digits !== 0 ? digits : 0) : result}
          </article>
          <article className="visor">
            <input
              type="text"
              placeholder="0"
              disabled
              value={digits}
              id="display"
            />
          </article>
        </div>
        <div className="top-operators flex">
          <button id="clear" onClick={clear}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">
              <p>AC</p>
            </span>
          </button>
          <button id="divide" onClick={() => show("/")}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">
              <p>/</p>
            </span>
          </button>
          <button id="multiply" onClick={() => show("*")}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text">
              <p>*</p>
            </span>
          </button>
        </div>
        <div className="flex" style={{ height: "73%" }}>
          <div style={{ height: "100%", width: "75%" }}>
            <article style={{ height: "75%", width: "100%" }} className="grid">
              {numbers.map((numeros, i) => {
                return (
                  <button
                    key={i}
                    id={numeros.id}
                    onClick={() => show(numeros.numero)}
                  >
                    <span className="shadow"></span>
                    <span className="edge"></span>
                    <span className="front text">
                      <p>{numeros.numero}</p>
                    </span>
                  </button>
                );
              })}
            </article>
            <article className="flex" style={{ height: "25%", width: "100%" }}>
              <button
                id="zero"
                style={{ height: "100%", width: "66.5%" }}
                onClick={() => show("0")}
              >
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front text">
                  <p>0</p>
                </span>
              </button>
              <button
                style={{ height: "100%", width: "33.5%" }}
                onClick={handleDecimal}
                id="decimal"
              >
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front text">
                  <p>.</p>
                </span>
              </button>
            </article>
          </div>
          <div style={{ height: "100%", width: "25%" }}>
            <button
              style={{ height: "25%", width: "100%" }}
              onClick={() => show("-")}
              id="subtract"
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">
                <p>-</p>
              </span>
            </button>
            <button
              style={{ height: "25%", width: "100%" }}
              onClick={() => show("+")}
              id="add"
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">
                <p>+</p>
              </span>
            </button>
            <button
              style={{ height: "49%", width: "100%" }}
              onClick={igual}
              id="equals"
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text equal">
                <p>=</p>
              </span>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Calculator;
