class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.time);
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));