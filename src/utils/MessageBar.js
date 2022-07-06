import AlertHelper from './AlertHelper';

export const showInfo = options => {
  AlertHelper.show('info', '', options.message);
};

export const showError = options => {
  AlertHelper.show('error', '', options.message);
};

export const showSuccess = options => {
  AlertHelper.show('success', '', options.message);
};

export const showOverlay = options => {
  AlertHelper.showCustomAlert(options);
}