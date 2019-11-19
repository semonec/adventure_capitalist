import StaticDataService from 'services/staticdataLoader';
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

const INIT_MANAGERS = `manager/INIT_MANAGERS`;
const HIRE_MANAGER = `manager/HIRE_MANAGER`;
const DISPLAY_MANAGER_POPUP = `manager/DISPLAY_MANAGER_POPUP`;

export const initManagers = createAction(INIT_MANAGERS)<string[]>();
export const hireManager = createAction(HIRE_MANAGER)<string>();
export const displayManagerPopup = createAction(DISPLAY_MANAGER_POPUP)<boolean>();

const actions = { initManagers, hireManager, displayManagerPopup };

type ManagerAction = ActionType<typeof actions>;

export type ManagerState = {
  available: string[];
  hired: {};
  isShown: boolean; // check if manager window is open
}

let available = StaticDataService.getInstance().getAvailableManagers();
let initialState = {
  available,
  hired: {},
  isShown: false
}

let manager =  createReducer<ManagerState, ManagerAction>(initialState)
  .handleAction(initManagers, (state, action) => ({...state, available: action.payload}))
  .handleAction(hireManager, (state, action) => ({...state, hired: state.hired[action.payload]}))
  .handleAction(displayManagerPopup, (state, action) => ({...state, isShown: action.payload}));

export default manager;


