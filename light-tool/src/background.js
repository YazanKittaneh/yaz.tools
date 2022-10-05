import React, { useState, useEffect } from "react";
import "./App.css";
import Slider from "./slider";
import ReactSlider from "react-slider";

function App() {
  const [temp, setTemp] = useState(0);

  return (
    <>
      <Slider></Slider>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </>
  );
}

export default App;
