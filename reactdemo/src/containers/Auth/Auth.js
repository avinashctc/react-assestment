import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';

import './Auth.css';
import * as actions from '../../store/actions/index';
import InLineError from '../../components/InLineError/InLineError';

class Auth extends Component {

    state = {
        data: {
            email: '',
            password: '',
        },
        errors: {}
    }


    onSubmit = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.props.onAuthenticate(this.state.data.email, this.state.data.password);
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) {
            errors.email = 'Invalid email. Please enter a valid email ID';
        }
        if (Validator.isEmpty(data.password)) {
            errors.password = 'Password can\'t be blank. Please enter a password.';
        }
        return errors;
    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    })

    render() {
        const { data, errors } = this.state;

        let redirectTo = null;

        if (this.props.isAuthenticated) {
            redirectTo = <Redirect to="/new-post" />
        }       

        return (
            <div className="Auth">
                {redirectTo}
                <form onSubmit={this.onSubmit}>
                    <h1>Please login to add a post</h1>
                    <div>
                        <label>Email</label>
                        <input type="email"
                            name="email"
                            placeholder="example@example.com"
                            value={data.email}
                            onChange={this.onChange}
                        />
                        {errors.email && <InLineError text={errors.email} />}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={this.onChange} />
                        {errors.password && <InLineError text={errors.password} />}
                    </div>
                    <button>Log in</button>
                    {this.props.errors && <p style={{ color: "Red" }}>Invalid login credentials !!</p>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token != null,
        errors: state.authReducer.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, password) => dispatch(actions.authenticate(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);