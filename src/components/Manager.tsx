import React from 'react';
import {  displayManagerPopup } from '../modules/managers';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/index';
import  '../styles/scss/Manager.scss';
 
const Manager: React.FC = (props) => {
  let dispatch = useDispatch();
  let {available, hired, isShown} = useSelector((state: RootState) => state.manager);
  let displayList = available.filter( item => !hired[item]);

  const showManagerPopup = (value: boolean) => {
    dispatch(displayManagerPopup(value));
  }

  return (
    <div>
      <button className="manager-button" onClick={() => showManagerPopup(true)}>Manager</button>
      <div className="manager-layer" style={ isShown ? {} : {display: 'none'}}>
        <div className="manager-layer-close-button" onClick={() => showManagerPopup(false)}>X</div>  
      </div>
    </div>
  );
}

export default Manager;