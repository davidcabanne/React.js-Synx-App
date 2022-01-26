import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./Settings.css";

const Settings = ({
  settingsOpt: { title, minValue, maxValue, minTitle, maxTitle },
  updateSetting,
}) => {
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(100);
  const handleMinValue = (e) => {
    const value = Number(e.target.value);
    setSliderMin(value);
    if (value > sliderMax) {
      setSliderMax(value);
    }
  };
  const handleMaxValue = (e) => {
    const value = Number(e.target.value);
    setSliderMax(value);
    if (value < sliderMin) {
      setSliderMin(value);
    }
  };

  useEffect(() => {
    if (sliderMin !== 0) {
      updateSetting(minTitle, sliderMin);
    }
  }, [sliderMin]);

  useEffect(() => {
    if (sliderMax !== 100) {
      updateSetting(maxTitle, sliderMax);
    }
  }, [sliderMax]);

  return (
    <div className="range-slider__container">
      <div className="range-slider__title">{title}</div>
      <div className="range-slider">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderMin}
          onInput={handleMinValue}
          onChange={handleMinValue}
        />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderMax}
          onInput={handleMaxValue}
          onChange={handleMaxValue}
        />
      </div>
      <div className="range-slider__footer">
        <div className="range-slider__value">{minValue}</div>
        <div className="range-slider__value">{maxValue}</div>
      </div>
    </div>
  );
};

export default Settings;
