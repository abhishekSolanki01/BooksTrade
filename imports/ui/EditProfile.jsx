import React from 'react';
import { Tracker } from 'meteor/tracker'
import { Accounts } from 'meteor/accounts-base'

export default class EditProfie extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: "",
            city: "",
            state: "",
            address:"",
            email: ""
        }
        this.onSubmit= this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.tracker = Tracker.autorun(()=>{

        })
    }
    componentWillUnmount(){
        this.tracket.stop();
    }

    onSubmit(e){
        e.preventDefault();
        if(Accounts.user())     
            this.updateUser();
    }

    updateUser(){
        let city = this.state.city;
        let state = this.state.state;
        let address = this.state.address;
        //Accounts.user.findOne({_id:Accounts.userId()}).
    }
    
    handleChange(e){
        if(e.target.name === "city"){
            let city = e.target.value.trim()
            this.setState({city})
        }else if(e.target.name === "state"){
            let state = e.target.value.trim()
            this.setState({state})
        }else if(e.target.name === "address"){
            let address = e.target.value.trim()
            this.setState({address})
        }
    }




    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text"  
                        required={true}   
                        className="button"   
                        name="name"                     
                        value={this.state.name} 
                        placeholder="Name" 
                        readOnly
                        />
                    <input type="email" 
                        className="button"
                        // value={this.state.email} 
                        name="email"
                        readOnly
                        placeholder="Email"
                        />
                    <input type="text"     
                        className="button"    
                        name="city"                    
                        //value={this.state.city} 
                        placeholder="City Name" 
                        onChange={this.handleChange}
                        />
                    <input type="text"     
                        className="button"    
                        name="state"                    
                        // value={this.state.city} 
                        placeholder="State" 
                        onChange={this.handleChange}
                        />
                    <input type="text"     
                        className="button"    
                        name="addess"                    
                        // value={this.state.city} 
                        placeholder="Mailing Address" 
                        onChange={this.handleChange}
                        />
                    <button type="submit" className="button" >Save Changes</button>    
                    </form>                   
            </div>
        );
    }
} 