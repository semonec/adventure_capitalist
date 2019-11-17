import { useSelector } from 'react-redux';
import { RootState } from '../modules';

export default function useBusiness(name: string) {
  const state = useSelector((state: RootState) => state);
  let businessItem;

  for (let i in state) {
    if ((state as any)[i] && (state as any)[i].name === name) {
      businessItem = (state as any)[i];
    }
  }
  return businessItem;
}
