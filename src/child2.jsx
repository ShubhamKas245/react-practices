import React, { PureComponent } from 'react'
import shallowCompare from 'react-addons-shallow-compare';

export default class Child2 extends PureComponent {

    // shouldComponentUpdate(nextProps,nextState){
    //     return shallowCompare(this,nextProps,nextState);
    // }
  render() {
    console.log("child 2 render");
    const {count } = this.props;

    return (
      <div>
        <h1>Child 2</h1>
        <p>{count}</p>
      </div>
    )
  }
}
