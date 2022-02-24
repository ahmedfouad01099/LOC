import {updateObject} from '../../util/utility';

const CHANGE_MOBILE_MODE = 'KELTECH/STORE/MOBILE_MODE/CHANGE_MOBILE_MODE';

export const initialState = {
  mode: 'online',
};

export const onChangingMobileMode = mode => {
  return {type: CHANGE_MOBILE_MODE, mode};
};

const changeMobileMode = (state, action) => {
  return updateObject(state, {mode: action.mode});
};

export default function MobileModeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MOBILE_MODE:
      return changeMobileMode(state, action);

    default:
      return state;
  }
}
