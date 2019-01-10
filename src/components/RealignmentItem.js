import React, { Component } from "react";
import "./RealignmentItem.css"

export default class RealignmentItem extends Component {
    render(){
        const { text, id, color, bolded, checked, realignmentMode, r_insertFrom, r_insertTo } = this.props;
        let r_checked = realignmentMode.from === id;
        return(
            <div className={`realignment-item  ${r_checked ? "r_checked" : ""}`} onClick={(e)=>{
                    realignmentMode.from==="" ? r_insertFrom(id) : r_insertTo (id);
                }}>
                <div className="realignment-btn">{r_checked ? (<img src="imgs/realignment_checked.png" alt="edit_pecil_Image" />) : (<img src="imgs/realignment.png" alt="edit_pecil_Image" />) }</div>
                <div className= {`realignment-text ${color} ${checked ? "checked" : ""} ${bolded ? "bold-font" : ""}`} >
                    <div>{ text }</div>
                </div>
            </div>
        );
    }
}