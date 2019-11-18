import StaticDataService from '../services/staticdataLoader';
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

const INIT_MANAGERS = `manager/INIT_MANAGERS`;
const HIRE_MANAGER = `manager/HIRE_MANAGER`;

export const initManagers = createAction(INIT_MANAGERS)<string[]>();
export const hireManager = createAction(HIRE_MANAGER)<string>();

const actions = { initManagers, hireManager };

type ManagerAction = ActionType<typeof actions>;

export type ManagerState = {
  available: string[];
  hired: {};
  isOpen: boolean; // check if manager window is open
}

let available = StaticDataService.getInstance().getAvailableManagers();
let initialState = {
  available,
  hired: {},
  isOpen: false
}

let manager =  createReducer<ManagerState, ManagerAction>(initialState)
  .handleAction(initManagers, (state, action) => ({...state, available: action.payload}))
  .handleAction(hireManager, (state, action) => ({...state, hired: state.hired[action.payload] = true}))

export default manager;


