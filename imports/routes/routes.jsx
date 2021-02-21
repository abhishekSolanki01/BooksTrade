import React from "react";
import { Meteor } from "meteor/meteor";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import AdminPanel from "../ui/AdminPanel";

import App from '../ui/App'
import Signup from '../ui/Signup';
import Login from '../ui/Login';

export const routes = (

    <Router>
        <Switch>
           

            <Route path="/login" render={()=>(
                Meteor.userId() ? (<Redirect to="/" />) : ( <Login/> )
            )} 
            
            />
            
            <Route path="/signup" render={()=>(
                Meteor.userId() ? (<Redirect to="/" />) : ( <Signup/> )
            )} 
            
            />
            <Route exact path="/admin" render={() => (
                Meteor.userId() !== "TwENiA3zdPsChXhfj" ? (
                    <Redirect to="/" />
                ) : (
                        <AdminPanel />
                    )
            )} />
            <Route path="/" component={App} />

        </Switch>
    </Router>

)