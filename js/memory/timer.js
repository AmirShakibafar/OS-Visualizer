const timer = document.getElementById("curr-time");
const updateTime = (time) => {
    timer.innerText = time;
}
const resetTime = () => {
    timer.innerText = 0;
}
export {
    updateTime,
    resetTime
}