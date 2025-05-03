import React from "react";
import './style.css';
import DataDisplay from "./DataDisplay";


export default function HoloConsole({ data }:any) {
    if (!data || !data.inputs) {
        return <div>Indlæser...</div>;
      }
    return (
        <div>
            <div className="console-container">
            <DataDisplay data={data} setMemory={5}/>;
            
            </div>
        </div>
    );
    // <pre>{JSON.stringify(data, null, 2)}</pre> 
}