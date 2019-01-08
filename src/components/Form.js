import React from "react";
import "./Form.css"
import Palette from "./Palette"

const Form = ({value, onChange, onCreate, onKeyPress, colors, onColor, onSelect,onEditSubmit,formState ,addTargetInput,editTargetInput}) => {
    
    return(
        <div>
            <Palette colors={colors} selected={onColor} onSelect={onSelect}  />
            {
                formState.mode === "add" ? 
                <AddForm value={value} onChange={onChange} onKeyPress={onKeyPress} onColor={onColor} onCreate={onCreate} addTargetInput={addTargetInput}  /> :
                <EditForm value={value} onChange={onChange} onKeyPress={onKeyPress} onColor={onColor} onEditSubmit={onEditSubmit} editTargetInput={editTargetInput} />
            }
        </div>
    );
}

const AddForm = ({
    value,
    onChange,
    onKeyPress,
    onColor,
    onCreate,
    addTargetInput
}) =>{
    return(
        <div className="form">
            <input 
                value={value} 
                onChange={onChange} 
                onKeyPress={onKeyPress} 
                className={onColor} 
                ref={addTargetInput}
            />
            <div className="create-button" onClick={onCreate}>추가</div>
        </div>
    )
}
const EditForm = ({
    value,
    onChange,
    onKeyPress,
    onColor,
    onEditSubmit,
    editTargetInput
}) => {
    return( 
        <div className="form">
            <input 
                value={value} 
                onChange={onChange} 
                onKeyPress={onKeyPress} 
                className={onColor}
                ref = {editTargetInput}   
             />
            <div className="create-button" onClick={onEditSubmit}>Edit</div>
        </div>
    )
}


export default Form;