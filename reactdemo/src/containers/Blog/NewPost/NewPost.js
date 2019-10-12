import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';
import './NewPost.css';
import InLineError from '../../../components/InLineError/InLineError';
import * as actions from '../../../store/actions/index';


class NewPost extends Component {
    state = {
        data: {
            title: '',
            content: ''
        },
        errors: {},
    }

    onSubmitPost = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors })
        if (Object.keys(errors).length === 0) {
            this.props.onSavePost({
                title: this.state.data.title,
                body: this.state.data.content
            });
        }
    }

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.title.trim())) {
            errors.title = 'Title can\'t be blank. Please input a title.';
        }
        if (Validator.isEmpty(data.content.trim())) {
            errors.content = 'Content can\'t be blank. Please enter content.';
        }
        return errors;
    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    })


    componentDidMount() {
        if (!this.props.isAuthenicated) {
            this.props.history.push('/auth');
        }
    }

    render() {
        const { data, errors } = this.state;

        let redirect = null;

        if (this.props.isPostSubmitted) {
            redirect = <Redirect to="/" />;
        }

        return (
            <div className="NewPost">
                {redirect}
                <form onSubmit={this.onSubmitPost}>
                    <h1>Add New Post</h1>
                    <div>
                        <label>Title</label>
                        <input type="text"
                            name="title"
                            placeholder="Enter title"
                            value={data.title}
                            onChange={this.onChange}
                        />
                        {errors.title && <InLineError text={errors.title} />}
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea rows="4"
                            name="content"
                            placeholder="Enter content"
                            value={data.content}
                            onChange={this.onChange} />
                        {errors.content && <InLineError text={errors.content} />}
                    </div>
                    <button>Add Post</button>
                    {this.props.errors && <p style={{ color: "Red" }}>Unable to save request. Please try again later...</p>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenicated: state.authReducer.token != null,
        isPostSubmitted: state.postsReducer.newPostSubmitted,
        error: state.postsReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSavePost: (inputPostParam) => dispatch(actions.saveNewPost(inputPostParam))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewPost);