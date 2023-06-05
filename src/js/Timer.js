export class Timer {
    constructor() {
      this.startTime = 0;
      this.endTime = 0;
      this.elapsedTime = 0;
    }
  
    start() {
      this.startTime = Date.now();
    }
  
    stop() {
      this.endTime = Date.now();
      this.elapsedTime = (this.endTime - this.startTime) / 1000;
    }
  
    getElapsedTime() {
      return this.elapsedTime;
    }
  }
  