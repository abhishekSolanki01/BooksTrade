import React from 'react';
import TitleBar from './TitleBar';
import {Accounts} from 'meteor/accounts-base'
import {Tracker} from 'meteor/tracker';
import { Link } from 'react-router-dom'

export default class Profile extends React.Component{
    constructor(props){
        super(props);       
        this.state={
            name: null,
            city: "",
            state: "",
            email: ""
        }
    }
    componentDidMount(){
        this.tracker = Tracker.autorun(()=>{
            let name = null;
            let email = "";
            let city = "";
            let state = "";
            if(Accounts.user()){
                let user = Accounts.user({},{fields:{'emails':1,'profile':1}})
                name = user.profile.name
                city = user.profile.city
                state = user.profile.state  
                email = user.emails[0].address;    
            }     
            this.setState({name,city,state,email})
        })
    }
    componentWillUnmount(){
        this.tracker.stop()
    }

    render(){
        return (
            <div>
                <TitleBar />
                <div>
                    <h1>{this.state.name}'s Profile, city: {this.state.city}, state:  {this.state.state}, email: {this.state.email}</h1>
                </div>
                <button> <Link to="/users/edit">Edit profile</Link> </button>
            </div>
        )
    }
}