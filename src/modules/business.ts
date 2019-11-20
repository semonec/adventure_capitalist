  
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';
import { Reducer } from 'react';
import { changeStateActions, levelUpActions, progressActions, restoreActions } from './index';
import StaticDataService from 'services/staticdataLoader';
import PlayerDataService from 'services/playerDataService';

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
}

export function generateBusinessState(name: string): Reducer<any, any> {
  const CHANGE_STATUS = `business/CHANGE_STATE_${name}`;
  const LEVEL_UP = `business/LEVEL_UP_${name}`;
  const PROGRESS = `business/PROGRESS_${name}`;
  const RESTORE = `business/RESTORE_${name}`;

  const changeState = createAction(CHANGE_STATUS)<BusinessStatusType>();
  const levelUp = createAction(LEVEL_UP)();
  const progress = createAction(PROGRESS)<number>();
  const restore = createAction(RESTORE)<BusinessState>();

  const actions = { changeState, levelUp, progress, restore };

  changeStateActions[name] = changeState;
  levelUpActions[name] = levelUp;
  progressActions[name] = progress;
  restoreActions[name] = restore;

  type BusinessAction = ActionType<typeof actions>;


  //  TODO: get initial date from static data
  let initialData = StaticDataService.getInstance().getBusinessItem(name, 1);
  let initialState = {
    name,
    state: 'LOCKED' as BusinessStatusType,
    ...initialData,
    progress: 0
  };

  return createReducer<BusinessState, BusinessAction>(initialState)
    .handleAction(changeState, (state, action) => {
      
      let newState = {
        ...state,
        state: (action.payload as any),
        progress: 0
      };

      PlayerDataService.getInstance().storeUserBusiness(newState);
      return newState;
    })
    .handleAction(progress, (state, action) => {
      state.progress = action.payload;
      return state;
    })
    .handleAction(restore, (state, action) => ({...action.payload}))
    .handleAction(levelUp, (state) =>{
      let nextData = StaticDataService.getInstance().getBusinessItem(name, state.level + 1);
      let newState = { ...state, ...nextData };
      PlayerDataService.getInstance().storeUserBusiness(newState);
      return newState;
    });
}

