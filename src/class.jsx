import React, { Component } from 'react'
import Child from './child';
import Child2 from './child2';

export default class Test extends Component {
    state={
        count:0,    
    }
    constructor(props){
        super(props);
        console.log("constructor");
        this.state={
            count:props.count,
            name:"shubham"
        }
        // this.increment = this.increment.bind(this);
        // this.decrement = this.decrement.bind(this);
    }

    // call every time when props and state change
    static getDerivedStateFromProps(props,state){
        console.log("getDerivedStateFromProp");
        if(state.count===0){
         return {
            count:props.count,
         }
        }
        return null;
    }
   async componentDidMount(){
    console.log("componentDidMount");
        // console.log(document.getElementById('test'));
        // document.getElementById('test').style.backgroundColor='yellow';
        document.addEventListener('copy',()=>{
            console.log("Copied")
        });
        try {
            const res=await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const json=await res.json();
            this.setState({name:json.title})
        } catch (error) {
            
        }
    }
    increment=()=>{
        this.setState((state)=>({count:state.count+1}));
    }
    decrement=()=>{
        this.setState((state)=>({count:state.count-1,}))
    }
  render() {
    const { count,name } = this.state;
    console.log("render")
    return (
      <div>
        <button type='button' onClick={this.increment}>+</button>
        <h3>{name}</h3>
        <p>{count}</p>
        <button type='button' onClick={this.decrement}>-</button>
       <div>
       <button onClick={()=>this.setState({name:"shivam"})}>Change Name</button>
       </div>
        <div>
            <Child />
            <Child2 count={count} />
        </div>
      </div>
    )
  }
}
