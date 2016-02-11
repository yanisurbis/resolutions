Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  // subscribing to database
  Meteor.subscribe('resolutions');

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

      if (title.length != 0) {
        Meteor.call("addResolution", title);
      } else {
        alert("The Submit field is empty!");
      }
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

  // no emails
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish('resolutions', function() {
    return Resolutions.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}

// methods on our database that our application has acess to
Meteor.methods({
  addResolution: function(title) {
    Resolutions.insert({
      title: title,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  updateResolution: function(id, checked) {
    var res = Resolutions.findOne(id);

    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Resolutions.update(id, {$set :{
      checked: checked
    }});
  },
  deleteResolution: function(id) {
    var res = Resolutions.findOne(id);

    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Resolutions.remove(id);
  },
  setPrivate: function(id, private) {
    var res = Resolutions.findOne(id);

    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Resolutions.update(id, {$set :{
      private: private
    }});
  }
})
