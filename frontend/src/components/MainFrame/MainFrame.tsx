import React from "react";
import FillLevelBar from "../LevelBar/LevelBar";
import SystemActivate from '../SystemActivateButton/SystemActivate';
import Orb from "../Orb/Orb";
import './style.css';
import HoloButton from "../HoloButton/HoloButton";

export default function MainFrame({ data, toggleOutput }){
    return(
        <div className='mainframe-container'>

            <div className="grid grid-cols-4 grid-rows-4 gap-7">
                    <div className="col-start-3 row-start-4"></div>
                <div className="col-start-1 row-start-4"><FillLevelBar/></div>
                <div className="col-start-2 row-start-4">12</div>
                <div className="col-start-4 row-start-1"></div>
                <div className="col-start-4 row-start-2">14</div>
                <div className="col-start-4 row-start-3">15</div>
                <div className="col-start-4 row-start-4">16</div>
                <div className="col-span-3 row-span-3 col-start-1 row-start-1">17    <HoloButton data={data} toggleOutput={toggleOutput}/></div>
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