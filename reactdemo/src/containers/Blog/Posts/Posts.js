import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Post from '../../../components/Post/Post';

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts();
        this.props.onRedirectToPost();
    }

    selectedPostHandler = (id) => {
        this.props.fetchPostOnSelection();
        this.props.history.push("/" + id);
    }

    render() {
        let posts = <p style={{ fontWeight: "bold" }}>Loading data ...</p >;
        if (!this.props.error) {
            posts = this.props.posts.map(post => {
                return (
                    <Post key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.selectedPostHandler(post.id)} />
                );
            });
        }
        return (
            <div>
                <section>
                    {posts}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postsReducer.posts,
        error: state.postsReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(actions.fetchPosts()),
        fetchPostOnSelection: () => dispatch(actions.fetchPostOnSelection()),
        onRedirectToPost: () => dispatch(actions.initialisePostSubmitted())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);