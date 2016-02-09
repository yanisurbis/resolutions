Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  // template helper allows you to use information on the page
  Template.body.helpers({
    resolutions: function() {
      return Resolutions.find();
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  })
}
