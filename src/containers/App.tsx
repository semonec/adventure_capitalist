import React from 'react';

import { RootState } from 'modules';
import { connect } from 'react-redux';
import Money from 'components/Money';
import Business from 'components/Business';
import 'styles/scss/Panel.scss';
import Manager from 'components/Manager';
import { store } from 'index';
import PlayerDataService from '../services/playerDataService';
import { increaseMoney } from '../modules/player';

type BusinessProps = {
  business: any[]
};

class App extends React.Component<BusinessProps> {
  constructor(props) {
    super(props);
    let loadedMoney = PlayerDataService.getInstance().loadUserMoney();
    store.dispatch(increaseMoney(loadedMoney));
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