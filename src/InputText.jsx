import React from "react";

export const InputText = ({ type, disabled, label, data, setData }) => {

    return (
        <div className="mb-3">
            {
                label ? <label>{label}</label> : <></>
            }
            <input type={type ? `${type}` : `text`} className="form-control"
                disabled={disabled} value={data}
                onChange={type == "tel" ? e => {
                    if(/^\d*$/.test(e.target.value)) setData(e.target.value);
                } : e => {
                    setData(e.target.value);
                }} />
        </div>
    );
}