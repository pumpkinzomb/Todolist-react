import React from "react";
import "./Form.css"
import Palette from "./Palette"

const Form = ({value, onChange, onCreate, onKeyPress,colors,onColor,selected,onSelect}) => {
    return(
        <div className="form">
            <input value={value} onChange={onChange} onKeyPress={onKeyPress} className={onColor} />
            <Palette colors={colors} selected={selected} onSelect={onSelect}  />
            <div className="create-button" onClick={onCreate}>추가</div>
        </div>
    );
}

export default Form;