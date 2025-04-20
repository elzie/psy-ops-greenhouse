import React, { useEffect, useRef } from "react";
import './style.css';


export default function VentButton({ data, toggleOutput, setMemory, name }:any) {
  if (!data || !data.inputs) {
    return <div>Indlæser...</div>;
  }  
  const checkboxRef = useRef(null);
  const dataChip = 'Ventilation Høj/lav';

  function checkAndStyleHoloVent() {
    const input = document.getElementById('holo-vent-box') as HTMLInputElement | null;
    input?.classList.add('error');
  }

    useEffect(() => {
      
      if (data && data.coils && checkboxRef.current) {
        checkboxRef.current.checked = data.coils[3] === true;
      }
    }, [data.coils?.[3]]); // kør useEffect når coil[0] ændrer sig
  
    return (
      <div className="holo-vent-container">
        <input
          className="holo-vent-checkbox-input"
          id="holo-vent-check"
          type="checkbox"
          ref={checkboxRef}
          onClick={() => checkAndStyleHoloVent()}
          
        />
            <label className="holo-vent-checkbox" htmlFor="holo-vent-check" >
                <div className="holo-vent-box">
                <div className="holo-vent-inner"></div>
                <div className="holo-vent-scan-effect"></div>
                <div className="holo-vent-particles">
                    <div className="holo-vent-particle"></div>
                    <div className="holo-vent-particle"></div>
                    <div className="holo-vent-particle"></div>
                    <div className="holo-vent-particle"></div>
                    <div className="holo-vent-particle"></div>
                    <div className="holo-vent-particle"></div>
                </div>

                <div className="holo-vent-activation-rings">
                    <div className="holo-vent-activation-ring"></div>
                    <div className="holo-vent-activation-ring"></div>
                    <div className="holo-vent-activation-ring"></div>
                </div>

                <div className="holo-vent-cube-transform">
                    <div className="holo-vent-cube-face"></div>
                    <div className="holo-vent-cube-face"></div>
                    <div className="holo-vent-cube-face"></div>
                    <div className="holo-vent-cube-face"></div>
                    <div className="holo-vent-cube-face"></div>
                    <div className="holo-vent-cube-face"></div>
                </div>
                </div>

                <div className="holo-vent-corner-accent"></div>
                <div className="holo-vent-corner-accent"></div>
                <div className="holo-vent-corner-accent"></div>
                <div className="holo-vent-corner-accent"></div>

                <div className="holo-vent-holo-vent-glow"></div>
            </label>

            <div className="holo-vent-input-name" id="holo-vent-input-name">{name}</div>
            <div className="holo-vent-status-text" id="holo-vent-status-text"></div>
            <div className="holo-vent-data-chips">
              <div className="holo-vent-data-chip">{dataChip}</div>
            </div>
        </div>
    );
}