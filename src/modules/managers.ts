import StaticDataService from 'services/staticdataLoader';
import { ManagerType } from '../services/staticdataLoader';
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

const HIRE_MANAGER = `manager/HIRE_MANAGER`;
const DISPLAY_MANAGER_POPUP = `manager/DISPLAY_MANAGER_POPUP`;

export const hireManager = createAction(HIRE_MANAGER)<number>();
export const displayManagerPopup = createAction(DISPLAY_MANAGER_POPUP)<boolean>();

const actions = { hireManager, displayManagerPopup };

type ManagerAction = ActionType<typeof actions>;


export type ManagerState = {
  list: ManagerType[];
  hired: {};
  isShown: boolean; // check if manager window is open
}

let list = StaticDataService.getInstance().getAvailableManagers();
let initialState = {
  list,
  hired: {},
  isShown: false
}

let manager =  createReducer<ManagerState, ManagerAction>(initialState)
  .handleAction(hireManager, (state, action) => {
    state.hired[action.payload] = true;
    return {
      ...state
    }
  })  
  .handleAction(displayManagerPopup, (state, action) => ({...state, isShown: action.payload}));

export default manager;


