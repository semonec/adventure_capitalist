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

// Props for Business functional component
type BusinessItemProps = {
  type: string
};

// Business item's icon selector. actually should have to obtain from asset, but I cann't get proper assets. 
// so organize with font-awesome-icons
// TODO: remove this and organize with icon assets as SCSS
const ICON_FOR_BUSINESS_ITEM = {
  'LEMON': faLemon,
  'NEWSPAPER': faNewspaper,
  'CAR_WASH': faCar
};

//time cost of each business progress's animation time
// TODO: not to be const, changable with business item's duration
const PROGRESS_INTERVAL_TIME = 100;

/**
 * Business item's react functional component
 * It will draw Each busines item with icon, current level, revenue of item, upgrade cost are remained(while processing)
 * duration(while idle) time
 * Not only display these data, but allow click to icon and level up button,
 * Dispatch actions to make it possible to start earning process or upgrade it's level.
 * @param {BusinessItemProps} props Props from App Container Component component data from initial or loaded state
 * @returns {JSX} will be rendered DOM tree.
 */
const Business: React.FC<BusinessItemProps> = (props) => {
  // for progress drawing, it'll updated as state changes
  const [count, setCount] = useState(0);
  //getting business items from props, which came from App Container component, initial value or previously played data
  let { name, duration, state, progress, revenue, levelUpCost, level, isAutomated } = useBusiness(props.type);
  let { money } = useSelector((state: RootState) => state.player); // getting money information from redux store

  const { bizChangeStateAction, bizLvlUpAction, bizProgressAction }  = bizActions.get(name); // dispatch action sets

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
  // every update, automated business item will try to change it's state as busy
  isAutomated && dispatch(bizChangeStateAction('BUSY'));
  
  return (
    <div className='business'>
        <FontAwesomeIcon className={'icon ' + name.toLowerCase()} icon={ICON_FOR_BUSINESS_ITEM[name]} onClick={ isAutomated ? undefined : HandleProcess }/>
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
