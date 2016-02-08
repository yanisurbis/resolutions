if (Meteor.isClient) {
  // template helper allows you to use information on the page
  Template.body.helpers({
    resolutions: [
      { title: 'Hello Resolution #1' },
      { title: 'Hello Resolution #2' },
      { title: 'Hello Resolution #3' }
    ]
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  })
}
