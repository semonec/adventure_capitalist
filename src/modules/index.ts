import { combineReducers } from 'redux';
import { generateBusinessState, BusinessState } from './business';
import player from './player';

export const changeStateActions: any = {};
export const levelUpActions: any = {};
export const progressActions: any = {};

let lemon = generateBusinessState('LEMON');
let newspaper = generateBusinessState('NEWSPAPER');
let carWash = generateBusinessState('CAR_WASH');

const rootReducer = combineReducers({
  lemon, newspaper, carWash,
  player
});

export default rootReducer;

export type RootState = ReturnType <typeof rootReducer>;

