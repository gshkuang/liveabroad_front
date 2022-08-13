import { combineReducers } from 'redux';
import { artical } from './artical.redux';
import { comment } from './comment.redux';

export default combineReducers({ artical,comment});