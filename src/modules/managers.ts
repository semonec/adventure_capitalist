import StaticDataService from 'services/staticdataLoader';
import PlayerDataService from '../services/playerDataService';
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';


/**
 * Define ManagerType
 * It'll store manager information from staticdata
 * @prop {number} id  Manager's id. 
 * @prop {string} name Manager' name would be displayed at manager list popup
 * @prop {number} slalry The cost for hiring manager
 * @prop {string} effect Type of manager works. currently I've implemented only Automation, but actual AdCap game has more type of manager.
 * @prop {string} part Name of Business. which works for.
 * @prop {string} description Description of that manager, will be displayed at Manager list popup
 */
export type ManagerType = {
  'id': number;
  'name': string;
  'salary': number;
  'effect': string,
  'part' : string,
  'description': string
};

/**
 * Define Manager store state
 * @prop {ManagerType[]} list A list of ManagerType, obtained from staticdata
 * @prop {object} hired Hired status of managers. it will be organized as key = manage's id, value: true/false
 * @prop {boolean} isShown Manager list popup's display status. 
 */
export type ManagerState = {
  list: ManagerType[];
  hired: {};
  isShown: boolean;
}


// define action type name
const HIRE_MANAGER = `manager/HIRE_MANAGER`;
const DISPLAY_MANAGER_POPUP = `manager/DISPLAY_MANAGER_POPUP`;
const RESTORE_MANAGER = `manager/RESTORE_MANAGER`;

/**
 * Action for Hiring manager
 * This information will be managed by both business and manager state, will be effect each's item, and it's list
 * @param number Selected manager's id that want to hire
 * @example
 * dispatch(hireManagerAction(manager.id)); 
 */
export const hireManagerAction = createAction(HIRE_MANAGER)<number>();
/**
 * Action for toggle manager list popup
 * @param boolean If true, it will be displayed or hided.
 * @example
 * dispatch(displayManagerPopupAction(true));
 */
export const displayManagerPopupAction = createAction(DISPLAY_MANAGER_POPUP)<boolean>();
/**
 * Action for load saved manager state from localStorage(current, not having it's backend).
 * @param hired  ManagerState's hired property. contains with manager's id and hired status.
 * @example
 * dispatch(restoreManagerAction({"1": true}))
 */
export const restoreManagerAction = createAction(RESTORE_MANAGER)<{}>();

const actions = { hireManagerAction, displayManagerPopupAction, restoreManagerAction };
type ManagerAction = ActionType<typeof actions>;

// Get Manager's information from staticdata
const list = StaticDataService.getInstance().getAvailableManagers();
const initialState = {
  list,
  hired: {},
  isShown: false
}

// reducer for manager
const manager = createReducer<ManagerState, ManagerAction>(initialState)
  .handleAction(hireManagerAction, (state, action) => {
    // TODO:at that time manager state changed, it'll be stored at localStorage, future will be replaced as backend server
    PlayerDataService.getInstance().storeUserManager({...state.hired, [action.payload]: true });
    return { ...state, hired: {...state.hired, [action.payload]: true}};
  })
  .handleAction(restoreManagerAction, (state, action) => ({ ...state, hired: action.payload }))
  .handleAction(displayManagerPopupAction, (state, action) => ({...state, isShown: action.payload}));

export default manager;


