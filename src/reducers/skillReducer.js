import { requestStates } from '../constants';

// アクション用の定数
export const actionTypes = {
  initial: 'INITIAL',
  fetch: 'FETCHING',
  success: 'FETCH_SUCCESS',
  error: 'FETCH_ERROR'
};

export const initialState = {
  languageList: [],
  requestState: requestStates.idle,
};

// reducer関数は第一引数にステート、第二引数にアクションを受け取る
export const skillReducer = (state, action) => {
  switch(action.type) {
    case actionTypes.initial: {
      return {
        languageList: [],
        requestState: requestStates.idle
      }
    }
    case actionTypes.fetch: {
      return {
        // スプレッド構文。現在の状態と同じstateをコピーする。
        ...state,
        requestState: requestStates.loading
      }
    }
    case actionTypes.success: {
      return {
        languageList: action.payload.languageList,
        requestState: requestStates.success
      }
    }
    case actionTypes.error: {
      return {
        languageList: [],
        requestState: requestStates.error
      }
    }
    default: {
      throw new Error();
    }
  }
};
