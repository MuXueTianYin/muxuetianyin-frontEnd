class EventBus {
  private events: { [key: string]: ((...args: any[]) => void)[] } = {};

  // 订阅事件
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 取消订阅
  off(event: string, callback: (...args: any[]) => void) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((fn) => fn !== callback);
  }

  // 触发事件
  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach((fn) => fn(...args));
  }
}

// 导出一个EventBus实例
export const eventBus = new EventBus();
