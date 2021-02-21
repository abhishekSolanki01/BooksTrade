import { Meteor } from 'meteor/meteor';
import { Resumes } from '../imports/api/resumes';
import '../imports/api/users'
import { Accounts} from "meteor/accounts-base";

Meteor.startup(() => {

    console.log(Accounts.users.find({}).fetch());
});
