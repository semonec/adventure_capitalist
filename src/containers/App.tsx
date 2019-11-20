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
import { restoreManager } from '../modules/managers';

type BusinessProps = {
  business: any[]
};

class App extends React.Component<BusinessProps> {
  constructor(props) {
    super(props);
    this.loadPrevious(props);
  }

  loadPrevious(props: BusinessProps) {
    // load previous money
    let loadedMoney = PlayerDataService.getInstance().loadUserMoney();
    store.dispatch(restoreMoney(loadedMoney)); // and restore it

    // load each business item
    let loadedBusiness = props.business.map(item=> PlayerDataService.getInstance().loadUserBusiness(item.name));
    if (loadedBusiness !== null && loadedBusiness.length ) {
      loadedBusiness.forEach(item => {
        // if stroed ( state changed or level-up), then restore
        item && item.name && store.dispatch(restoreActions[item.name](item)); 
      })
    }

    // load manager
    let loadedHired = PlayerDataService.getInstance().loadUserManager();
    loadedHired && store.dispatch(restoreManager(loadedHired));
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