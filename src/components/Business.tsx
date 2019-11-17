import React, { useState } from 'react';
import useBusiness from '../hooks/useBusiness';
import  '../styles/scss/Business.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faNewspaper, faCar } from "@fortawesome/free-solid-svg-icons";
import useInterval from '../hooks/useInterval';
import  { useDispatch } from 'react-redux';
import { changeStateActions, progressActions } from '../modules/index';
import { increaseMoney } from '../modules/player';
import { msToHHMMSS } from '../tools/util';

type BusinessProps = {
  type: string
};
const PROGRESS_INTERVAL_TIME = 70;

const Business: React.FC<BusinessProps> = (props) => {
  const [count, setCount] = useState(0);
  let business = useBusiness(props.type);
  const dispatch = useDispatch();

  const changeState = changeStateActions[business.name];
  const progress = progressActions[business.name];
  const isBusy = business.state === 'BUSY' ? true : false;

  const interval = useInterval(() => {
    dispatch(progress( count / business.duration * 100));
    setCount(count => count + PROGRESS_INTERVAL_TIME);
  }, isBusy ? PROGRESS_INTERVAL_TIME : null);

  if (isBusy && count >= business.duration) {
    dispatch(changeState('IDLE'));
    dispatch(increaseMoney(business.revenue));
    setCount(0);
  }

  const HandleClick = (e: any) => {
    business.state !== 'BUSY' && dispatch(changeState('BUSY'));
  }

  const visibilityProgress = isBusy? 'visible' : 'hidden';
  const time = msToHHMMSS(business.duration - (isBusy ?  count : 0));
  
  return (
    <div className='business'>
        <FontAwesomeIcon className='icon' icon={faLemon} onClick={HandleClick}/>
        <div className='level'> {business.level} </div>
        <div className=
          {
            isBusy ? 'revenue busy progressbar': 'revenue progressbar'
          }> 
          <div className='progress' style={{width: `${business.progress}%`, visibility: (`${visibilityProgress}` as any)}}></div>
          <div>{business.revenue}</div>
        </div>
        <div className='upgrade'> {business.levelUpCost} </div>
        <div className='duration'> {time} </div>

    </div>
  );
}
export default Business;
