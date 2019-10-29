import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { assert } from 'chai';
import { Eits } from './eits.js';

if (Meteor.isServer) {
    describe('Eits', () => {
        describe('methods', () => {
            const username = Random.id();
            let eitId, userId;

            let firstName = 'Freda!';
            let surname = 'Alien';
            let country = 'niger';
            let age = '32';


            before(function () {
                let user = Meteor.users.findOne({ username: username });
                if (!user) {
                    userId = Accounts.createUser({
                        'username': username,
                        'password': '12345678',
                    });
                } else {
                    userId = user._id;
                }
            });

            beforeEach(() => {
                Eits.remove({});
                eitId = Eits.insert({
                    text: 'test eit',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'fify',
                });
            });
            //remove
            it('can delete owned input', () => {
                const deleteEit = Meteor.server.method_handlers['eits.remove'];

                const invocation = { userId };

                deleteEit.apply(invocation, [eitId]);

                assert.equal(Eits.find().count(), 0);

            });
            it('cannot delete someone else Eit', function () {
                Eits.update(eitId, { $set: { private: true } });
                const userId = Random.id();
                const deleteEit = Meteor.server.method_handlers['eits.remove'];
                const invocation = { userId };
                assert.throws(function () {
                    deleteEit.apply(invocation, [eitId]);

                }, Meteor.Error, '[not-authorized]');

            });
            it('cannot delete Eit if not logged in', function () {
                const deleteEit = Meteor.server.method_handlers['eits.remove'];

                const invocation = {}
                assert.throws(function () {
                    deleteEit.apply(invocation, [eitId]);

                }, Meteor.Error, '[not-authorized]')
                assert.equal(Eits.find().count(), 1);
            })


            //insert  
            it('can insert Eit', function () {

                const insertEit = Meteor.server.method_handlers['eits.insert'];
                const invocation = { userId };
                insertEit.apply(invocation, [firstName, surname, country, age]);
                assert.equal(Eits.find().count(), 2);
            });

            it('cannot insert Eit If not Logged In', function () {

                const insertEit = Meteor.server.method_handlers['eits.insert'];

                const invocation = {}
                assert.throws(function () {
                    insertEit.apply(invocation, [firstName, surname, country, age]);

                }, Meteor.Error, '[not-authorized]')
                assert.equal(Eits.find().count(), 1);

            })
            //edit
            it('can edit Eit', function () {

                const updateEit = Meteor.server.method_handlers['eits.update'];
                const invocation = { userId };
                updateEit.apply(invocation, [eitId, firstName, surname, country, age]);
                assert.equal(Eits.find().count(), 1)
            });

            it('cannot Edit someone else Eit', function () {
                Eits.update(eitId, { $set: { private: true } });
                const userId = Random.id();
                const updateEit = Meteor.server.method_handlers['eits.update'];
                const invocation = { userId };
                assert.throws(function () {
                    updateEit.apply(invocation, [eitId, firstName, surname, country, age]);
                }, Meteor.Error, '[not-authorized]');;
                assert.equal(Eits.find().count(), 1)

            });

            it('cannot edit Eit If not Logged In', function () {

                const updateEit = Meteor.server.method_handlers['eits.update'];

                const invocation = {}
                assert.throws(function () {
                    updateEit.apply(invocation, [eitId, firstName, surname, country, age]);

                }, Meteor.Error, '[not-authorized]')
                assert.equal(Eits.find().count(), 1);

            });
            // set eit checked 

            it('can set own Eit checked', function () {
                const setChecked = Meteor.server.method_handlers['eits.setChecked'];
                const invocation = { userId };
                setChecked.apply(invocation, [eitId, true]);
                assert.equal(Eits.find({ checked: true }).count(), 1);
            });
            it('cannot set someone else Eit checked', function () {
                Eits.update(eitId, { $set: { private: true } });
                const userId = Random.id();
                const setChecked = Meteor.server.method_handlers['eits.setChecked'];
                const invocation = { userId };

                assert.throws(function () {
                    setChecked.apply(invocation, [eitId, true]);
                }, Meteor.Error, '[not-authorized]');

                assert.equal(Eits.find({ checked: true }).count(), 0);

            });
            //can view eit
            it('can view eit', function () {
                const allEITs = Eits.find({}).count();

                assert.equal(allEITs, 1);
            })

        });
    });
}