import PlayerDataService from 'services/playerDataService';
  
import {
  createAction,
  ActionType,
  createReducer,
} from 'typesafe-actions';

const INCREASE_MONEY = `business/INCREASE_MONEY`;
const DECREASE_MONEY = `business/DECREASE_MONEY`;

export const increaseMoney = createAction(INCREASE_MONEY)<number>();
export const decreaseMoney = createAction(DECREASE_MONEY)<number>();

const actions = { increaseMoney, decreaseMoney };
export type PlayerAction = ActionType<typeof actions>;

export type PlayerState = {
  name: string;
  pid: string;
  money: number;
}

const initialState: PlayerState = {
  name: "John Doe",
  pid: "123",
  money: 0
}

const player = createReducer<PlayerState, PlayerAction>(initialState)
  .handleAction(increaseMoney, (state, action) => {
    PlayerDataService.getInstance().storeUserMoney(state.money + action.payload);
    return {...state, money: state.money + action.payload}
  })
  .handleAction(decreaseMoney, (state, action) => {
    PlayerDataService.getInstance().storeUserMoney(state.money - action.payload);
    return {...state, money: state.money - action.payload};
  });

export default player;
