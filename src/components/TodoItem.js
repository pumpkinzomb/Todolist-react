import React, { Component } from "react";
import "./TodoItem.css";

class TodoItem extends Component{
    
    render(){
        const { text, checked, id, bolded, onToggle, onRemove, onEdit, color } = this.props;
        return(
            <div className={`todo-item`} onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                }}> &times; </div>
                <div className={`todo-text ${color} ${checked ? "checked" : ""} ${bolded ? "bold-font" : ""}`}>
                    <div>{ text }</div>
                </div>
                {
                    checked && (<div className="check-mark">&#x2713;</div>) //checked가 true면 우측 실행, ( 좌측이 true일 경우 )항상 우측이 반환됨
                }
                <div className="edit-btn" onClick={(e) => {
                    e.stopPropagation();
                    onEdit(id);
                }}><img src="imgs/edit.png" alt="edit_pecil_Image" /></div>
            </div>
        );
    }
}

export default TodoItem;