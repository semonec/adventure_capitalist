import React from 'react';

import { RootState } from 'modules';
import { connect } from 'react-redux';
import Money from 'components/Money';
import Business from 'components/Business';
import 'styles/scss/Panel.scss';
import Manager from 'components/Manager';
import { store } from 'index';
import PlayerDataService from '../services/playerDataService';
import { restoreMoney } from '../modules/player';
import { restoreActions } from '../modules/index';

type BusinessProps = {
  business: any[]
};

class App extends React.Component<BusinessProps> {
  constructor(props) {
    super(props);
    let loadedMoney = PlayerDataService.getInstance().loadUserMoney();
    store.dispatch(restoreMoney(loadedMoney));
    let loadedBusiness = props.business.map(item=> PlayerDataService.getInstance().loadUserBusiness(item.name));
    console.log('loadedBusiness', loadedBusiness);
    if (loadedBusiness !== null && loadedBusiness.length ) {
      loadedBusiness.forEach(item => {
        console.log('item', item);
        item && item.name && store.dispatch(restoreActions[item.name](item));
      })
    }
  }

  render() {
    return (
      <div>
        <div className='left-panel'>
            <Manager />
        </div>
        <div className='right-panel'>
          <Money />
          {
            this.props.business.map((item, i) => {
              return (
                <Business type={item.name} key={i}/>
              );
            })
          }
        </div>


      </div>
    );
  }
}

let mapStateToProps = (state: RootState): BusinessProps => {

  return { business: [state.lemon, state.carWash, state.newspaper]};
}

export default connect(mapStateToProps)(App);