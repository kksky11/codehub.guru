import { combineReducers } from 'redux';
import { userSlice } from './slices/userSlice'

const rootReducers = combineReducers({
    [userSlice.name]: userSlice.reducer
});

export default rootReducers;
