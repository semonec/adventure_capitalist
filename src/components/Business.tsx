import React, { useState } from 'react';
import useBusiness from '../hooks/useBusiness';
import  '../styles/scss/Business.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faNewspaper, faCar } from "@fortawesome/free-solid-svg-icons";
import useInterval from '../hooks/useInterval';
import  { useDispatch, useSelector } from 'react-redux';
import { changeStateActions, progressActions, RootState, levelUpActions } from '../modules/index';
import { increaseMoney, decreaseMoney } from '../modules/player';
import { msToHHMMSS } from '../tools/util';

type BusinessProps = {
  type: string
};
const PROGRESS_INTERVAL_TIME = 70;

const Business: React.FC<BusinessProps> = (props) => {
  const [count, setCount] = useState(0);
  let { name, duration, state, progress, revenue, levelUpCost, level } = useBusiness(props.type);
  let { money } = useSelector((state: RootState) => state.player);

  const dispatch = useDispatch();

  const changeState = changeStateActions[name];
  const isBusy = state === 'BUSY' ? true : false;

  const interval = useInterval(() => {
    dispatch(progressActions[name]( count / duration * 100));
    setCount(count => count + PROGRESS_INTERVAL_TIME);
  }, isBusy ? PROGRESS_INTERVAL_TIME : null);

  if (isBusy && count >= duration) {
    dispatch(changeState('IDLE'));
    dispatch(increaseMoney(revenue));
    setCount(0);
  }

  const HandleProcess = (e: any) => {
    state !== 'BUSY' && dispatch(changeState('BUSY'));
  }

  const HandleUpgrade = (e: any) => {
    if (levelUpCost <= money ) {
      const levelUp = levelUpActions[name];
      dispatch(decreaseMoney(levelUpCost));
      dispatch(levelUp());
    }
  }

  const visibilityProgress = isBusy? 'visible' : 'hidden';
  const time = msToHHMMSS(duration - (isBusy ?  count : 0));
  
  const upgradeClassName = 'upgrade' + (levelUpCost <= money ? '' : ' disable');
  return (
    <div className='business'>
        <FontAwesomeIcon className='icon' icon={faLemon} onClick={HandleProcess}/>
        <div className='level'> {level} </div>
        <div className=
          {
            isBusy ? 'revenue busy progressbar': 'revenue progressbar'
          }> 
          <div className='progress' style={{width: `${progress}%`, visibility: (`${visibilityProgress}` as any)}}></div>
          <div className='textbox'>{revenue}</div>
        </div>
        <div className={upgradeClassName} onClick={HandleUpgrade}> {levelUpCost} </div>
        <div className='duration'> {time} </div>

    </div>
  );
}
export default Business;
