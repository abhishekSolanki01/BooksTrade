import React from 'react';
import { Accounts} from "meteor/accounts-base";
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker' 

export default class UserName extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: null,
            userId: Accounts.userId()
        }
        this.renderNameAndProfile = this.renderNameAndProfile.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
    }

    // Using componentDidMount And Unmount and tracker in order 
    //to update the login status on other tabs if app is open in more than one tab.
    //without any need of hard refresh to show the changed login status.
    //so app will automatically login user in every tab  

    componentDidMount(){
        this.tracker = Tracker.autorun(()=> {
            let name = Accounts.user() ? Accounts.user().profile.name : null;           
            this.setState({name});
        })
    };
    componentWillUnmount(){
        this.tracker.stop();
    }

    onLogout(){
        Accounts.logout();
        Meteor.subscribe('AllUsers')
        this.setState({name: null})
    }

    renderNameAndProfile(){
            return (
                <div className="user-name-to-center">
                    <div className="request"> <span>{this.state.name || Accounts.userId()}</span>
                            <div className="request-dropdown">
                                <button onClick={this.onLogout.bind(this)}>Logout</button><hr/>
                                <span><Link to ="/users/profile">Profile</Link></span>
                            </div>
                    </div>                   
                </div>
            );
    }

    renderLogin(){
        return(
            <Link to="/login">Login</Link>
        );
    }

    render (){
        return(
            <div className="user-name">
            { this.state.name ? this.renderNameAndProfile() : this.renderLogin()}    
            </div>
        );
    }
}