import React from "react";

export const SelectBox = ({setData, elements}) =>{
    return(
        <select onChange={e => setData(e.target.value)}>
            {elements.map(e => <option key={e[0]} value={e[1]}>{e[1]}</option>)}
        </select>
    );
}