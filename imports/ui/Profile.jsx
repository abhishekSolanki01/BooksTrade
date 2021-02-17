import React from 'react';
import TitleBar from './TitleBar';
import {Accounts} from 'meteor/accounts-base'
import {Tracker} from 'meteor/tracker';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: null
        }
    }
    componentDidMount(){
        this.tracker = Tracker.autorun(()=>{
            let name = Accounts.user() ? Accounts.user().profile.name : null; 
            this.setState({name})
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
                    <h1>{this.state.name}'s Profile</h1>
                </div>
            </div>
        )
    }
}