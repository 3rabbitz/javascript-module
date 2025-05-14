import { GamePanel } from './game-panel.js';
import sheet from './find-same-numbers.css' with  { type: 'css' };

document.adoptedStyleSheets = [sheet];

const id = new URL(import.meta.url).searchParams.get('id');
const panel = document.getElementById(id);

let gamePanel = new GamePanel(panel);
const button = document.createElement('button');
button.innerText = '초기화';
button.addEventListener('click', () => {
    if (gamePanel) {
        gamePanel.remove();
    }
    gamePanel = new GamePanel(panel);
});
panel.append(button);