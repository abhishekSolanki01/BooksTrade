import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import App from '../ui/App'
import Signup from '../ui/Signup';
import Login from '../ui/Login';
import Users from '../ui/Users';
import Profile from '../ui/Profile';

export const routes = (
    
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/books" component={App}/>
                <Route path="/users/profile" component={Profile}/>
                <Route path="/users" component={Users}></Route>
                
                {/* <Route path="/books/my"></Route>
                <Route path="/req"></Route>
                <Route path="/req/new"></Route>
                <Route path="/trades"></Route>
                <Route path="/users"></Route>
                <Route path="/users/edit"></Route>
                <Route path="/users/*"></Route> */}
            </Switch>
        </Router>
            
)