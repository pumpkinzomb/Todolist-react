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
    bolded:false,
    formState:{
      mode:"add",
      editTarget:""
    },
    realignmentMode: {
      state:false,
      from:""
    }
  }

  
  
  componentWillMount(){
    //this._deleteCookie('todos');
    const defaultTodos = [
      {id:2, text:"오늘의 할 일1", checked: false, color:"", bolded:true},
      {id:1, text:"클릭하면 체크가 됩니다.", checked: true, color:"", bolded:false},
      {id:0, text:"글씨 색도 바꿔보세요.", checked: false, color:"color3", bolded:false}
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
    // console.log(this.state)
    // console.log(nextState)
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
    const { input,todos,selectedColor,bolded } = this.state;
    if(input.length === 0){
      return;
    }
    let reverseTodo = [...todos].reverse();
    let lastId = reverseTodo.length === 0 ? -1: reverseTodo[reverseTodo.length-1].id;
    const updateTodo  = reverseTodo.concat({
      id: ++lastId,
      text: input,
      checked: false,
      color:selectedColor,
      bolded:bolded
    });
    reverseTodo = [...updateTodo].reverse();
    this._setCookie("todos",reverseTodo,300);
    this.setState({
        input:"", //input 비움
        todos: reverseTodo,
        selectedColor:"",
        bolded:false
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

  _onBolded = () => {

    this.setState({
      bolded:!this.state.bolded
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
        bolded:selected.bolded,
        selectedColor:selected.color
      })
    }else{
      if(this.state.formState.editTarget.id !== id){
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];
        this.setState({
          input:selected.text,
          formState:{
            mode:"edit",
            editTarget:selected
          },
          bolded:selected.bolded,
          selectedColor:selected.color
        })
      }else{
        this.setState({
          input:"",
          formState:{
            mode:"add",
            editTarget:""
          },
          selectedColor:"",
          bolded:false
        })
      }
    }
    if(this.editInput) this.editInput.focus();
  }
  _onEditSubmit = () =>{
    const { todos,formState,input,selectedColor,bolded } = this.state;
    const index = todos.findIndex(todo => todo.id === formState.editTarget.id);
    const selected = todos[index];
    const newTodos = [...todos];
    
    newTodos[index] = {
      ...selected,
      text:input,
      color:selectedColor,
      bolded:bolded
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

  _toggleRealignmentMode = () =>{
    this.setState({
      realignmentMode: {
        state:!this.state.realignmentMode.state,
        from:""
      }
    });
  }
  _r_insertFrom = (id) => {
    this.setState({
      realignmentMode: {
        state:true,
        from:id
      }
    });
  }
  _r_insertTo = (id) => {
    if(this.state.realignmentMode.from === id){
      return this._toggleRealignmentMode();
    }
    const { todos, realignmentMode } = this.state;
    const fromIndex = todos.findIndex(todo => todo.id === realignmentMode.from);
    const selectFrom = todos[fromIndex];
    const toIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    
    newTodos.splice(fromIndex,1); //잘라서
    newTodos.splice(toIndex,0,selectFrom); //붙인다

    let newTodoIndex=newTodos.length;
    const updateTodo = newTodos.map(newTodo=>{
      newTodo.id = --newTodoIndex;
      return newTodo
    });
    this._setCookie("todos",updateTodo,300);
    this.setState({
      todos:updateTodo,
      realignmentMode: {
        state:true,
        from:id
      }
    });
  }

  // cookie 메소드 시작
  //  재미로 만들었지만 cookie를 사용하여 todoList를 저장함
  _setCookie = (name, value, exp) => {

    let expires = new Date();
    let tmp = expires.getDate();
    expires.setDate(tmp + exp); // 만료일은 쿠키 저장일로부터 300일 후
    
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
    const { input, todos, colors, selectedColor, formState, realignmentMode, bolded } = this.state;
    const {
      _onChange,
      _onCreate,
      _onKeyPress,
      _onToggle,
      _onBolded,
      _onRemove,
      _onSelect,
      _onEdit,
      _onEditSubmit,
      _toggleRealignmentMode,
      _r_insertFrom,
      _r_insertTo
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
          onBolded = {_onBolded} //Form
          bolded = {bolded} //Form
          toggleRealignmentMode={_toggleRealignmentMode} //realignment-mode-btn

          colors={colors} //Palette
          onColor={selectedColor} //Palette
          onSelect={_onSelect} //Palette
        />}>
          <TodoItemList 
            todos={todos} 
            onToggle={_onToggle} 
            onRemove={_onRemove} 
            onEdit={_onEdit} 
            realignmentMode={realignmentMode} 
            r_insertFrom={_r_insertFrom} 
            r_insertTo={_r_insertTo} />
      </TodoListTemplate>
    );
  }
}

export default App;
