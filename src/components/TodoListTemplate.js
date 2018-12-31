import React,{ Component } from "react";
import "./TodoListTemplate.css"

class TodoListTemplate extends Component{
    componentWillUpdate(){
    }
    shouldComponentUpdate(nextProps, nextState){
        //console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
        //console.log(nextProps)
        return true;
    }
    render(){
        const {form,children} = this.props;
        return(
            <main className="todo-list-template">
                <div className="title">
                    오늘 할 일
                </div>
                <section className="form-wrapper">
                    { form }
                </section>
                <section className="todos-wrapper">
                    { children }
                </section>
            </main>
        );
    }
}

export default TodoListTemplate;