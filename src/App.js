import React, { Component } from 'react';
import './App.css';
import TodoListTemplate from "./components/TodoListTemplate"
import TodoItemList from "./components/TodoItemList"
import Form from "./components/Form"
import cookie from "react-cookies"


class App extends Component {
  
  state = {
    input : "",
    todos : [],
    colors : [
      "color1", //#343a40
      "color2", //#f03e3e
      "color3", //#12b886
      "color4" //#228ae6
    ],
    selectedColor:"",
    formState:{
      mode:"add",
      editTarget:""
    }
  }

  
  
  componentWillMount(){
    //this._deleteCookie('todos');
    let defaultTodos = [
      {id:0, text:"오늘의 할 일1", checked: false, color:""},
      {id:1, text:"클릭하면 체크가 됩니다.", checked: true, color:""},
      {id:2, text:"글씨 색도 바꿔보세요.", checked: false, color:"color3"}
    ]
    this._getCookie("todos").then(
      response => {
        if(response !== undefined){
          this.setState({ todos: response});
        }else{
          this.setState({ todos: defaultTodos});
        }
      })
  }
  componentDidUpdate(){
    if(this.editInput) this.editInput.focus();
    if(this.addInput) this.addInput.focus();
  }
  shouldComponentUpdate(nextProps,nextState) {
    console.log(this.state)
    console.log(nextState)
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
      if(this.state.formState.mode==="add"){
        this._onCreate();
      }else{
        this._onEditSubmit();
      }
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

  _onEdit = (id) => {
    if(this.state.formState.mode==="add"){
      const { todos } = this.state;
      const index = todos.findIndex(todo => todo.id === id);
      const selected = todos[index];
      this.setState({
        input:selected.text,
        formState:{
          mode:"edit",
          editTarget:selected
        },
        selectedColor:selected.color
      })
    }else{
      this.setState({
        input:"",
        formState:{
          mode:"add",
          editTarget:""
        },
        selectedColor:""
      })
    }
    if(this.editInput) this.editInput.focus();
  }
  _onEditSubmit = () =>{
    const { todos,formState,input,selectedColor } = this.state;
    const index = todos.findIndex(todo => todo.id === formState.editTarget.id);
    const selected = todos[index];
    const newTodos = [...todos];
    
    newTodos[index] = {
      ...selected,
      text:input,
      color:selectedColor
    }
    
    const updateTodo  = newTodos;
    this._setCookie("todos",updateTodo,300);
    this.setState({
      todos:updateTodo,
      formState:{
        mode:"add",
        editTarget:""
      },
      input:"",
      selectedColor:""
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

    let expires = new Date();
    let tmp = expires.getDate();
    expires.setDate(tmp + exp); // 만료일은 쿠키 저장일로부터 100일 후
    
    const cookieOptions = {
        expires
    }
    
    //var transStringValue = JSON.stringify(value);
    cookie.save(name, value, cookieOptions);

  }
  _getCookie = (name) => {
    return new Promise(function (resolve, reject) {
      var value = cookie.load(name);
      resolve(value);
    });
  }
  _deleteCookie = (name) =>{
    cookie.remove(name)
  }
  // cookie 메소드 끝

  render() {
    const { input, todos, colors, selectedColor,formState } = this.state;
    const {
      _onChange,
      _onCreate,
      _onKeyPress,
      _onToggle,
      _onRemove,
      _onSelect,
      _onEdit,
      _onEditSubmit
    } = this;

    return (
      <TodoListTemplate form={
        <Form 
          value={input} //Form
          onKeyPress={_onKeyPress} //Form
          onChange={_onChange} //Form
          onCreate={_onCreate} //Form
          onEditSubmit = {_onEditSubmit} //Form
          formState={formState} //Form
          addTargetInput={ref=>{
                          this.addInput = ref
                      }} //Form
          editTargetInput={ref=>{
                          this.editInput = ref
                      }} //Form

          colors={colors} //Palette
          onColor={selectedColor} //Palette
          onSelect={_onSelect} //Palette
        />}>
          <TodoItemList todos={todos} onToggle={_onToggle} onRemove={_onRemove} onEdit={_onEdit} />
      </TodoListTemplate>
    );
  }
}

export default App;
