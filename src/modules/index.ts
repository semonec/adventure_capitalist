import { combineReducers } from 'redux';
import generateBusinessReducer from './business';
import player from './player';
import manager from './managers';

let lemon = generateBusinessReducer('LEMON');
let newspaper = generateBusinessReducer('NEWSPAPER');
let carWash = generateBusinessReducer('CAR_WASH');

const rootReducer = combineReducers({
  lemon, newspaper, carWash,
  player, manager
});

export default rootReducer;

export type RootState = ReturnType <typeof rootReducer>;

