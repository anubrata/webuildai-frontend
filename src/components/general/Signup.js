import React from 'react';
import { connect } from 'react-redux';
import { ACTION_TYPES } from '../../store';
import { API } from '../../api';

class SignupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirmation: "",
            firstName: "",
            lastName: "",
        }
    }

    /* These functions set the state when the items in the form change. */
    setPassword = (event) => {
        this.setState({password: event.target.value})
    }

    setEmail = (event) => {
        this.setState({email: event.target.value})
    }

    setPasswordConfirmation = (event) => {
        this.setState({passwordConfirmation: event.target.value})
    }

    setFirstName = (event) => {
        this.setState({firstName: event.target.value})
    }

    setLastName = (event) => {
        this.setState({lastName: event.target.value})
    }

    /* Make the API request with the information in the state. */
    signup = () => {

        const request = { 
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password,
                        passwordConfirm: this.state.passwordConfirmation,
                        role: "participant"
                        };
        API.signup(request)
        .then(result => {
            if (result.status === 'ok') {
                this.props.setLogin();
                this.props.setParticipantId(Number(result.id));
                this.props.setSessionId(Number(result.session));
                this.props.setJwtToken(result.access_token);
                this.props.setJwtRefreshToken(result.refresh_token);
                this.props.history.push('/work_preference_overview');
            } else {
              alert(result.message)
            }
        })
    }

    /* If the key pressed is enter, complete the form. */
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.signup();
        }
    }

    render() {
        return (<div className="row" style={{marginBottom:"0px"}}>
                <h2> Signup </h2>
                <br />
                <p> Thank you for taking the time to participate in this research study. Please enter the requested information below to create an account. Note that we will not be sharing any of this information with anyone and will be kept confidential and anonomyzed.</p>
                <div className="signup">
                  <label>First Name</label>
                  <div className="controls">
                    <input onChange={this.setFirstName} type="text" placeholder="First name" />
                  </div>

                  <label>Last Name</label>
                  <div className="controls">
                    <input onChange={this.setLastName} type="text" placeholder="Last name" />
                  </div>

                  <label>Email</label>
                  <div className="controls">
                    <input onChange={this.setEmail} type="text" placeholder="Email" />
                  </div>

                  <div className="control-group-password">
                    <label>Password</label>
                    <div className="controls">
                      <input onChange={this.setPassword} onKeyDown={this.onKeyDown} type="password" placeholder="Password" />
                    </div>
                  </div>

                  <div className="control-group-password">
                    <label>Confirm Password</label>
                    <div className="controls">
                      <input onChange={this.setPasswordConfirmation} onKeyDown={this.onKeyDown} type="password" placeholder="Password" />
                    </div>
                  </div>

                  <div className="actions-login">
                    <a onClick={this.signup} className="login-button">Submit</a>
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

const Signup = connect(mapStoreStateToProps, mapDispatchToProps)(SignupComponent);
export default Signup;