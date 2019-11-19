import { combineReducers } from 'redux';
import { generateBusinessState } from './business';
import player from './player';
import manager from './managers';

export const changeStateActions: any = {};
export const levelUpActions: any = {};
export const progressActions: any = {};

let lemon = generateBusinessState('LEMON');
let newspaper = generateBusinessState('NEWSPAPER');
let carWash = generateBusinessState('CAR_WASH');

const rootReducer = combineReducers({
  lemon, newspaper, carWash,
  player, manager
});

export default rootReducer;

export type RootState = ReturnType <typeof rootReducer>;

