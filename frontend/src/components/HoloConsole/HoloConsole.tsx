import React from "react";
import './style.css';


export default function HoloConsole({ data }:any) {
    if (!data || !data.inputs) {
        return <div>Indlæser...</div>;
      }
    return (
        <div>
            <div className="console-container">
            {JSON.stringify(data, null, 2)}
            </div>
        </div>
    );
}