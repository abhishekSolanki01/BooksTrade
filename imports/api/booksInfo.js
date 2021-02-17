import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
 
export const BooksInfo = new Mongo.Collection('booksInfo');

if(Meteor.isServer ){
    Meteor.publish('ziglerNata', ()=>{
        this.userId
        return BooksInfo.find()
    })

    Meteor.publish('AllUsers', () => {
        return Meteor.users.find({}, {fields:{emails:1}})
    })
}

