const time = document.querySelector('.stopwatch')
const mainButton = document.querySelector('#start-button')
const resetButton = document.querySelector('#reset-button')
const stopwatch = { elapsedTime: 0 }

mainButton.addEventListener('click', () => {
    if (mainButton.innerHTML === 'Start') {
        startStopwatch();
        mainButton.innerHTML = 'Stop'
    } else {
        stopwatch.elapsedTime += Date.now() - stopwatch.startTime
        clearInterval(stopwatch.intervalId)
        mainButton.innerHTML = 'Start'
    }
})

resetButton.addEventListener('click', () => {
    stopwatch.elapsedTime = 0
    stopwatch.startTime = Date.now()
    displayTime(0, 0, 0, 0)
})

function startStopwatch() {
    stopwatch.startTime = Date.now();

    stopwatch.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime
        const milliseconds = parseInt((elapsedTime % 1000) / 10)
        const seconds = parseInt((elapsedTime / 1000) % 60)
        const minutes = parseInt((elapsedTime / (1000 * 60)) % 60)
        const hour = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
        displayTime(hour, minutes, seconds, milliseconds)
    }, 100);
}

function displayTime(hour, minutes, seconds, milliseconds) {
    const leadZeroTime = [hour, minutes, seconds, milliseconds].map(time => time < 10 ? `0${time}` : time)
    time.innerHTML = leadZeroTime.join(':')
}