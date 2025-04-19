import React from "react";
import FillLevelBar from "../LevelBar/LevelBar";
import SystemActivate from '../SystemActivateButton/SystemActivate';
import Orb from "../Orb/Orb";
import './style.css';
import HoloButton from "../HoloButton/HoloButton";
import HoloIndicator from "../HoloIndicator/HoloIndicator";
import GraphOne from "../Graphs/Graph_1";

export default function MainFrame({ data, toggleOutput }){
    
    return(
        <div className='mainframe-container'>

            <div className="grid grid-cols-3 grid-rows-4 gap-7  ui-container">
                <div className="row-span-2 col-start-3 row-start-1 ui-small-box">
                
                
                1
                </div>
                <div className="col-start-3 row-start-3 ui-small-box">2
                <HoloButton data={data} toggleOutput={toggleOutput}/>
                <HoloIndicator data={data} toggleOutput={toggleOutput}/>
                <div>
            
            </div>
                </div>
                <div className="col-start-3 row-start-4 ui-small-box">3</div>
                <div className="col-span-2 row-span-2 col-start-1 row-start-1 ui-small-box">4</div>
                <div className="row-span-2 col-start-1 row-start-3 ui-small-box">
                
                5
                
                <GraphOne data={data} />
                </div>
                <div className="row-span-2 col-start-2 row-start- ui-main-box3">
                <FillLevelBar data={data}/>
                    6
                </div>
            </div>
                
            

    
            <div className="stars-container">
            <div className="star-layer"></div>
            <div className="star-layer"></div>
            <div className="star-layer"></div>
            </div>
            <div className="grid-plane">
            </div>
             
           
        </div>
    )
}