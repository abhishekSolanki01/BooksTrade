import React from "react";
import FlipMove from 'react-flip-move';

import {BooksInfo} from "../api/booksInfo"

import { Tracker } from 'meteor/tracker';
import { Meteor } from "meteor/meteor"


export default class BooksList extends React.Component{
  constructor(props){
      super(props);
      this.state={
        BooksInfoInState : BooksInfo.find().fetch()
      }
      this.renderBooks = this.renderBooks.bind(this)
      this.showCrossButton = this.showCrossButton.bind(this)
      //this.removeBookInfo = this.removeBookInfo.bind(this)
  }

  componentDidMount(){
    this.tracker = Tracker.autorun(() => {
      Meteor.subscribe('ziglerNata')
      this.setState({
        BooksInfoInState: BooksInfo.find().fetch()
      })
      console.log(this.state.BooksInfoInState)
      this.renderBooks();
    })  
  }
  componentWillUnmount(){
    this.tracker.stop();
  }

  showCrossButton(bookId){
    if(Meteor.userId()){   //will change the condition once learn about subscriptions
      return (
        <button onClick={() => BooksInfo.remove(bookId)}>X</button>
      )
    }
    return null;
  }

  renderBooks(){
    return (this.state.BooksInfoInState.map(book => {
          return (
            <div key={book._id} className="item">
              <h3>{book.title} </h3> <h5>{book.author}</h5>
              { book.userId === Meteor.userId() && this.showCrossButton(book._id)}
            </div>
          )
      }))
  }

  render(){
      return (
        <div>
          <FlipMove maintainContainerHeight={true}>
          {this.renderBooks()}  
          </FlipMove>
                
        </div>
      );
  }
}




// used tracker's function in above then it all starts to render all books 
// export default class BooksList extends React.Component{
//     constructor(props){
//         super(props);
//     }


//     render(){
//         const renderBooks = BooksInfo.find().fetch().map(book => {
//             return (
//               <div key={book._id} className="item">
//                 {book.title} || {book.author}
//               </div>
//             )
//         })
//         return (
//           <div>
//             {renderBooks}            
//           </div>
//         );
//     }
// }