import {Action, createStore} from 'redux';

interface IntState {
  count: number
}

export enum ActionTypes {
  increment = 'INCREMENT',
  decrement = 'DECREMENT'
}

const State: IntState = {
  count: 0
};



function action (state = State, action: Action) {
  switch (action.type) {
    case (ActionTypes.increment):
      return {
        count: state.count + 1
      };

    case (ActionTypes.decrement):
      return {
        count: state.count - 1
      };

    default:
      return state;
  }
}

const store = createStore(action);

export default store;
