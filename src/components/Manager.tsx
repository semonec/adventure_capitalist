import React from 'react';
import { ManagerState, initManagers } from '../modules/managers';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AVAILABLE_BUSINESS } from '../modules/index';
import manager from '../modules/managers';

const Manager: React.FC = (props) => {
  let dispatch = useDispatch();
  let {available, hired} = useSelector((state: RootState) => state.manager);
  let displayList = available.filter( item => !hired[item]);
  return (
    <div>
    </div>
  );
}

export default Manager;