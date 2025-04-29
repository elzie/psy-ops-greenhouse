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

    const handleClick = () => {
        switch (name) {
            case 'VÆKSTLYS':
              handleVækstlys(flag);
              break;
            case 'VANDPUMPE':
              handleVandpumpe(flag);
              break;
            case 'VENTILATION':
              handleVentilation(flag, state);
              break;
            case 'VINDUER':
              handleVinduer(flag);
              break;
            default:
              console.log('Ukendt navn:', name);
              break;
          }
    //   setState((prev) => (prev % 4 + 1) as 1 | 2 | 3 | 4);
    //    console.log('flag:', flag[0]);
    //    setMemory(flag[0]);

    }
    
    const handleVækstlys = (flag:any) => {
        console.log('VÆKSTLYS', flag);
        setState((prev) => (prev % 2 + 1) as 1 | 2 );
        //setState(2);
        setMemory(flag[0]);
        // ??? - flag fejl.. 
        
    }


    
    const handleVandpumpe = (flag:any) => {
        console.log('VANDPUMPE');
        setState((prev) => {
          if (prev === 1) {
            setMemory(flag[0]);
            startMonitoringForFalse(); // se nedenfor
            return 2;
          }
          return prev; // g�r ikke noget hvis vi allerede er i 2
        });
    }


    const startMonitoringForFalse = () => {
      const interval = setInterval(() => {
        if (data?.coils?.[1] === false) {
          console.log('coil[1] er false, skifter tilbage til state 1');
          setState(1);
          setMemory(flag[0]);
          clearInterval(interval);
        }
      }, 500); // tjek fx hvert halve sekund
    };


    // const [state, setState] = useState(3);
    const [initialized, setInitialized] = useState(false);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
    
    let holdTimeout:any = null;

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
const handleVentilation = (flag: any, state: number) => {
        // Normal klik-logik
        if (state === 1 && !initialized) {
            console.log("F�rste klik � fra state 1 til 3");
            setState(3);
            setInitialized(true);
        
            setTimeout(() => {
              console.log("5 sekunder er g�et � skifter til state 2");
              setState(2);
            }, 5000);
          } else if (state === 2) {
            console.log("Klik: fra state 2 til 3");
            setState(3);
          } else if (state === 3) {
            console.log("Klik: fra state 3 til 2");
            setState(2);
          }
        //if(flag[1]) console.log('ventilation flag 2 stop stop stop', flag[1])
    
        throw new Error("Function not implemented.");
    }
    const handleVinduer = (flag:any) => {
        console.log('VINDUER');
    }
useEffect(() => {
      
      
    }, [data.coils]); // kør useEffect når coil[0] ændrer sig
    

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


