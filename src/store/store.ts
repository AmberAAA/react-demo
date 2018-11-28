import {InterUser} from "../module";
import {ActionTypes } from "./action"
import {applyMiddleware, createStore} from "redux";
import {ajaxAuth} from './middleWares';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

interface InterState {
  padding: boolean,
  errorMsg: string | null,
  user: InterUser | null,
}

const initState: InterState = {
  padding: false,
  user: null,
  errorMsg: null
}

function AppReducer (state = initState, action:{type: string, payload: InterUser}) {
  switch (action.type) {
    case ActionTypes.AuthSuccess: {
      return {
        ...state,
        user: action.payload
      }
    }

    case ActionTypes.AuthFile: {
      return {
        ...state,
        errorMsg: action.payload
      }
    }

    case ActionTypes.PADDING: {
      return {
        ...state,
        padding: action.payload
      }
    }

    default:
      return state;
  }
}


const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});
export default createStore(AppReducer,
  composeEnhancers(applyMiddleware(ajaxAuth))
)
