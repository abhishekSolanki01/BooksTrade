import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';


export default class AdminPanel extends Component {
    constructor(props) {
        super(props)
        this.renderAllUser = this.renderAllUser.bind(this);
        this.printSkills = this.printSkills.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.showCrossButton = this.showCrossButton.bind(this);
        this.state={
            users: []
        }
    }

    componentDidMount(){
        this.tracker = Tracker.autorun(()=>{
            Meteor.subscribe("AllUsers");
            if(Meteor.users){
                let users = Meteor.users.find({_id : { $nin : ["TwENiA3zdPsChXhfj"]}}).fetch()
                //let users = Meteor.users.find().fetch()
                this.setState({users})
            }
            this.renderAllUser()
        })
    }
    printSkills(user){
        return (
            user.profile.skills.map((skill,key)=>{
                return <li key={key}> {skill}</li>
            })
        )
    }
    

    removeUser(userId){
        Meteor.call('user.remove', userId);
      }
    
    showCrossButton(userId){
          return (
            <div key={userId} className="book-info-content-cross">
              <button className="button" onClick={() => this.removeUser(userId)}>Delete Profile</button>
            </div>
            
          )
    }


    renderAllUser(){
        return (
            this.state.users.map((user,key)=>{
                console.log(user.profile);
                return (
                <div key={key} className="info">
                <div  className="info-content">
                <div className="info-content-t-a">
                  <div>
                      <span className="name">{user.profile.name} </span><hr/>
                      <span className="list"><p>Skills:</p><ul>{ user.profile.skills && this.printSkills(user)}</ul></span>
                      <span><a target="_blank" href={user.profile.resume}>See Resume</a></span>
                      {this.showCrossButton(user._id)}
                  </div>
                </div>            
              </div>
            </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="Description-txt">
                    <h1>Admin Page</h1>
                </div>
                <div className="wrapper form-wrapper">
                    {this.renderAllUser()}
                </div>           
            </div>
        );
    }
}
