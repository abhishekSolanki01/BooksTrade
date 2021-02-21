import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Resumes = new FilesCollection({
  collectionName: 'Resumes',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg|pdf/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
  //console.log("link",Resumes.find().link())
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Resumes.find().cursor;
  });
}

export default Resumes;