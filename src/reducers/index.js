import {combineReducers} from "redux";
import formreducers from './formreducers';

export default combineReducers({
    formdata: formreducers
})