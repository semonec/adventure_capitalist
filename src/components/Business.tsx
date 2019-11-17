import React, { useState } from 'react';
import useBusiness from '../hooks/useBusiness';
import  '../styles/scss/Business.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLemon, faNewspaper, faCar } from "@fortawesome/free-solid-svg-icons";
import useInterval from '../hooks/useInterval';
import  { useDispatch } from 'react-redux';
import { changeStateActions, progressActions } from '../modules/index';
import { increaseMoney } from '../modules/player';

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

  const interval = useInterval(() => {
    dispatch(progress( count / business.duration * 100));
    setCount(count => count + PROGRESS_INTERVAL_TIME);
  }, business.state === 'BUSY' ? PROGRESS_INTERVAL_TIME : null);

  if (business.state === 'BUSY' && count >= business.duration) {
    dispatch(changeState('IDLE'));
    dispatch(increaseMoney(business.revenue));
    setCount(0);
  }

  const HandleClick = (e: any) => {
    business.state !== 'BUSY' && dispatch(changeState('BUSY'));
  }

  const visibilityProgress = business.state === 'BUSY'? 'visible' : 'hidden';

  return (
    <div className='business'>
        <FontAwesomeIcon className='icon' icon={faLemon} onClick={HandleClick}/>
        <div className='level'> {business.level} </div>
        <div className=
          {
            business.state === 'BUSY' ? 'revenue busy progressbar': 'revenue progressbar'
          }> 
          <div className='progress' style={{width: `${business.progress}%`, visibility: (`${visibilityProgress}` as any)}}></div>
          <div>{business.revenue}</div>
        </div>
        <div className='upgrade'> {business.levelUpCost} </div>
        <div className='duration'> {business.duration} </div>

    </div>
  );
}
export default Business;
