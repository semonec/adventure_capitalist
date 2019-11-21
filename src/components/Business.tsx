import React, { useState } from 'react';
import useBusiness from 'hooks/useBusiness';
import  'styles/scss/Business.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faNewspaper, faCar, faQuestion } from "@fortawesome/free-solid-svg-icons";
import useInterval from 'hooks/useInterval';
import  { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { increaseMoney, decreaseMoney } from 'modules/player';
import { msToHHMMSS } from 'tools/util';
import { bizActions } from '../modules/business';

type BusinessItemProps = {
  type: string
};
const PROGRESS_INTERVAL_TIME = 70;

const Business: React.FC<BusinessItemProps> = (props) => {
  const [count, setCount] = useState(0);
  let { name, duration, state, progress, revenue, levelUpCost, level, isAutomated } = useBusiness(props.type);
  let { money } = useSelector((state: RootState) => state.player);

  const { bizChangeStateAction, bizLvlUpAction, bizProgressAction }  = bizActions.get(name);

  const dispatch = useDispatch();
  const isBusy = state === 'BUSY' ? true : false;

  useInterval(() => {
    dispatch(bizProgressAction( count / duration * 100));
    setCount(count => count + PROGRESS_INTERVAL_TIME);
  }, isBusy ? PROGRESS_INTERVAL_TIME : null);

  // if business task is finished then change state as idle 
  if (isBusy && count >= duration) {
    dispatch(bizChangeStateAction('IDLE'));
    dispatch(increaseMoney(revenue));
    setCount(0);
  }

  /*
   * Controlling onClick events
   * It couldn't be maed in other classes or functions because react hook only could run in the functional component.
   */
  const HandleProcess = (e: any) => {
    dispatch(bizChangeStateAction('BUSY'));
  }

  const HandleUpgrade = (e: any) => {
    if (levelUpCost <= money ) {
      dispatch(decreaseMoney(levelUpCost));
      dispatch(bizLvlUpAction());
    }
  }
  isAutomated && dispatch(bizChangeStateAction('BUSY'));
  
  // set icon selector
  let icon = faQuestion;
  switch (name) {
    case 'LEMON':
      icon = faLemon;
      break;
    case 'NEWSPAPER':
      icon = faNewspaper;
      break;
    case 'CAR_WASH':
      icon = faCar;
      break;
  }


  return (
    <div className='business'>
        <FontAwesomeIcon className={'icon ' + name.toLowerCase()} icon={icon} onClick={ isAutomated ? undefined : HandleProcess }/>
        <div className='level'> {level} </div>
        <div className= { isBusy ? 'revenue busy progressbar': 'revenue progressbar' }> 
          <div className='progress' style={{width: `${progress}%`, visibility: isBusy? 'visible' : 'hidden'}}></div>
          <div className='textbox'>{revenue}</div>
        </div>
        <div className={'upgrade' + (levelUpCost <= money ? '' : ' disable')} onClick={HandleUpgrade}> {levelUpCost} </div>
        <div className='duration'> {msToHHMMSS(duration - (isBusy ?  count : 0))} </div>

    </div>
  );
}
export default React.memo(Business);
