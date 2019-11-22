import PlayerDataService from 'services/playerDataService';
  
import {
  createAction,
  ActionType,
  createReducer,
} from 'typesafe-actions';

/**
 * Define Manager store state
 * @prop {string} name Player's name for welcoming or any other cases message. but not used for this sim. 
 * @prop {string} pid Player's identifical ID for saving account information to backend. but not implemented for this sim.
 * @prop {number} money Player's remained money.
 */
export type PlayerState = {
  name: string;
  pid: string;
  money: number;
}

// Action strings
const INCREASE_MONEY = `business/INCREASE_MONEY`;
const DECREASE_MONEY = `business/DECREASE_MONEY`;
const RESTORE_MONEY = `business/RESTORE_MONEY`;

/**
 * Action for store earned money
 * @param number earned
 * @example
 * dispatch(increaseMoney(money)); 
 */
export const increaseMoney = createAction(INCREASE_MONEY)<number>();
/**
 * Action for store spent money
 * @param number spent
 * @example
 * dispatch(decreaseMoney(money)); 
 */
export const decreaseMoney = createAction(DECREASE_MONEY)<number>();
/**
 * Action for restore money from last saved at localStorage
 * Increase and restore are both of same for increase meaning, but resotre would be called at starting application
 * It will be called at *App* Component's constructor
 * @param number restored
 * @example
 * dispatch(restoreMoney(money)); 
 */
export const restoreMoney = createAction(RESTORE_MONEY)<number>();

const actions = { increaseMoney, decreaseMoney, restoreMoney };
type PlayerAction = ActionType<typeof actions>;

// user name is for welcoming message, pid is prepared for backend situation
const initialState: PlayerState = {
  name: "John Doe",
  pid: "123",
  money: 0
}

// reducer for player information.
const player = createReducer<PlayerState, PlayerAction>(initialState)
  .handleAction([increaseMoney, restoreMoney], (state, action) => {
    if (action.payload === 0)
      return state;
  action.type !== RESTORE_MONEY && PlayerDataService.getInstance().storeUserMoney(state.money + action.payload);
    return {...state, money: state.money + action.payload}
  })
  .handleAction(decreaseMoney, (state, action) => {
    if (action.payload === 0)
      return state;
    PlayerDataService.getInstance().storeUserMoney(state.money - action.payload);
    return {...state, money: state.money - action.payload};
  });

export default player;
