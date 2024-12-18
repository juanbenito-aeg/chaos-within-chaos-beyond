export default class Timer {
    constructor(value, timeChangeValue) {
        this.value              = value;            // TIMER VALUE
        this.timeChangeCounter  = 0;                // VALUE CHANGE TIMER (SECONDS)
        this.timeChangeValue    = timeChangeValue;  // TIME TO CHANGE VALUE (SECONDS)
    }
}