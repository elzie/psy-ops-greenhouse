import React, { useEffect, useRef } from "react";
import './style.css';


export default function HoloIndicator({ data, toggleOutput }) {
  if (!data || !data.inputs) {
    return <div>Indlæser graf...</div>;
  }  
  const checkboxRef = useRef(null);
  
    useEffect(() => {
      
      if (data && data.coils && checkboxRef.current) {
        checkboxRef.current.checked = data.coils[0] === true;
      }
    }, [data.coils?.[0]]); // kør useEffect når coil[0] ændrer sig
  
    return (
      <div className="holo-indicator-indicator-container">
        <input
          className="holo-indicator-checkbox-input"
          id="holo-indicator-check"
          type="checkbox"
          ref={checkboxRef}
        />
            <label className="holo-indicator-checkbox" htmlFor="holo-indicator-check" >
                <div className="holo-indicator-box">
                <div className="holo-indicator-inner"></div>
                <div className="scan-effect"></div>
                <div className="holo-indicator-particles">
                    <div className="holo-indicator-particle"></div>
                    <div className="holo-indicator-particle"></div>
                    <div className="holo-indicator-particle"></div>
                    <div className="holo-indicator-particle"></div>
                    <div className="holo-indicator-particle"></div>
                    <div className="holo-indicator-particle"></div>
                </div>

                <div className="activation-rings">
                    <div className="activation-ring"></div>
                    <div className="activation-ring"></div>
                    <div className="activation-ring"></div>
                </div>

                <div className="cube-transform">
                    <div className="cube-face"></div>
                    <div className="cube-face"></div>
                    <div className="cube-face"></div>
                    <div className="cube-face"></div>
                    <div className="cube-face"></div>
                    <div className="cube-face"></div>
                </div>
                </div>

                <div className="corner-accent"></div>
                <div className="corner-accent"></div>
                <div className="corner-accent"></div>
                <div className="corner-accent"></div>

                <div className="holo-indicator-glow"></div>
            </label>

                <div className="input-name" id="input-name">VANDPUMPE</div>
            <div className="status-text" id="status-text"></div>
        </div>
    );
}