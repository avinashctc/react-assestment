import React, { Component } from 'react';
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from '../Blog/Posts/Posts';
import Auth from '../Auth/Auth';
import './Blog.css';


// import NewPost from '../Blog/NewPost/NewPost';

const NewPost = React.lazy(() => {
    return import('./NewPost/NewPost')
});


class Blog extends Component {

    state = {
        auth: false
    }
    render() {
        let routeNewPost = <Route path="/auth" component={Auth} />;

        if (this.state.auth) {
            routeNewPost = <Route path="/new-post" component={NewPost} />
        }
        return (
            <div className="Blogs">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to="/new-post"
                            >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {routeNewPost}
                    <Route path="/" component={Posts} />
                </Switch>

            </div>
        );
    }
}

export default Blog;