import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './FullPost.css';
import * as actions from '../../../store/actions/index'


class FullPost extends Component {

    componentDidMount() {
        this.loadPostHandler();
    }

    componentDidUpdate() {
        this.loadPostHandler();
    }

    loadPostHandler() {
        if (this.props.match.params.id && this.props.isPostSelected) {
            if (!this.props.loadedpost || (this.props.loadedpost && this.props.loadedpost.id !== +this.props.match.params.id)) {
                this.props.loadSelectedPost(this.props.match.params.id);
            }
        }
    }

    goToPostsHandler = () => {
        this.props.history.push('/');
    }

    render() {
        let post = <p style={{ textAlign: "center" }}>It seems you refreshed or typed in browser address bar. <Link to="/">Go back</Link></p>;
        if (this.props.match.params.id && this.props.isPostSelected) {
            post = <p style={{ textAlign: "center" }}>Loading requested post...</p>
        }
        if (this.props.loadedpost) {
            post = (
                <div className="FullPost">
                    <h1>{this.props.loadedpost.title}</h1>
                    <p>{this.props.loadedpost.body}</p>

                    <button onClick={this.goToPostsHandler}>Return</button>
                </div>
            );
        }
        return post;
    }
}

const mapStateToProps = state => {
    return {
        isPostSelected: state.postsReducer.isPostSelected,
        loadedpost: state.postsReducer.post
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSelectedPost: (postId) => dispatch(actions.fetchSelectedPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);