import {AppState, Linking} from 'react-native';
let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const removeListeners = listnersArray => {
  if (listnersArray && listnersArray.length) {
    listnersArray.forEach(listnerObject => {
      let type =
        listnerObject && listnerObject.type ? listnerObject.type : 'default';
      let ref = listnerObject && listnerObject.ref ? listnerObject.ref : null;

      switch (type) {
        case 'DeviceEventEmitter':
          ref && ref.remove();
          break;
        case 'navigation':
          ref && ref.remove();
          break;
        case 'NetInfo':
          ref && ref();
          break;
        case 'BackHandler':
          ref && ref.remove();
          break;
        case 'AppState':
          ref && AppState.removeEventListener(ref, () => {});
          break;
        case 'Linking':
          ref && Linking.removeEventListener(ref, () => {});
          break;
        default:
          ref && ref.remove();
      }
    });
  }
};

export const getDisplayDate = date => {
  return `${new Date(date).getDate()} ${months[
    new Date(date).getMonth()
  ].toUpperCase()}, ${new Date(date).getFullYear()}`;
};

export const getCurrentMonth = () => {
  return `${months[
    new Date().getMonth()
  ].toUpperCase()} ${new Date().getFullYear()}`;
};
export const getCurrentTimestamps = () => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: firstDay,
    end: lastDay,
  };
};
