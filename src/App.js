import React, { Component } from 'react';
import './App.css';
import TodoListTemplate from "./components/TodoListTemplate"
import TodoItemList from "./components/TodoItemList"
import Form from "./components/Form"


class App extends Component {
  
  state = {
    input : "",
    todos : [
      {id:0, text:"오늘의 할 일1", checked: false, color:""},
      {id:1, text:"클릭하면 체크가 됩니다.", checked: true, color:""},
      {id:2, text:"글씨 색도 바꿔보세요.", checked: false, color:"color3"}
    ],
    colors : [
      "color1", //#343a40
      "color2", //#f03e3e
      "color3", //#12b886
      "color4" //#228ae6
    ],
    selectedColor:""
  }
  
  componentDidMount(){
    //this._deleteCookie('todos');
    this._getCookie("todos").then(
      response => {
        let getCookies = JSON.parse(response);
        response !== null && this.setState({ todos: getCookies});
      })
  }
  shouldComponentUpdate(nextProps, nextState){
    //console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true;
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
    if(input.length === 0){
      return;
    }
    let lastId = todos.length === 0 ? -1: todos[todos.length-1].id;
    const updateTodo  = todos.concat({
      id: ++lastId,
      text: input,
      checked: false,
      color:selectedColor
    });
    this._setCookie("todos",updateTodo,300);
    this.setState({
        input:"", //input 비움
        todos: updateTodo,
        selectedColor:""
    });
    
  }

  _onKeyPress = (e) => {
    if(e.key === "Enter"){
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
    const updateTodo  = newTodos;
    this._setCookie("todos",updateTodo,300);
    this.setState({
      todos:updateTodo
    });
  }

  _onRemove = (id) => {
    const { todos } = this.state;
    const updateTodo  = todos.filter(todo => todo.id !== id);
    this._setCookie("todos",updateTodo,300);
    this.setState({
      todos: updateTodo
    });
  }

  _onSelect = (color) =>{
    this.setState({
      selectedColor: color
    });
  }

  // cookie 메소드 시작
  //  재미로 만들었지만 cookie를 사용하여 todoList를 저장함
  _setCookie = (name, value, exp) => {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);

    var transStringValue = JSON.stringify(value);
    document.cookie = name + '=' + transStringValue + '; expires=' + date.toUTCString() + ';path=/';
  }
  _getCookie = (name) => {
    return new Promise(function (resolve, reject) {
      var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      value = value ? value[2] : null;
      resolve(value);
    });
  }
  _deleteCookie = (name) =>{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  // cookie 메소드 끝

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
