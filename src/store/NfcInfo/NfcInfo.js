import {updateObject} from '../../util/utility';

const START_READING_NFC = 'KELTECH/STORE/NFCINFO/START_READING_NFC';
const FINISH_READING_NFC = 'KELTECH/STORE/NFCINFO/FINISH_READING_NFC';

const initialState = {
  nfcInfo: {},
  loading: false,
};

export const onStartReadingNfc = () => {
  return {type: START_READING_NFC};
};

const startReadingNfc = (state, action) => {
  return updateObject(state, {loading: true});
};

export const onReadingNfcInfo = (info, props) => {
  return dispatch => {
    dispatch(onStartReadingNfc());
    if (info) {
      dispatch(onFinishReadingNfc(info));
      props.navigation.navigate('single_loc');
    }
  };
};

export const onFinishReadingNfc = info => {
  return {type: FINISH_READING_NFC, info};
};

const finishReadingNfc = (state, action) => {
  return updateObject(state, {loading: false, nfcInfo: action.info});
};

export default function NfcInfoReducer(state = initialState, action) {
  switch (action.type) {
    case START_READING_NFC:
      return startReadingNfc(state, action);
    case FINISH_READING_NFC:
      return finishReadingNfc(state, action);

    default:
      return state;
  }
}
