import React, { useEffect, useRef, useState } from "react";
import './style.css';


export default function TestButton({ data, toggleOutput, setMemory, name, activeFlag }:any) {
    if (!data || !data.inputs) {
        return <div>...</div>;
      }
    const [state, setState] = useState<1 | 2 | 3 | 4>(1);
    const flag = activeFlag;
    const componentName = name;
    const className = `state-${state}`;
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        switch (name) {
            case 'VÆKSTLYS':
              handleVækstlys(flag);
              break;
            case 'VANDPUMPE':
              handleVandpumpe();
              break;
            case 'VENTILATION':
              handleVentilation();
              break;
            case 'VINDUER':
              handleVinduer();
              break;
            default:
              console.log('Ukendt navn:', name);
              break;
          }
    }
    
    const handleVækstlys = (flag:any) => {
        console.log('VÆKSTLYS', flag);
        setMemory(flag[0]);
    }

    const handleVandpumpe = () => {
      if(data.coils[0] === false){
      setMemory(flag[0]);
      setTimeout(() => {
          console.log('VANDPUMPE');
        
          setMemory(flag[0]);
        }, 1000);
      }
    }
    
    const handleVentilation = () => {

    }

    const handleVinduer = () => {
        console.log('VINDUER');
    }

 
const handleMouseDown = () => {
  console.log('mouse down');
  longPressTimeout.current = setTimeout(() => {
    console.log("Holdt nede i 2 sek � skifter til state 4");
    setState(4);
  }, 2000);
}

const handleMouseUp = () => {
  console.log('mouse up');
  if (longPressTimeout.current) {
    clearTimeout(longPressTimeout.current);
    longPressTimeout.current = null;

    if (state === 4) {
      console.log("Slipper knap � tilbage til state 1");
      setInitialized(false);
      setState(1);
    }
  }
}

useEffect(() => {
  if (!data?.coils || typeof data.coils[0] !== 'boolean') return;
  /**
   * 
   */
  switch (name) {
    case 'VÆKSTLYS':
      if(data.coils[1] === true){
        setState(2);
      } else {
        setState(1);
      }
      break;
    case 'VANDPUMPE':
      if(data.coils[0] === true && data.coilsM[0] === true){
        setState(2);
      } else if(data.coils[0] === false) {
        setState(1);
        
      }
      
      break;
    case 'VENTILATION':
      
      break;
    case 'VINDUER':
      
      break;
    default:
      console.log('Ukendt navn:', name);
      break;
  }
}, [data.coils]);
    

    return(
        <div>
            
            <div className="holo-button-container" 
              onMouseDown={handleMouseDown}
              onClick={handleClick}
              onMouseUp={handleMouseUp}
              >
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


