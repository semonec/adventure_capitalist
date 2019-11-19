import React, { useState } from 'react';
import useBusiness from 'hooks/useBusiness';
import  'styles/scss/Business.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faNewspaper, faCar } from "@fortawesome/free-solid-svg-icons";
import useInterval from 'hooks/useInterval';
import  { useDispatch, useSelector } from 'react-redux';
import { changeStateActions, progressActions, RootState, levelUpActions } from 'modules/index';
import { increaseMoney, decreaseMoney } from 'modules/player';
import { msToHHMMSS } from 'tools/util';

type BusinessProps = {
  type: string
};
const PROGRESS_INTERVAL_TIME = 70;

const Business: React.FC<BusinessProps> = (props) => {
  const [count, setCount] = useState(0);
  let { name, duration, state, progress, revenue, levelUpCost, level } = useBusiness(props.type);
  let { money } = useSelector((state: RootState) => state.player);

  const dispatch = useDispatch();

  const isBusy = state === 'BUSY' ? true : false;

  useInterval(() => {
    dispatch(progressActions[name]( count / duration * 100));
    setCount(count => count + PROGRESS_INTERVAL_TIME);
  }, isBusy ? PROGRESS_INTERVAL_TIME : null);

  if (isBusy && count >= duration) {
    dispatch(changeStateActions[name]('IDLE'));
    dispatch(increaseMoney(revenue));
    setCount(0);
  }

  /*
   * Controlling onClick events
   * It couldn't be maed in other classes or functions because react hook only could run in the functional component.
   */
  const HandleProcess = (e: any) => {
    state !== 'BUSY' && dispatch(changeStateActions[name]('BUSY'));
  }

  const HandleUpgrade = (e: any) => {
    if (levelUpCost <= money ) {
      const levelUp = levelUpActions[name];
      dispatch(decreaseMoney(levelUpCost));
      dispatch(levelUp());
    }
  }

  return (
    <div className='business'>
        <FontAwesomeIcon className={'icon ' + name.toLowerCase()} icon={faLemon} onClick={HandleProcess}/>
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
export default Business;
