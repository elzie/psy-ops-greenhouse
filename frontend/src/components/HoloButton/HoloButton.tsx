import React from "react";
import './style.css';

export default function HoloButton({data, toggleOutput}){
    
    return(
        <div className="holobutton-container">
            
            <input className="holo-checkbox-input" id="holo-check" type="checkbox" onClick={() => toggleOutput(2)} />
            <label className="holo-checkbox" htmlFor="holo-check">
                <div className="holo-box">
                <div className="holo-inner"></div>
                <div className="scan-effect"></div>
                <div className="holo-particles">
                    <div className="holo-particle"></div>
                    <div className="holo-particle"></div>
                    <div className="holo-particle"></div>
                    <div className="holo-particle"></div>
                    <div className="holo-particle"></div>
                    <div className="holo-particle"></div>
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

                <div className="holo-glow"></div>
            </label>

            <div className="input-name" id="input-name">VÆKSTLYS</div>
            <div className="status-text" id="status-text"></div>
        </div>
    );
    
}