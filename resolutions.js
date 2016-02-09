Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  // template helper allows you to use information on the page
  Template.body.helpers({
    resolutions: function() {
      return Resolutions.find();
    }
  });

  Template.body.events({
    'submit .new-resolution': function(event) {
      var title = event.target.title.value;

      console.log("hi");
      Resolutions.insert({
        title: title,
        createdAt: new Date()
      });

      event.target.title.value = "";

      // we don't want page refreshing
      return false;
    }
  });

  Template.resolution.events({
    'click .delete': function() {
      Resolutions.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  })
}
