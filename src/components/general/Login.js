import React from 'react';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../../store';
import { API } from '../../api';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      sessionId: "",
    };
  }

  setPassword = (e) => {
    const password = e.target.value;
    this.setState({password});
  }

  setEmail = (e) => {
    this.setState({email: e.target.value});
  }

  login = () => {
    const request = { auth: { email: this.state.email, password: this.state.password } };

    API.login(request)
    .then(result => {
      if (result.status === 'ok') {
        this.props.setLogin();
        this.props.setParticipantId(Number(this.state.id));
        // console.log(result.session);
        this.props.setSessionId(Number(result.session));
        this.props.setJwtToken(result.access_token);
        this.props.setJwtRefreshToken(result.refresh_token);
        this.props.history.push('/work_preference_overview');
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

  render() {
    return (
      <div className="row" style={{marginBottom:"0px"}} >
        <button onClick={() => this.props.history.push('/signup')}>Signup</button>
        <div className="login-b2">
          <h3> Help us understand how algorithms affect you.</h3>
          <p>
            Thank you for voluntarily participating in our research. The goal of this
            online session is understand your work practice around your
            company’s in-app algorithm, which matches drivers with potential
            customers. We believe it is important to hear what drivers have to say
            about their companies’ current algorithmic systems and thus greatly
            appreciate your input.
          </p>
          <p>
            There are no risks or benefits to participating in this session. Any data
            collected from this session will be stored confidentially and
            anonymously and only shared within our research team at Carnegie
            Mellon. Following the session, we will provide a gift card of your
            choosing as a show of our appreciation for your time.
          </p>
        </div>
        <div className="login-b1">
          <div>
            <div>
              <span>Login</span>
              <hr id='hhr' />
              <div className="control-group-id">
                <label>Email</label>
                <div className="controls">
                  <input onChange={this.setEmail} type="text" placeholder="Email" />
                </div>
              </div>
              <br />
              <div className="control-group-password">
                <label>Password</label>
                <div className="controls">
                  <input onChange={this.setPassword} onKeyDown={this.onKeyDown} type="password" placeholder="Password" />
                </div>
              </div>
              <div className="actions-login">
                <a onClick={this.login} className="login-button">Login</a>
              </div>
            </div>
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
    setSessionId: (payload) => dispatch({type: ACTION_TYPES.SET_SESSION_ID, payload}),
    setJwtToken: (payload) => dispatch({type: ACTION_TYPES.SET_JWT_TOKEN, payload}),
    setJwtRefreshToken: (payload) => dispatch({type: ACTION_TYPES.SET_JWT_REFRESH_TOKEN, payload}),
  };
}

const Login = connect(mapStoreStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;