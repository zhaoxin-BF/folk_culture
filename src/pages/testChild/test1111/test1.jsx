/*
用户界面组件
 */

import React, { useState, useEffect } from 'react';

// 暴露组件方法一～
// export const Test1 = () =>   {
function Test1() {
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        console.log("++++++++++++++++++++++++++++")
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
// 暴露组件方法二～
export {Test1};

// export default class Test1 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         };
//     }
//
//     render() {
//         return (
//             <div>
//                 <p>You clicked {this.state.count} times</p>
//                 <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//                     Click me
//                 </button>
//             </div>
//         );
//     }
// }