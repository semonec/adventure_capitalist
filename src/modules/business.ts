  
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';
import { Reducer } from 'react';
import StaticDataService from 'services/staticdataLoader';
import PlayerDataService from 'services/playerDataService';
import { ManagerType } from '../services/staticdataLoader';

export type BusinessInitData = {
  name: string,
  duration: number,
  levelUpCost: number,
  revenue: number;
}

export type BusinessStatusType = 'IDLE' | 'BUSY' | 'LOCKED';

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

export const bizActions = new Map();


export default function generateBusinessState(name: string): Reducer<BusinessState | undefined, any> {
  const CHANGE_STATUS = `business/CHANGE_STATE_${name}`;
  const LEVEL_UP = `business/LEVEL_UP_${name}`;
  const PROGRESS = `business/PROGRESS_${name}`;
  const RESTORE = `business/RESTORE_${name}`;
  const HIRE_MANAGER = `business/HIRE_MANAGER_${name}`;

  const changeState = createAction(CHANGE_STATUS)<BusinessStatusType>();
  const levelUp = createAction(LEVEL_UP)();
  const progress = createAction(PROGRESS)<number>();
  const restore = createAction(RESTORE)<BusinessState>();
  const hireManager = createAction(HIRE_MANAGER)<ManagerType>();

  const actions = { changeState, levelUp, progress, restore, hireManager };

  bizActions.set(name, actions);

  type BusinessAction = ActionType<typeof actions>;


  //  TODO: get initial date from static data
  let initialData = StaticDataService.getInstance().getBusinessItem(name, 1);
  let initialState = {
    name,
    state: 'LOCKED' as BusinessStatusType,
    ...initialData,
    progress: 0,
    isAutomated: false
  };

  return createReducer<BusinessState, BusinessAction>(initialState)
    .handleAction(progress, (state, action) => {
      state.progress = action.payload;
      return state;
    })
    .handleAction(hireManager, (state, action) => {
      let manager = action.payload as ManagerType;

      return {
        ...state
      }
    })
    .handleAction(changeState, (state, action) => {
      
      let newState = {
        ...state,
        state: (action.payload as any),
        progress: 0
      };

      PlayerDataService.getInstance().storeUserBusiness(newState);
      return newState;
    })
    .handleAction(restore, (state, action) => ({...action.payload}))
    .handleAction(levelUp, (state) =>{
      let nextData = StaticDataService.getInstance().getBusinessItem(name, state.level + 1);
      let newState = { ...state, ...nextData };
      PlayerDataService.getInstance().storeUserBusiness(newState);
      return newState;
    });
}

