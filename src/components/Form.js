import React from "react";
import "./Form.css"
import Palette from "./Palette"

const Form = ({value, onChange, onCreate, onKeyPress, colors, onColor, onSelect}) => {
    return(
        <div>
            <Palette colors={colors} selected={onColor} onSelect={onSelect}  />
            <div className="form">
                <input value={value} onChange={onChange} onKeyPress={onKeyPress} className={onColor} />
                <div className="create-button" onClick={onCreate}>추가</div>
            </div>
        </div>
    );
}

export default Form;