import React from "react"
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom'

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error: "",
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e){
        if(e.target.name === 'email'){
            const email = e.target.value.trim();
            this.setState({email});
        }else{
            const password = e.target.value.trim();
            this.setState({password});
        }
    }

    onSubmit(e){
        e.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.password, (error)=>{
            if(error){
                this.setState({error : "Something is terribly wrong"})
            }
        })
    }

    render(){
        console.log(Meteor.userId())
        return (
            <div className="login-wrapper">
                <div className="Description-txt">
                    <h1>Login page</h1>
                </div>
                <div className="wrapper form-wrapper">
                {this.state.error && <div>{this.state.error}</div>}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" 
                        className="form-input"
                        value={this.state.email} 
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}/>
                    <input type="password"     
                        className="form-input"                        
                        value={this.state.password} 
                        placeholder="Password" 
                        onChange={this.handleChange}/>
                    <button type="submit" className="button" >Login</button> 
                    <Link to="/signup" className="button">Signup</Link>  
                </form>
                </div>
                                   
            </div>
        );
    }
}