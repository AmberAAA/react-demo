import axios from "axios";

import {ActionTypes} from "./action";
import  { Store } from "redux";

interface Action {
  type: string,
  payload?: {}
}


export const ajaxAuth = (store: Store) => (next: any) => (action: Action) => {
  // if (action.type === ActionTypes.AuthSuccess)
  if (action.type === ActionTypes.Auth) {
    next({type: ActionTypes.PADDING, payload: true})
    axios.get("http://anborong.live:9000/api/login", {
      params: action.payload
    })
      .then(data => {
        next({type: ActionTypes.PADDING, payload: false})
        if (data.data.state === 0) {
          next({type: ActionTypes.AuthSuccess, payload: data.data.data} as Action)
        } else {
          next({type: ActionTypes.AuthFile, payload: data.data.message} as Action)
        }
      })
  }
}
