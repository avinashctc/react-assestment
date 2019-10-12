import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Posts from '../Blog/Posts/Posts';
import './Blog.css';
import NewPost from '../Blog/NewPost/NewPost';
import Auth from '../Auth/Auth';
import FullPost from '../Blog/FullPost/FullPost';


const blog = (props) => {

    return (
        <div className="Blogs">
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/" exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>Posts</NavLink></li>
                        <li><NavLink to="/new-post"
                        >Add New Post</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Switch>
                <Route path="/auth" exact component={Auth} />
                <Route path="/new-post" exact component={NewPost} />
                <Route path="/" exact component={Posts} />
                <Route path="/:id" exact component={FullPost} />
            </Switch>

        </div>
    );

}
export default blog;