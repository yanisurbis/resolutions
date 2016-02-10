Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  // template helper allows you to use information on the page
  // we can't use anything in our templates without defined helpers
  Template.body.helpers({
    resolutions: function() {
      if (Session.get('hideFinished')) {
        return Resolutions.find({checked: {
          $ne: true
        }});
      } else {
        return Resolutions.find();
      }
    },
    hideFinished: function() {
      return Session.get('hideFinished');
    }
  });

  Template.body.events({
    'submit .new-resolution': function(event) {
      var title = event.target.title.value;

      Meteor.call("addResolution", title);

      event.target.title.value = "";

      // we don't want page refreshing
      return false;
    },
    'change .hide-finished': function(event) {
      // only for current session
      // bind session variable and state of checkbox
      Session.set('hideFinished', event.target.checked)
    }
  });

  Template.resolution.events({
    'click .toggle-checked': function() {
      Resolutions.update(this._id, {$set :{
        checked: !this.checked
      }});
    },
    'click .delete': function(event) {
      Resolutions.remove(this._id);
    }
  });

  // no emails
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  })
}

// methods on our database that our application has acess to
Meteor.methods({
  addResolution: function(title) {
    Resolutions.insert({
      title: title,
      createdAt: new Date()
    });
  }
})
