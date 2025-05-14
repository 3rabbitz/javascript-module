import { HelloWorld } from './hello.js';

const id = new URL(import.meta.url).searchParams.get('id');
const panel = document.getElementById(id);
const button = document.createElement('button');
button.innerHTML = 'Run';
button.addEventListener('click', () => {
    alert(new HelloWorld().hello());
});
panel.append(button);