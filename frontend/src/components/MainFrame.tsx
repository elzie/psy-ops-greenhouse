import React from "react";

export default function MainFrame({ data, toggleOutput }){
    return(
        <div>
            <button onClick={() => toggleOutput(2)}>Tænd Output 3</button>
        </div>
    )
}