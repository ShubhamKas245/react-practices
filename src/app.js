
import React, { Component, createRef } from 'react'
import './style.scss';
import './todo.scss'
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const requestState=({appState,type,loadingId=-1,})=> [
  ...appState,{type, status:'REQUEST',loadingId}
]

const successState=({appState,type,loadingId=-1})=>
  appState.filter((x)=>!(x.type===type && x.loadingId===loadingId));

const errorState=({appState,type,loadingId=-1},error)=>{
  return appState.map((x)=>{
    if(x.type===type && x.loadingId===loadingId){
      return {
        ...x,status:"ERROR",
        message:error.message,
      }
    }
    return x;
  })
}

export default class app extends Component {
  state={
    todoList:[],
    filter:'All',
    appState:[],
  }
  todoTextRef=createRef();

  componentDidMount(){
    this.loadTodo('All');
  }

  

  loadTodo =async(filter)=>{
    const type='LOAD_TODO';
    try {
      
      this.setState(({appState})=>({
        appState:requestState({appState,type}),
      }))

      let url='http://localhost:3000/todoList';

      if(filter !=='All'){
        url += `?isDone=${filter==='Completed'}`
      }
      const res=await fetch(url);
      const json=await res.json();
      this.setState(({appState})=>({
        todoList:json,
        filter,
        appState:successState({appState,type}),
      }));
      
    } catch (error) {
      this.setState(({appState})=>({
        appState:errorState({appState,type,error}),
      }))
      console.log(error);
    }
  }

  changeText=(e)=>{
    this.setState({todoText:e.target.value})
    // console.log(todoText.value)
  }

  addTodo=async(e)=>{e.preventDefault(); 
    const type='ADD_TODO';
    try {

    this.setState(({appState}) => ({
      appState:requestState({appState,type})
    }))

      const res=await fetch("http://localhost:3000/todoList",{
        method:'POST',
        body:JSON.stringify({
          text:this.todoTextRef.current.value,
          isDone:false,
        }),
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
        },
      }
      );
      const json=await res.json();

    this.setState(({todoList,appState})=>({todoList:[...todoList,json],
      appState:successState({appState,type}),
    }),
    ()=>{this.todoTextRef.current.value=''})
  } catch (error) {
    this.setState(({appState})=>({
      appState:errorState({appState,type,error}),
    }))

  }}

  updateTodo=async(item)=>{
    const type='UPDATE_TODO';
    const loadingId=item.id;
     try {
      this.setState(({appState}) => ({
        appState:requestState({appState,type,loadingId:item.id})
      }))

      const res=await fetch(`http://localhost:3000/todoList/${item.id}`,{
        method:"PUT",
        body:JSON.stringify({
          ...item,
          isDone:!item.isDone,
        }),
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
        },
      }
      );
      const json=await res.json();

    this.setState(({todoList,appState})=>{
    const index = todoList.findIndex((x)=>x.id===loadingId);
    return {
      todoList:[
        ...todoList.slice(0,index),
        json,
        ...todoList.slice(index+1),
      ],
      appState:successState({appState,type,loadingId}),
    }
   })
  } catch (error) {
    this.setState(({appState})=>({
      appState:errorState({appState,type,error,loadingId}),
    }))
  }}

  deleteTodo=async(item)=>{
    const isConfirmed=confirm(`Are u want to delete this item`);
    if(isConfirmed){
      const type='DELETE_TODO';
      const loadingId=item.id;

      try {

        this.setState(({appState}) => ({
          appState:requestState({appState,type,loadingId:item.id})
        }))

        const res=await fetch(`http://localhost:3000/todoList/${item.id}`,{
          method:"DELETE",
        })
        
    this.setState(({todoList,appState})=>{
     const index = todoList.findIndex((x)=>x.id===item.id);
     return {
       todoList:[
         ...todoList.slice(0,index),
         ...todoList.slice(index+1),
       ],
       appState:successState({appState,type,loadingId}),

     }
    })
  } catch (error) {
    this.setState(({appState})=>({
      appState:errorState({appState,type,error,loadingId}),
    }))
  }
  } } 

  render() {
    const {todoList,filter,appState}=this.state;
    const loadTodoState=appState.find((x)=>x.type==='LOAD_TODO',);
    const addTodoState=appState.find(x=>x.type === "ADD_TODO",);
    const updateTodoState=appState.filter(x=>x.type === "UPDATE_TODO",);
    const deleteTodoState=appState.filter(x=>x.type === "DELETE_TODO",);


    if(loadTodoState?.status==='REQUEST'){
      return <h1>Loading...</h1>
    }
    if(loadTodoState?.status==='REQUEST'){
      return <h1>{loadTodoState.message}</h1>
    }
    return (
      <div className='todo'>
        <h1 className='todo__title'>Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} addTodoState={addTodoState} />
        <div className='todo__list'>
          {todoList.length > 0 && (
        <TodoList todoList={todoList} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} updateTodoState={updateTodoState} deleteTodoState={deleteTodoState} />
        )}
        </div>
        
         <TodoFilter filter={filter} filterTodo={this.loadTodo}/>
      </div>
    )
  }
}
