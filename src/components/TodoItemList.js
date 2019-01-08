import React, { Component } from "react";
import TodoItem from "./TodoItem"

class TodoItemList extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return this.props.todos !== nextProps.todos;
    }

    render(){
        const { todos, onToggle, onRemove, onEdit } = this.props;
        return (
            <div>
                {
                    todos.map(todo => (
                        <TodoItem 
                            {...todo}
                            onToggle={onToggle}
                            onRemove={onRemove}
                            onEdit={onEdit}
                            key={todo.id}
                        />
                    ))
                }
            </div>
        );
    }
}

export default TodoItemList;