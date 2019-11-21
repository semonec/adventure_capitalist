import { combineReducers } from 'redux';
import generateBusinessReducer from './business';
import player from './player';
import manager from './managers';

/**
 * TODO: we can create a new Reducer within this generator function
 * reducer will created as a returned value, and the action list will be stored at
 * *bizActions* variable, so you you could import that any Component, get specific item with it's name
 * @example
 *  const { bizChangeStateAction, bizLvlUpAction, bizProgressAction, bizRestoreAction, bizHireMgrAction } = bizActions.get('test'); 
 */
let lemon = generateBusinessReducer('LEMON');
let newspaper = generateBusinessReducer('NEWSPAPER');
let carWash = generateBusinessReducer('CAR_WASH');

const rootReducer = combineReducers({
  lemon, newspaper, carWash,
  player, manager
});

export type RootState = ReturnType <typeof rootReducer>;

export default rootReducer;