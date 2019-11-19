import { useSelector } from 'react-redux';
import { RootState } from 'modules';
import StaticDataService from '../services/staticdataLoader';

export default function useBusiness(name: string) {
  const state = useSelector((state: RootState) => state);
  let businessItem;

  for (let i in state) {
    if ((state as any)[i] && (state as any)[i].name === name) {
      businessItem = (state as any)[i];
    }
  }
  
  // check manager hired
  let isManagerHired = StaticDataService.getInstance().getAutomateManagers().findIndex(item => 
    state.manager.hired[item.id] === true && item.part === name) >= 0;
  return {...businessItem, isManagerHired};
}
