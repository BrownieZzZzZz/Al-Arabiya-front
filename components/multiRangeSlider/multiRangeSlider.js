"use client";

import  { useCallback, useEffect, useState, useRef } from "react";
import "./multiRangeSlider.css";
import { useSearchParams } from "next/navigation";

const MultiRangeSlider = ({ changePrice }) => {
  const useParams = useSearchParams();
  const min = parseInt(useParams.get("minPrice")) || 0;
  const max = parseInt(useParams.get("maxPrice")) || 500;
  const minRange = 0;
  const maxRange = 500;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert value to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
    [minRange, maxRange],
  );

  // Update slider with values from search params
  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
    minValRef.current = min;
    maxValRef.current = max;
  }, [min, max]);

  // Update the range style
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.right = `${minPercent}%`;
      range.current.style.left = `${100 - maxPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Handle min input change
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
    minValRef.current = value;
    changePrice(value, maxVal);
  };

  // Handle max input change
  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
    maxValRef.current = value;
    changePrice(minVal, value);
  };

  return (
    <div className="container mb-6" dir="rtl">
      <input
        type="range"
        min={minRange}
        max={maxRange}
        value={minVal}
        onChange={handleMinChange}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={minRange}
        max={maxRange}
        value={maxVal}
        onChange={handleMaxChange}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track overflow-hidden">
          <div ref={range} className="slider__range" />
        </div>
        <div
          className="slider__left-value text-lg font-medium text-[var(--theme)]"
          dir="ltr"
        >
          {`${maxVal}DT`}
        </div>
        <div
          className="slider__right-value text-lg font-medium text-[var(--theme)]"
          dir="ltr"
        >
          {`${minVal}DT`}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
