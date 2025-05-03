import React from "react";
import './style.css';
import DataDisplay from "./DataDisplay";


export default function HoloConsole({ data, setMemory }:any) {
    if (!data || !data.inputs) {
        return <div>Indlæser...</div>;
      }
    return (
        <div>
            <div className="console-container">
            <DataDisplay data={data} setMemory={setMemory}/>
            
            </div>
        </div>
    );
    // <pre>{JSON.stringify(data, null, 2)}</pre> 
}