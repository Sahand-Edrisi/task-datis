class MockSocket {
  constructor() {
    this.isConnected = false;
    this.listeners = {};
  }

  connect() {
    this.isConnected = true;
    this._emitInternal("connect");
  }
  disconnect() {
    this.isConnected = false;
    this._emitInternal("disconnect");
  }
  on(event, callBack) {
    this.listeners[event] = callBack;
  }
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }
  _emitInternal(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }
}

export default MockSocket;
