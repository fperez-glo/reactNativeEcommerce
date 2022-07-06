
export default class AlertHelper {
    static dropDown = null;
    static onClose;
  
    static setDropDown(dropDown) {
      this.dropDown = dropDown;
    }
  
    static show(type, title, message) {
      if (this.dropDown) {
        if(this.dropDown.state.isOpen) {
          setTimeout(()=> {
            this.dropDown.close();
            this.dropDown.alertWithType(type, title, message);
          }, 500)
          return
        }
        this.dropDown.alertWithType(type, title, message);
      }
    }

    static setCustomDropDown(dropDown) {
      this.customDropDown = dropDown;
    }

    static showCustomAlert(options){
      if (this.customDropDown) {
        if(this.customDropDown.state.isOpen) {
          setTimeout(()=> {
            this.customDropDown.close();
            this.customDropDown.alertWithType(options.type);
          }, 500)
          return
        }
        this.customDropDown.alertWithType(options.type);
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