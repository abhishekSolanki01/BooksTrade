import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


//validate the user just before its created, 4 that i used
//a meteor hook(a method we can call) i give it a cllback
//and it automatically calls this callback every time new user is made
//available in Accounts...passing (user) as param
Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    try{
        new SimpleSchema({
            email : {
                type : String,
                regEx : SimpleSchema.RegEx.Email
            }
        }).validate({email})

    }catch(e){
        throw new Meteor.Error(400, e.message);
    }

    return true;
})