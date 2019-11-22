import { useSelector } from 'react-redux';
import { RootState } from 'modules';
import { BusinessState } from 'modules/business';

export default function useBusiness(name: string): BusinessState {
  const state = useSelector((state: RootState) => state);
  let businessItem;

  for (let i in state) {
    if ((state as any)[i] && (state as any)[i].name === name) {
      businessItem = (state as any)[i];
    }
  }
  // check manager hired
  return businessItem;
}
