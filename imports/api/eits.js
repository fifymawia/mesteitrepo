import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
 
export const Eits = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(firstName,surname,country,age) {
      check(firstName, String);
      check(surname, String);
      check(country, String);
      check(age, String);
   
      // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
   
      Eits.insert({
        firstName,
        surname,
        country,
        age,
        createdAt: new Date(),
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,
      });
    },
    'eits.update'(id, firstName,surname,country,age) {
        check(firstName, String);
        check(surname, String);
        check(country, String);
        check(age, String);
     
        // Make sure the user is logged in before inserting a task
        if (! this.userId ) {
          throw new Meteor.Error('not-authorized');
        }

        const eit = Eits.findOne({ _id: id });

        if (this.userId !== eit.owner) {
            throw new Meteor.Error('not-authorized');
        }
     
        Eits.update(id, {
        $set: {
          firstName: firstName,
          surname: surname,
          country: country,
          age: age
        }
      });
    },
    'eits.remove'(eitId) {
      check(eitId, String);

      const eit = Eits.findOne({ _id: eitId });

      if (this.userId !== eit.owner) {
        throw new Meteor.Error('not-authorized');
      }
   
      Eits.remove(eitId);
    },
    'eits.remove_bulk'() {
        const eits = Eits.find({ checked: true });
        eits.forEach(eit => {
            if (Meteor.user().username !== eit.username) {
                throw new Meteor.Error('not-authorized');
              }

            Eits.remove(eit._id);
        });
    },
    'eits.setChecked'(eitId, setChecked) {
      check(eitId, String);
      check(setChecked, Boolean);

      const eit = Eits.findOne(eitId);
      //console.log(eit);

      if (this.userId !== eit.owner) {
        throw new Meteor.Error('not-authorized');
      }
   
      Eits.update(eitId, { $set: { checked: setChecked } });
    },
  });