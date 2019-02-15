class Stopwatch {
    constructor(display, list) {
        this.running = false;
        this.display = display;
        this.list = list;
        this.reset();
        this.print(this.time);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    toList() {
        this.list.innerHTML += `<li>${this.format(this.times)}</li>`
    }

    resetList() {
        this.list.innerHTML = '';
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));


let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    stopwatch.stop(), stopwatch.reset(), stopwatch.print()
});

let toListButton = document.getElementById('to-list');
toListButton.addEventListener('click', () => {
    stopwatch.stop(), stopwatch.toList()
});

let resetListButton = document.getElementById('reset-list');
resetListButton.addEventListener('click', () => {
    stopwatch.stop(), stopwatch.resetList()
});

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}