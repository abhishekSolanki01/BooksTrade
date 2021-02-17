import { Meteor } from 'meteor/meteor';
import { BooksInfo } from '/imports/api/booksInfo';



Meteor.startup(() => {
  // BooksInfo.insert({
  //   title: "sample_title",
  //   author: "sample_Author",
  //   description: "sample_desc",
  //   imageUrl: "url"
  // });
  
   console.log( BooksInfo.find().fetch() ) ;
});
