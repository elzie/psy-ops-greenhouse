import React from "react";
import './style.css';

type StateToggleProps = {
    state: 1 | 2 | 3 | 4;
    onClick?: () => void;
  };
export default function TestButton({state, onClick}:any) {
    const className = `state-toggle state-${state}`;

    return(
        <div>
            
            <div className="holo-button-container" onClick={onClick}>
            <div className={className}></div>
            <label className="holo-button-checkbox"  htmlFor="holo-button-check" >
                <div className="holo-button-box">
                <div className="holo-button-inner"></div>
                <div className="holo-button-scan-effect"></div>
                <div className="holo-button-particles">
                    <div className="holo-button-particle"></div>
                    <div className="holo-button-particle"></div>
                    <div className="holo-button-particle"></div>
                    <div className="holo-button-particle"></div>
                    <div className="holo-button-particle"></div>
                    <div className="holo-button-particle"></div>
                </div>

                <div className="holo-button-activation-rings">
                    <div className="holo-button-activation-ring"></div>
                    <div className="holo-button-activation-ring"></div>
                    <div className="holo-button-activation-ring"></div>
                </div>

                <div className="holo-button-cube-transform">
                    <div className="holo-button-cube-face"></div>
                    <div className="holo-button-cube-face"></div>
                    <div className="holo-button-cube-face"></div>
                    <div className="holo-button-cube-face"></div>
                    <div className="holo-button-cube-face"></div>
                    <div className="holo-button-cube-face"></div>
                </div>
                </div>

                <div className="holo-button-corner-accent"></div>
                <div className="holo-button-corner-accent"></div>
                <div className="holo-button-corner-accent"></div>
                <div className="holo-button-corner-accent"></div>

                <div className="holo-button-holo-button-glow"></div>
            </label>

            <div className="holo-button-input-name" id="holo-button-input-name">name</div>
            <div className="holo-button-status-text" id="holo-button-status-text"></div>
            <div className="holo-button-data-chips">
              <div className="holo-button-data-chip">dataChip</div>
            </div>
        </div>

        </div>
    );
}