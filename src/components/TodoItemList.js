import React, { Component } from "react";
import TodoItem from "./TodoItem"
import RealignmentItem from "./RealignmentItem"

class TodoItemList extends Component {

    render(){
        const { todos, onToggle, onRemove, onEdit, realignmentMode, r_insertFrom, r_insertTo } = this.props;
        return (
            <div>
                {
                    todos.map(todo => (
                        realignmentMode.state === false ? 
                        <TodoItem 
                            {...todo}
                            onToggle={onToggle}
                            onRemove={onRemove}
                            onEdit={onEdit}
                            key={todo.id}
                        /> :
                        <RealignmentItem 
                            {...todo} 
                            key={todo.id}
                            realignmentMode={realignmentMode}
                            r_insertFrom={r_insertFrom}
                            r_insertTo={r_insertTo}
                        />
                    ))
                }
            </div>
        );
    }
}

export default TodoItemList;