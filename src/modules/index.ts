import { combineReducers } from 'redux';
import generateBusinessReducer from './business';
import player from './player';
import manager from './managers';

// TODO: we can create a new Reducer within this type of generater function
// generate and combine into rootReducer 
let lemon = generateBusinessReducer('LEMON');
let newspaper = generateBusinessReducer('NEWSPAPER');
let carWash = generateBusinessReducer('CAR_WASH');

const rootReducer = combineReducers({
  lemon, newspaper, carWash,
  player, manager
});

export type RootState = ReturnType <typeof rootReducer>;

export default rootReducer;