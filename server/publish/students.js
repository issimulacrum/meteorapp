Meteor.publish('students', function(userId) {
  let haveAccess = false;

  if(Roles.userIsInRole(userId, 'superadmin')) {
    haveAccess = true;
  } else if(Roles.userIsInRole(userId, ['superadmin', 'moderator', 'instructor'], ['studentsControl'])) {
    haveAccess = true;
  }

  if (haveAccess) {
    let selector = {
      roles: ['student']
    };
    return Meteor.users.find(selector);
  } else {
    this.ready();
  }
});