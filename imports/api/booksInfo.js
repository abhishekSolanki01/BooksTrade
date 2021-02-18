import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
 
export const BooksInfo = new Mongo.Collection('booksInfo');

if(Meteor.isServer ){
    Meteor.publish('ziglerNata', ()=>{
        this.userId // ==> thats how i call userId here as Meteor.userId id not working here
        return BooksInfo.find()
    })

    Meteor.publish('AllUsers', () => {
        return Meteor.users.find({}, {fields:{emails:1}})
    })
}

Meteor.methods({
    "booksInfo.insert" : function (title,author,discription,imageUrl) {
        if(!this.userId){
            throw new Meteor.Error('not-authorized', 'User is not authorized to insert books info')
        }
        const bookId = BooksInfo.insert({
            userId : this.userId, 
            title: title, 
            author: author, 
            discription: discription, 
            imageUrl: imageUrl
        })
    }
});

