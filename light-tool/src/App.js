import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Slider from "./slider";
import "./colourTemperature";
import { getRGBFromTemperature } from "./colourTemperature";
import ReactSlider from "react-slider";

function App() {
  const [temp, setTemp] = useState("rgb(255,255,255)");
  const min = 5000;
  const max = 7000;
  const def = 6000;
  const clamp = (num, min, max) => (num < min ? min : num > max ? max : num);

  const backgroundStyle = {
    background: `${temp}`,
    height: "100vh",
    minHeight: "100vh",
  };

  getRGBFromTemperature = function (tmpKelvin) {
    // All calculations require tmpKelvin \ 100, so only do the conversion once
    tmpKelvin = clamp(tmpKelvin, 1000, 40000) / 100;

    // Note: The R-squared values for each approximation follow each calculation
    return {
      r:
        tmpKelvin <= 66
          ? 255
          : clamp(
              329.698727446 * Math.pow(tmpKelvin - 60, -0.1332047592),
              0,
              255
            ), // .988

      g:
        tmpKelvin <= 66
          ? clamp(99.4708025861 * Math.log(tmpKelvin) - 161.1195681661, 0, 255) // .996
          : clamp(
              288.1221695283 * Math.pow(tmpKelvin - 60, -0.0755148492),
              0,
              255
            ), // .987

      b:
        tmpKelvin >= 66
          ? 255
          : tmpKelvin <= 19
          ? 0
          : clamp(
              138.5177312231 * Math.log(tmpKelvin - 10) - 305.0447927307,
              0,
              255
            ), // .998
    };
  };

  useEffect(() => {
    const rgbValue = getRGBFromTemperature(temp);
    const rgbString = `rgb(${rgbValue.r},${rgbValue.g}, ${rgbValue.b})`;
    setTemp(rgbString);
    console.log(getRGBFromTemperature(temp));
  }, [temp]);

  return (
    <>
      <div style={backgroundStyle}>
        <ReactSlider
          min={min}
          defaultValue={def}
          max={max}
          style="width: 100dp;"
          className="horizontal-slider"
          thumbClassName="example-thumb"
          renderThumb={(props, state) => (
            <div {...props}>{setTemp(state.valueNow)}</div>
          )}
          trackClassName="example-track"
        />
      </div>
    </>
  );
}

export default App;
