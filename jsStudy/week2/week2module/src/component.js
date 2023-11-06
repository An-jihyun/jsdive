export class Component {
    constructor() {
      this.state = {};
      this.handlers = {};
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  
    on(eventName, handler) {
      if (!this.handlers[eventName]) {
        this.handlers[eventName] = [];
      }
      this.handlers[eventName].push(handler);
    }
  
    trigger(eventName, data) {
      const eventHandlers = this.handlers[eventName];
      if (eventHandlers) {
        eventHandlers.forEach(handler => handler(data));
      }
    }
  
    render() {}
  }