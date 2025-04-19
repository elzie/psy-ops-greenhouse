import React from "react";
import './style.css';

export default function Coils({ data }){

    return(
        <div>
            <h2>Coil Data:</h2>
            {Array.isArray(data.coils) ? (
              <ul>
                {data.coils.map((coil, index) => (
                  <li key={index}>{`Coil ${index + 1}: ${
                    coil ? 'ON' : 'OFF'
                  }`}</li>
                ))}
              </ul>
            ) : (
              <div>
                Coil data er ikke et array, men: {JSON.stringify(data.coils)}
              </div>
            )}
        </div>
    );

}