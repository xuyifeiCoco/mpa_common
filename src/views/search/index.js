// src/index.js
import { sumNum } from './ceshi.ts';

function component() {
    const element = document.createElement('div');

    element.innerHTML = '我是搜索也发哈水电费';
    return element;
}
document.body.appendChild(component());
