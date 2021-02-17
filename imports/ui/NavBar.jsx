import React from 'react';
import { Link } from 'react-router-dom'


export default class NavBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="navbar navbar-items">
                <ul>
                    <li><Link to="/books">Books</Link></li>
                    <li className="request"> <span>Request</span>
                        <div className="request-dropdown">
                            <span><Link to="#">All Requests</Link></span><hr/>
                            <span><Link to="#">Create Request</Link></span>
                        </div></li>
                    <li>Trades</li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
            </div>

        )
    }
}