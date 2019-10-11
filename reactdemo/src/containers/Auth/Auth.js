import React, { Component } from 'react';
import './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class Auth extends Component {

    state = {
        userId: '',
        password: '',
        isLoggedIn: true
    }


    loginHandler = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isLoggedIn);
    }

    render() {
        return (
            <div className="Auth">
                {/* {redirect} */}
                <form onSubmit={this.loginHandler}>
                    <h1>Login</h1>
                    <label>User ID</label>
                    <input type="text" value={this.state.userId} onChange={(event) => this.setState({ userId: event.target.value })} />
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        // isAuthenticated: state.auth.token != null,
        // buildingBurger: state.burgerReducer.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password, isSignup) => dispatch(actions.authenticate(email, password, isSignup)),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);