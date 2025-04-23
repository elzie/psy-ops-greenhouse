import React, { useState } from "react";
import './style.css';


export default function TestButton({ data, toggleOutput, name, buttonState }:any) {
    if (!data || !data.inputs) {
        return <div>...</div>;
      }
    const [state, setState] = useState<1 | 2 | 3 | 4>(1);
    

    const handleClick = () => {
       setState((prev) => (prev % 4 + 1) as 1 | 2 | 3 | 4);
       console.log('click');
       if(data.coilsM[22]){
           console.log(data.coilsM[22]);
        }
    //toggleOutput(2);
    
      
    };
    
    const componentName = name;
    const className = `state-${state}`;

    return(
        <div>
            
            <div className="holo-button-container" onClick={handleClick}>
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

            <div className="holo-button-input-name" id="holo-button-input-name">{componentName}</div>
            <div className="holo-button-status-text" id="holo-button-status-text"></div>
            <div className="holo-button-data-chips">
              <div className="holo-button-data-chip">{Math.round((data.inputs[0] / 1000) * 104)}%</div>
            </div>
        </div>

        </div>
    );
}