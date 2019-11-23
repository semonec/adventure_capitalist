  
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';
import { Reducer } from 'react';
import StaticDataService from 'services/staticdataLoader';
import PlayerDataService from 'services/playerDataService';
import { ManagerType } from 'modules/managers';

type BusinessInitData = {
  name: string,
  duration: number,
  levelUpCost: number,
  revenue: number;
}

/**
 * Define business's type
 *  @type {'IDLE'} Can start process
 *  @type {'BUSY'} Process is ongoing
 *  @type {'LOCKED'} Locked, if you want start this business, you must unlock it
 */
export type BusinessStatusType = 'IDLE' | 'BUSY' | 'LOCKED';

/**
 * Define Business store state
 * @prop {string} name  Business's name. will be treat as Key.
 * @prop {BusinessStatusType} state Business's current state. For more detail see `BusinessStatusType`
 * @prop {number} duration Business's process ongoing time, *ms*
 * @prop {number} level Business' current level.
 * @prop {number} levelUpCost A cost of level up for business
 * @prop {number} revenue Income for each process's each duration
 * @prop {number} progress Business's process's onging time as percentage
 * @prop {boolean} isAutomated Whether business should be automated by it's hired manager
 */
export type BusinessState = {
  name: string;
  state: BusinessStatusType;
  duration: number;
  level: number;
  levelUpCost: number;
  revenue: number;
  progress: number;
  isAutomated: boolean;
};

/**
 * You can access business item's actions from here
 * Actions are below:
 * @prop {PayloadActionCreator<string, BusinessStatusType>} bizChangeStateAction
 *        Dispatched when business state changed, see **BusinessStatusType**
 * @prop {EmptyActionCreator<string>} bizLvlUpAction Dispatched when business has been levelup
 * @prop {PayloadActionCreator<string, number>} bizProgressAction Dispatched when business's process's progress has been updated
 * @prop {PayloadActionCreator<string, BusinessState>} bizRestoreAction Dispatched when restoring business's state, from specific time, ex) re-launch 
 * @prop {PayloadActionCreator<string, ManagerType>} bizHireMgrAction Dispatched when Manager hire.
 */
export const bizActions = new Map();

/**
 * ### Create Business Reducer and register it's actions into map.
 * We can create each business item without duplicated code.
 * @define For making multiple Business items and it's reducer
 * @param name That name for business reducer
 * @returns {Reducer<BusinessState, BusinessAction>} A reducer that handles each business item's dispatched action, and create new store or stays as before
 * @example
 * const test = generateBusinessState("test")
 * //that `test` reducer's actions will be stored at `bizActions` map.
 * // so you can get that actions like below:
 * {
 *  ...
 *  const { bizChangeStateAction, bizLvlUpAction, bizProgressAction, bizRestoreAction, bizHireMgrAction } = bizActions.get('test');
 * }
 */
export default function generateBusinessReducer(name: string): Reducer<BusinessState | undefined, any> {

  // define action type name, prepare for multiple business items
  const CHANGE_STATUS = `business/CHANGE_STATE_${name}`;
  const LEVEL_UP = `business/LEVEL_UP_${name}`;
  const PROGRESS = `business/PROGRESS_${name}`;
  const RESTORE = `business/RESTORE_${name}`;
  const HIRE_MANAGER = `business/HIRE_MANAGER_${name}`;

  // create action with typesafe-actions
  const bizChangeStateAction = createAction(CHANGE_STATUS)<BusinessStatusType>();
  const bizLvlUpAction = createAction(LEVEL_UP)();
  const bizProgressAction = createAction(PROGRESS)<number>();
  const bizRestoreAction = createAction(RESTORE)<BusinessState>();
  const bizHireMgrAction = createAction(HIRE_MANAGER)<ManagerType>();

  // make action type and put created actions into map with key, it's name
  const actions = { bizChangeStateAction, bizLvlUpAction, bizProgressAction, bizRestoreAction, bizHireMgrAction };
  type BusinessAction = ActionType<typeof actions>;

  bizActions.set(name, actions);

  // Getting initial data from static data
  const initialData = StaticDataService.getInstance().getBusinessItem(name, 1);
  const initialState = {
    name,
    state: 'LOCKED' as BusinessStatusType,
    ...initialData,
    progress: 0,
    isAutomated: false
  };

  // progress, change state action could be occured very frequently, so will not update object itself.
  // only chnage it's value only so we can gaurantee not make unnecessary update of store, with React.memo
  return createReducer<BusinessState, BusinessAction>(initialState)
    .handleAction(bizProgressAction, (state, action) => {
      state.progress = action.payload;
      return state;
    })
    .handleAction(bizHireMgrAction, (state, action) => {
      const manager = action.payload as ManagerType;
      state.isAutomated = manager.effect === 'AUTOMATIC'
      return state;
    })
    .handleAction(bizChangeStateAction, (state, action) => {
      if (state.state === action.payload)
        return state;
      const newState = {
        ...state,
        state: (action.payload as any),
        progress: 0
      };

      PlayerDataService.getInstance().storeUserBusiness(newState);
      return newState;
    })
    // .handleAction(bizRestoreAction, (state, action) => ({...action.payload}))
    .handleAction(bizRestoreAction, (state, action) => {
      return {...action.payload}
    })

    .handleAction(bizLvlUpAction, (state) =>{
      const nextData = StaticDataService.getInstance().getBusinessItem(name, state.level + 1);
      const newState = { ...state, ...nextData };
      PlayerDataService.getInstance().storeUserBusiness(newState);
      return newState;
    });
}

