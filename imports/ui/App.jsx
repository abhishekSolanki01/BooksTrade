import React from 'react';
import { Meteor } from "meteor/meteor";
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom';

const adminId = ["TwENiA3zdPsChXhfj"]

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      isLoggedIn : false
    }
    this.renderIfAdmin = this.renderIfAdmin.bind(this);
    this.renderMaterial = this.renderMaterial.bind(this)
  }
  componentDidMount() {
    Tracker.autorun(() => {
      this.setState({isLoggedIn : !!Meteor.userId() })
      this.renderIfAdmin();
      this.renderMaterial();
    })
  }

  renderIfAdmin() {
    if (Meteor.userId() === "TwENiA3zdPsChXhfj") {
      return (
        <div className="to-admin-section-lnk">
          <Link to="/admin"><span>Admin Section</span></Link>
        </div>
      )
    } else {
      console.log("not Admin");
    }
  }
  renderMaterial(){
    if(this.state.isLoggedIn){
      return(
        <div className="action">
            <span className="action-btn"><button className="button" onClick={()=>Meteor.logout()}>Logout</button></span>
            
          </div>
      )
    }else{
      return(
        <div className="action">
            <Link className="action-btn" to="/login"><button className="button">Login</button></Link>
            <Link className="action-btn" to="/signup"><button className="button">Signup</button></Link>
          </div>
      )
    }
    
  }

  render() {

    return (
      <div>
        <div className="hero-container">
          <div className="hero-txt">
            <h1>Job Portal</h1>
          </div>
          
          {this.renderIfAdmin()}
          {this.renderMaterial()}

        </div>
      </div>
    );
  }
}