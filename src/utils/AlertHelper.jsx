
export default class AlertHelper {
    static dropDown = null;
    static onClose;
  
    static setDropDown(dropDown) {
      this.dropDown = dropDown;
    }
  
    static show(type, title, message) {
      if (this.dropDown) {
        this.dropDown.alertWithType(type, title, message);
      }
    }
  
    static setOnClose(onClose) {
      this.onClose = onClose;
    }
  
    static invokeOnClose() {
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  }