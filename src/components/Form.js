import React from "react";
import "./Form.css"
import Palette from "./Palette"

const Form = ({
                value, 
                onChange, 
                onCreate, 
                onKeyPress, 
                colors, 
                onColor, 
                onSelect,
                bolded,
                onBolded,
                onEditSubmit,
                formState ,
                addTargetInput,
                editTargetInput,
                toggleRealignmentMode}) => {
    
    return(
        <div>
            <div className="palette-with-btns">
                <div className="sort-btn"><img src="imgs/list_sort2.png" alt="Rearrange list button" onClick={toggleRealignmentMode} /></div>
                <Palette colors={colors} selected={onColor} onSelect={onSelect} onBolded={onBolded}  />
            </div>
            {
                formState.mode === "add" ? 
                <AddForm 
                    value={value} 
                    onChange={onChange} 
                    onKeyPress={onKeyPress} 
                    bolded={bolded} 
                    onColor={onColor} 
                    onCreate={onCreate} 
                    addTargetInput={addTargetInput}  /> :
                <EditForm 
                    value={value} 
                    onChange={onChange} 
                    onKeyPress={onKeyPress} 
                    bolded={bolded} 
                    onColor={onColor} 
                    onEditSubmit={onEditSubmit} 
                    editTargetInput={editTargetInput} />
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
    addTargetInput,
    bolded
}) =>{
    return(
        <div className="form">
            <input 
                value={value} 
                onChange={onChange} 
                onKeyPress={onKeyPress} 
                className={`${onColor} ${bolded ? "bold-font" : ""}`} 
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
    editTargetInput,
    bolded
}) => {
    return( 
        <div className="form">
            <input 
                value={value} 
                onChange={onChange} 
                onKeyPress={onKeyPress} 
                className={`${onColor} ${bolded ? "bold-font" : ""}`}
                ref = {editTargetInput}   
             />
            <div className="create-button" onClick={onEditSubmit}>Edit</div>
        </div>
    )
}


export default Form;