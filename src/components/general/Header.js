import React from 'react';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../../store';
import { API } from '../../api';
import { TESTING_ADMINS, HEADERS } from '../../constants';

class HeaderComponent extends React.Component {


  logout = () => {
    let jwtHeader = {...HEADERS, 'Authorization': `Bearer ${this.props.jwtToken}`};
    let jwtRefreshHeader = {...HEADERS, 'Authorization': `Bearer ${this.props.jwtRefreshToken}`};
    this.props.setLogout();
    // console.log(header);
    API.logout(jwtHeader).then(() => {
        API.destroyRefresh(jwtRefreshHeader).then(() => console.log("yaYEET"));
    });
    // if (TESTING_ADMINS.includes(this.props.participantId)) {
    //   API.testReset(this.props.participantId).then(() => alert("and reset everything"));
    // }
    window.location.replace('http://localhost:3000/');
    return false;
  }

  render () {
    return (
      <nav className="white">
        <div className="nav-wrapper">
          <div className="col s12" style={{paddingLeft: "70px", paddingRight: "70px"}}>
            <span style={{color: "#555", fontSize: "30px", fontWeight: "bold"}}>WeBuildAI</span>
            <ul id="nav-mobile" className="right">
              {this.props.isLoggedIn &&
                <li><a onClick={this.logout} className="wbai">Logout</a></li>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStoreStateToProps = (storeState, givenProps) => {
  return {
    ...givenProps,
    isLoggedIn: storeState.isLoggedIn,
    participantId: storeState.participantId,
    jwtToken: storeState.jwtToken,
    jwtRefreshToken: storeState.jwtRefreshToken,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLogout: () => dispatch({ type: ACTION_TYPES.END_RL_FLOW }),
  };
}

const Header = connect(mapStoreStateToProps, mapDispatchToProps)(HeaderComponent);
export default Header;