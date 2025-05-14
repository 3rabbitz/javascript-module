export class GamePanel {

    #el;

    #one;

    #count = 0;

    #start = performance.now();

    constructor(parent) {
        this.#el = document.createElement('game-panel');
        const numbers = this.getRandomNumbers(8);
        for (let i = 0; i < numbers.length; i++) {
            new NumberItem(this, { number: numbers[i] }, this.#el);
        }
        parent.prepend(this.#el);
    }

    remove() {
        this.#el.remove();
    }

    getRandomNumbers(count) {
        const result = [];
        const values = new Set();
        for (let i = 0; i < count;) {
            const num = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
            if (!values.has(num)) {
                values.add(num);
                result.push(num);
                result.push(num);
                i++;
            }
        }
        return this.shuffle(result);
    }

    shuffle(array) {
        const result = array.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    select(item) {
        if (this.#one) {
            if (this.#one.value === item.value) {
                this.#one.matched();
                item.matched();
                this.#one = null;
                this.#count++;
                if (this.#count === 8) {
                    setTimeout(() => {
                        const seconds = (performance.now() - this.#start) / 1000;
                        alert(`모든 숫자를 맞추는 데 ${seconds.toFixed(0)}초가 걸렸습니다`);
                    }, 100);
                }
            } else {
                item.select();
                const before = this.#one;
                this.#one = null;
                setTimeout(() => {
                    before.unselect();
                    item.unselect();
                }, 300);
            }
        } else {
            (this.#one = item).select();
        }
    }

}

class NumberItem {

    #el;

    #number;

    #status = 'unselected';

    constructor(gamePanel, { number }, parent) {
        this.#el = document.createElement('game-number');
        this.#el.addEventListener('click', event => {
            if (this.#status === 'matched') {
                return;
            }
            gamePanel.select(this);
        });
        parent.append(this.#el);
        this.#number = number;
        this.touch();
    }

    get value() {
        return this.#number;
    }

    select() {
        this.#status = 'selected';
        this.#el.classList.add('selected');
        this.touch();
    }

    unselect() {
        this.#status = 'unselected';
        this.#el.classList.remove('selected');
        this.touch();
    }

    matched() {
        this.#status = 'matched';
        this.#el.classList.add('matched');
        this.#el.classList.remove('selected');
        this.touch();
    }

    touch() {
        if (this.#status !== 'unselected') {
            this.#el.innerText = this.#number;
        } else {
            this.#el.innerText = '';
        }
    }

}