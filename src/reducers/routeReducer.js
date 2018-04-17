import { LOCATION_CHANGE } from 'react-router-redux-fixed'
import I from 'immuter'

const initialState = {
  locationBeforeTransitions: null
};

export default(state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return I.set(state,'locationBeforeTransitions', action.payload);
  }
  return state
};