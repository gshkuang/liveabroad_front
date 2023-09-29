import { combineReducers } from 'redux';
import { resource } from './resource.redux';
import { comment } from './comment.redux';

export default combineReducers({ resource,comment});