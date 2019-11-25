import React from 'react';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../../store';
import { API } from '../../api';
import styles from '../../styles/Login.module.css';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: ""
    };
  }

  setPassword = (e) => {
    const password = e.target.value;
    this.setState({password});
  }

  setId = (e) => {
    const id = e.target.value;
    this.setState({id});
  }

  login = () => {
    const request = { auth: { id: this.state.id, password: this.state.password } };
    console.log(request)
    API.login(request)
    .then(result => {
      if (result.status === 'ok') {
        this.props.setLogin();
        this.props.setParticipantId(Number(this.state.id));
        this.props.history.push('/work_preference_overview')
      } else {
        alert("failed to log in");
      }
    })
    .catch(err => console.log('error logging in', err));
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.login();
    }
  }

  testClick = () => {
    const session = { user_id: 1, id: 1 };
    // API.getFeatures({ category: 'request', user_id: 1 }).then(data => console.log("result", data));
    // return
    // const feature = (weight) => ({
    //   description: "test feature",
    //   name: 'How many dogs',
    //   category: 'request',
    //   unit: 'dogs',
    //   icon: 'd',
    //   is_categorical: true,
    //   options: ["a", "b", "c"],
    //   weight,
    // })
    // const feature = ({
    //   description: "test feature",
    //   name: 'How many dogs',
    //   category: 'request',
    //   unit: 'dogs',
    //   icon: 'd',
    //   is_categorical: true,
    //   options: ["a", "b", "c", "d"],
    // })
    // const new_features = [feature(20), feature(80), feature(0)]
    // const feature_weights = { 1: 3 }
    // API.saveFeatureWeights({ new_features:[], feature_weights, session }).then(data => console.log(data));
    // API.createFeature({ feature, session }).then(data => console.log("result", data));
    // API.generatePairwiseComparisons({ category: 'request', num_comps: 3, session }).then(data => console.log(data));
    API.updateChoice({ pairwise_id: 3, choice: 1, reason: "foo" }).then(data=>console.log(data));
  }

  render() {
    return (
      <div className={styles.row} style={{marginBottom:"0px"}} >
        <div className={styles.loginLeft}>
          <h3 className={styles.title}> Help us understand how algorithms affect you.</h3>
          <p className={styles.text}>
            Thank you for voluntarily participating in our research. The goal of this
            online session is understand your work practice around your
            company’s in-app algorithm, which matches drivers with potential
            customers. We believe it is important to hear what drivers have to say
            about their companies’ current algorithmic systems and thus greatly
            appreciate your input.
          </p>
          <p className={styles.text}>
            There are no risks or benefits to participating in this session. Any data
            collected from this session will be stored confidentially and
            anonymously and only shared within our research team at Carnegie
            Mellon. Following the session, we will provide a gift card of your
            choosing as a show of our appreciation for your time.
          </p>
        </div>
        <div className={styles.loginRight}>
            <p className={styles.login}>Login</p>
            <hr className={styles.hr}/>
            <div className={styles.controlGroup}>
              <label>ID</label>
              <div className="controls">
                <input onChange={this.setId} type="text" placeholder="ID" />
              </div>
            </div>
            <br />
            <div className={styles.controlGroup}>
              <label>Password</label>
              <div className="controls">
                <input onChange={this.setPassword} onKeyDown={this.onKeyDown} type="password" placeholder="Password" />
              </div>
            </div>
            <div className={styles.loginBtn}>
              <a onClick={this.login} className="login-button">Login</a>
            </div>
        </div>
      </div>
    )
  }
}

const mapStoreStateToProps = (storeState, givenProps) => {
  return { ...givenProps };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: () => dispatch({ type: ACTION_TYPES.SET_LOGIN, payload: true }),
    setParticipantId: (payload) => dispatch({type: ACTION_TYPES.SET_PARTICIPANT_ID, payload }),
  };
}

const Login = connect(mapStoreStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;