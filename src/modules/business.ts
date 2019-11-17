  
import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';
import { Reducer } from 'react';
import { changeStateActions, levelUpActions, progressActions } from './index';

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

  const changeState = createAction(CHANGE_STATUS)<BusinessStatusType>();
  const levelUp = createAction(LEVEL_UP)<number>();
  const progress = createAction(PROGRESS)<number>();

  const actions = { changeState, levelUp, progress };

  changeStateActions[name] = changeState;
  levelUpActions[name] = levelUp;
  progressActions[name] = progress;

  type BusinessAction = ActionType<typeof actions>;


  //  TODO: get initial date from static data
  let initialState = {
    name,
    state: 'LOCKED' as BusinessStatusType,
    duration: 4000,
    level: 1,
    levelUpCost: 10, 
    revenue: 10,
    progress: 0
  };

  return createReducer<BusinessState, BusinessAction>(initialState)
    .handleAction(changeState, (state, action) =>(
      { 
        ...state,
        state: (action.payload as any),
        progress: 0
      }
    ))
    .handleAction(progress, (state, action) =>(
      { 
        ...state,
        progress: action.payload 
      }
    ));
}

