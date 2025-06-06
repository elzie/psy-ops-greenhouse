import React, { useEffect, useState } from "react";
import FillLevelBar from "../LevelBar/LevelBar";
import SystemActivate from '../SystemActivateButton/SystemActivate';
import Orb from "../Orb/Orb";
import './style.css';
import HoloButton from "../HoloButton/HoloButton";
import HoloIndicator from "../HoloIndicator/HoloIndicator";
import GraphOne from "../Graphs/Graph_1";
import VentButton from "../Ventilation/VentButton";
import TestButton from "../TestButton/TestButton";
import HoloConsole from "../HoloConsole/HoloConsole";

export default function MainFrame({ data, toggleOutput, setMemory }:any){
    /**
     * Alle flag ligger fra 40 og op efter. 
     * Flag M40 = Vandpumpe Digital Start
     * Flag M41 = Vandpumpe Digital Stop
     * Flag M42 = Vækstlys On/Off
     * Flag M43 = Ventilation Lav
     * Flag M44 = Ventilation Høj
     * Flag M45 = Ventilation Stop
     * Flag M46 = Tagvinduer Åbne
     * Flag M47 = Tagvinduer Lukke
     * Flag M48 = Tagvinduer True/False Åbent/Lukket
     */
    const vandPumpeFlag = [40, 41];
    const vækstlysFlag = [42];
    const ventilationFlag = [43, 44, 45];
    const tagvinduerFlag = [46, 47, 48];
    

      useEffect(() => {
        
      }, []);
    return(
        <div className='mainframe-container'>

            <div className="grid grid-cols-6 grid-rows-6 gap-6 ui-container">
                <div className="col-span-4 row-span-3 ui-small-box">
                    <GraphOne data={data} />
                </div>
                <div className="col-span-2 row-span-6 ui-small-box">
                    <HoloConsole data={data} setMemory={setMemory}/>
                </div>
                <div className="col-span-4 row-start-4 ui-small-box">
                    <FillLevelBar data={data}/>
                </div>
                <div className="col-span-4 row-span-2 row-start-5 ui-small-box">
                    <div className="digitalButton">
                        <TestButton data={data} toggleOutput={toggleOutput} setMemory={setMemory} name={'VANDPUMPE'} activeFlag={vandPumpeFlag} />
                        <TestButton data={data} toggleOutput={toggleOutput} setMemory={setMemory} name={'VÆKSTLYS'} activeFlag={vækstlysFlag}/>
                        <TestButton data={data} toggleOutput={toggleOutput} setMemory={setMemory} name={'VENTILATION'} activeFlag={ventilationFlag}/>
                        <TestButton data={data} toggleOutput={toggleOutput} setMemory={setMemory} name={'TAGVINDUER'} activeFlag={tagvinduerFlag}/>
                    </div> 
                </div>
            </div>
               
            
            <div className="grid-plane">
            </div>           
        </div>
    )
}