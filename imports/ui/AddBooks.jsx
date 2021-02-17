import React from "react";
import { Meteor } from 'meteor/meteor'

// var title = "";
// var author = "";
export default class AddBooks extends React.Component{
    constructor(props){
        super(props);

    }
 
    onSubmit(e){
        e.preventDefault();
        let title = e.target.title.value; //this.refs.title.value.trim();
        let author = this.refs.author.value.trim();
        let description= this.refs.description.value.trim();
        let imageUrl= this.refs.imageUrl.value;
        
        if(title && author && Meteor.userId()){
            this.props.addBooks(title, author, description, imageUrl);
        }
        
        this.refs.title.value = "";
        this.refs.author.value= "";
        this.refs.description.value="";
        this.refs.imageUrl.value="";
    }
    render(){
        return(
            <div className="item">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input ref="title" name="title"  placeholder="Title of the book"/>
                    <input ref="author" name="author"  placeholder="Name of the Author"/>
                    <input ref="description" name="description"  placeholder="Any discription"/>
                    <input ref="imageUrl" name="imageUrl" placeholder="Upload pic"/>
                    <button className="button" type='submit'>Add book to exchange!</button>
                </form>

            </div>
        );
    }
}