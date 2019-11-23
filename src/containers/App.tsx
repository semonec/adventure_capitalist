import React from 'react';

import { RootState } from 'modules';
import { connect } from 'react-redux';
import Player from 'components/Player';
import Business from 'components/Business';
import 'styles/scss/Panel.scss';
import Manager from 'components/Manager';
import { store } from 'index';
import PlayerDataService from 'services/playerDataService';
import { restoreMoney } from 'modules/player';
import { bizActions } from 'modules/business';
import { restoreManagerAction } from 'modules/managers';
import { BusinessState } from 'modules/business';
import 'styles/scss/App.scss';

/**
 * Type for business items
 * @param {}
 */
type BusinessProps = {
  business: (BusinessState | undefined)[]
} | undefined;

/**
 * App is the Main Container Component
 */
class App extends React.Component<BusinessProps> {
  constructor(props) {
    super(props);
    this.loadPrevious(props);
  }

  // load previous user's played informaton from localStorage  
  loadPrevious(props: BusinessProps) {
    if (!props || !props.business)
      return false;

    // load previous money & background earned
    let loadedMoney = PlayerDataService.getInstance().loadUserMoney();
    let currentTime = new Date().getTime();

    // load each business item
    let loadedBusiness = props.business.map(item=> item && PlayerDataService.getInstance().loadUserBusiness(item.name));
    if (loadedBusiness !== null && loadedBusiness.length ) {
      loadedBusiness.forEach(item => {
        // if stroed ( state changed or level-up), then restore
        if (item && item.name) {
          let { bizRestoreAction } = bizActions.get(item.name);

          loadedMoney += PlayerDataService.getInstance().calculateBackgroundEarned(currentTime, item);
          store.dispatch(bizRestoreAction(item));
        }
      });
      const loadedManager = PlayerDataService.getInstance().loadUserManager();
      loadedManager && store.dispatch(restoreManagerAction(loadedManager));
      store.dispatch(restoreMoney(loadedMoney)); // and restore final money
      return 
    }

    // load manager
    const loadedHired = PlayerDataService.getInstance().loadUserManager();
    loadedHired && store.dispatch(restoreManagerAction(loadedHired));
  }

  
  render() {
    return (
      <div className='app-layer'>
        <div className='top-panel'>
            <Manager />
        </div>
        <div className='bottom-panel'>
          <Player />
          {
            this.props 
              && this.props.business 
              && this.props.business.map((item, i) => item && <Business type={item.name} key={i}/>)
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