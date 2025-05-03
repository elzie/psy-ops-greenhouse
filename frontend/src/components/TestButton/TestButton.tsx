import React, { useEffect, useRef, useState } from "react";
import './style.css';


export default function TestButton({ data, toggleOutput, setMemory, name, activeFlag }:any) {
    if (!data || !data.inputs) {
        return <div>...</div>;
      }
    const [state, setState] = useState<1 | 2 | 3 | 4>(1);
    const [mouseState, setMouseState] = useState(false);
    const [tagVinduer, setTagvinduer] = useState(false);
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
              handleVandpumpe(flag);
              break;
            case 'VENTILATION':
              handleVentilation(flag);
              break;
            case 'VINDUER':
              handleVinduer(flag);
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

    const handleVandpumpe = (flag:any) => {
      if(data.coils[0] === false){
      console.log('VANDPUMPE');
      setMemory(flag[0]);
      setTimeout(() => {
          setMemory(flag[0]);
        }, 1000);
      }
    }
    /**
     * Alle flag ligger fra 40 og op efter. 
     * Q1 - Flag M40 = Vandpumpe Digital Start
     * Q1 - Flag M41 = Vandpumpe Digital Stop
     * Q2 - Flag M42 = Vækstlys On/Off
     * Q3 - Flag M43 = Ventilation Lav
     * ---------
     * Q4 + Q5 - Flag M44 = Ventilation Høj
     * I9 - Flag M45 = Ventilation Aktivering true/false
     * Q6 - Flag M46 = Tagvinduer Åbne
     * Q7 - Flag M47 = Tagvinduer Lukke
     * I11 - Flag 48 = er tagvinduer åbne eller lukkede? 
     */
    const firstClick = useRef(true);
    const handleVentilation = (flag:any) => {
      if (firstClick.current) {
        // FIRST click behavior (exactly as before)
        setMemory(flag[2]);   // M45
        setTimeout(() => {
          setMemory(flag[0]); // M43
          
        }, 200);
      } else {
        // SECOND click behavior
        setTimeout(() => {
          setMemory(flag[1]); // M44 after 5s
        }, 5000);
      }
  
      // flip for next time
      firstClick.current = !firstClick.current;
    }

    const handleVinduer = (flag:any) => {
        console.log('VINDUER');
        // 46 åbn, 47 luk
        setMemory(flag[0]);
    }

 
const handleMouseDown = () => {
  console.log('mouse down');
  longPressTimeout.current = setTimeout(() => {
    console.log("Holdt nede i 2 sek - skifter til state 4");
    setMouseState(true);
    setState(4);
  }, 1000);
}

const handleMouseUp = () => {
  console.log('mouse up');
  
  
  if (longPressTimeout.current) {
    clearTimeout(longPressTimeout.current);
    longPressTimeout.current = null;
    
    if (state === 4) {
      console.log("Slipper knap - tilbage til state 1");
      setMemory(flag[1]);
      setMouseState(false);
      setState(1);
      setTimeout(() => {
        setMemory(flag[1]);
      }, 650);
    }
  }
}
const handleSomething = (() => {
  /**
     * Alle flag ligger fra 40 og op efter. 
     * Q1 - Flag M40 = Vandpumpe Digital Start
     * Q1 - Flag M41 = Vandpumpe Digital Stop
     * Q2 - Flag M42 = Vækstlys On/Off
     * Q3 - Flag M43 = Ventilation Lav
     * Q4 + Q5 - Flag M44 = Ventilation Høj
     * I9 - Flag M45 = Ventilation Stop
     * Q6 - Flag M46 = Tagvinduer Åbne
     * Q7 - Flag M47 = Tagvinduer Lukke
     */
  switch (name) {
    case 'VANDPUMPE':
        if (data.coils[0] === true && mouseState === true) {
          setState(4);
        }
        else if (data.coils[0] === true) {
          setState(2);
        }
        else {
          setState(1);
        }
        break;
    case 'VÆKSTLYS':
      if(data.coils[1] === true){
        setState(2);
      } else {
        setState(1);
      }
      break;
      
    case 'VENTILATION':
      if ((data.coils[2] === true || data.coils[4] === true) && mouseState === true) {
        setState(4);
      }
      else if (data.coils[2] === true) {
        setState(2);
      }
      else if (data.coils[4] === true) {
        setState(3);
      }
      else {
        setState(1);
      }
      
      break;
    case 'VINDUER':
      if (data.coils[6] === true && mouseState === true) {
        setState(4);
      }
      else if (data.coils[6] === true && tagVinduer === false) {
        setState(2);
      }
      else if (data.coils[7] === true && tagVinduer === true) {
        setState(3);
      }
      else {
        setState(1);
      }
      
      break;
    default:
      console.log('Ukendt navn:', name);
      break;
  }
});

useEffect(() => {
  if (!data?.coils || typeof data.coils[0] !== 'boolean') return;
  /**
   * 
   */
  handleSomething();
  
}, [data.coils[0], handleSomething]);
    

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


