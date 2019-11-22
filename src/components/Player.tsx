import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';
import  'styles/scss/Money.scss';

/**
 * Display current remaind money, Functional Component
 */
const Player: React.FC = () => {
  const { player } = useSelector((state: RootState) => state);

  return (
    <div className='player'>
      <p>Current: $ {player.money}</p>
    </div>
  );
}

export default Player;