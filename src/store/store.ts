import {InterUser, TODO} from "../module";
import {ActionTypes } from "./action"
import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

export interface InterState {
  padding: boolean,
  errorMsg: string | null,
  user: InterUser | null,
  todoList: TODO[]
}

const initState: InterState = {
  padding: false,
  user: null,
  errorMsg: null,
  todoList: []
}

function AppReducer (state = initState, action:{type: string, payload: any}) {
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

    case ActionTypes.SETTODOLIST: {
      return {
        ...state,
        todoList: action.payload
      }
    }

    case ActionTypes.MODIFYTODOLIST: {
      state.todoList = state.todoList.map(todo => {
        if (todo._id === action.payload._id) {
          return action.payload;
        } else {
          return todo
        }
      });
      return state
    }

    case ActionTypes.ADDTODOLIST: {
      state.todoList.push(action.payload)
      return state;
    }

    case ActionTypes.DELETETODOLIST: {
      const index = state.todoList.findIndex(todo => todo._id === action.payload._id)
      state.todoList.splice(index, 1)
      return state;
    }

    case ActionTypes.CLEAERCACHE: {
        window.localStorage.clear()
        return initState
    }

    default:
      return state;
  }
}

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});
export default createStore(AppReducer,
  {user: JSON.parse(window.localStorage.getItem("user") as string)},
  composeEnhancers(applyMiddleware())
)
