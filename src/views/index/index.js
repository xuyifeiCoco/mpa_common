// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import './ceshi.css';
// import 'test.js'
// import '../../style.scss'

// eslint-disable-next-line no-unused-vars
const App = () => {
    const loadCom = () => {
        import('./test.js').then((val) => {
            console.log(val);
        });
    };
    return (<div className='container'>
        发哈说的法律fasdafsadfa发送到发
        <button onClick={loadCom}>  点击加载  </button>
    </div>);
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
