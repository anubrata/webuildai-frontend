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
            passwordConfirmed: false,
        }
    }

    /* These functions set the state when the items in the form change. */
    setPassword = (event) => {
        this.setState({password: event.target.value})
        if (this.state.password != this.state.passwordConfirmation) {
            this.state.passwordConfirmed = false;
        } else {
            this.state.passwordConfirmed = true;
        }
    }

    setEmail = (event) => {
        this.setState({email: event.target.value})
    }

    setPasswordConfirmation = (event) => {
        this.setState({passwordConfirmation: event.target.value})
        if (this.state.password != this.state.passwordConfirmation) {
            this.state.passwordConfirmed = false;
        } else {
            this.state.passwordConfirmed = true;
        }
    }

    setFirstName = (event) => {
        this.setState({firstName: event.target.value})
    }

    setLastName = (event) => {
        this.setState({lastName: event.target.value})
    }

    /* Make the API request with the information in the state. */
    signup = () => {
        // Probably not needed but just in case:
        if (!this.state.passwordConfirmed) {
            alert("Password is not the same.")
            return;
        }
        const request = { 
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password
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

                this.props.history.push('/')
            }
        })
    }

    /* If the key pressed is enter, complete the form. */
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
          this.signup();
        }
    }




}