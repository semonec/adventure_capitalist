import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';
import  'styles/scss/Money.scss';

/**
 * Display current remaind money, Functional Component
 */
const Money: React.FC = () => {
  const { player } = useSelector((state: RootState) => state);

  return (
    <div className='player'>
      <p>{player.money}</p>
    </div>
  );
}

export default Money;