import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost.js';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: "Avinash"
                    }
                })
                this.setState({
                    posts: updatedPosts
                });
            })
            .catch(error => {
                // this.setState({
                //     error: true
                // })
            });
    }

    selectedPostHandler = (id) => {
        this.props.history.push("/" + id);
    }

    render() {
        let posts = <p style={{ fontWeight: "bold" }}>
            No posts are there !!! Click on 'New Post' to add one.
        </p >;
        if (this.state.posts.length !== 0) {
            posts = this.state.posts.map(post => {
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
                <Route path="/:id" exact component={FullPost} />
            </div>
        );
    }
}


export default Posts;