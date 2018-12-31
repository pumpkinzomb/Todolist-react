import React, { Component } from 'react';
import './App.css';
import TodoListTemplate from "./components/TodoListTemplate"
import TodoItemList from "./components/TodoItemList"
import Form from "./components/Form"


class App extends Component {
  
  state = {
    input : "",
    todos : [
      {id:0, text:"리액트 소개", checked: false, color:""},
      {id:1, text:"리액트 소개", checked: true, color:""},
      {id:2, text:"리액트 소개", checked: false, color:""}
    ],
    colors : [
      "color1", //#343a40
      "color2", //#f03e3e
      "color3", //#12b886
      "color4" //#228ae6
    ],
    selectedColor:""
  }
  
  _onChange = (e) =>{
    this.setState(
      {
        input:e.target.value
      }
    );
  }
  
  _onCreate = () => {

    const { input,todos,selectedColor } = this.state;
    let lastId = todos[todos.length-1].id;

    this.setState({
        input:"", //input 비움
        todos: todos.concat({
          id: ++lastId,
          text: input,
          checked: false,
          color:selectedColor
        }),
        selectedColor:""
      })
  }

  _onKeyPress = (e) => {
    if(e.key === "enter"){
      this._onCreate();
    }
  }

  _onToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const newTodos = [...todos];

    newTodos[index] = {
      ...selected,
      checked: !selected.checked
    }
    this.setState({
      todos:newTodos
    });
  }

  _onRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  _onSelect = (color) =>{
    this.setState({
      selectedColor: color
    });
  }

  render() {
    const { input, todos, colors, selectedColor } = this.state;
    const {
      _onChange,
      _onCreate,
      _onKeyPress,
      _onToggle,
      _onRemove,
      _onSelect
    } = this;
    return (
      <TodoListTemplate form={
        <Form 
          value={input} //Form
          onKeyPress={_onKeyPress} //Form
          onChange={_onChange} //Form
          onCreate={_onCreate} //Form

          colors={colors} //Palette
          onColor={selectedColor} //Palette
          onSelect={_onSelect} //Palette
        />}>
          <TodoItemList todos={todos} onToggle={_onToggle} onRemove={_onRemove} />
      </TodoListTemplate>
    );
  }
}

export default App;
