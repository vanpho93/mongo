// Test helper file
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');

mongoose.connection
.once('open', () => console.log('Ready'))
.on('error', err => console.log(err));

beforeEach((done) => {
    // NOTICE. collections is all in lowercase
    const { users, blogposts, comments } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
    // console.log(mongoose.connection.collections);
});

//-------A mocha test file----------
const assert = require('assert');

describe('Purpose of test file', () => {

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        jack = new User({ name: 'Jack' });
        alex = new User({ name: 'Alex' });
        //Use Promise.all([]) to wait for all promise be done.
        Promise.all([joe.save(), maria.save(), jack.save(), alex.save()])
        .then(() => done());
    });

    it('Test case', (done) => {
        assert(x) //return true or false
    });

    xit('It will not run', done => {

    });

    it.only('It is the only test that will run', done => {

    });
});

//------------
// Every mongo object have a _id prop
// it is not a primitive type, you must cast it to string before compare
assert(users[0]._id.toString() === joe._id.toString());

it('Can skip some record and limit', done => {
    User.find({  }).skip(1).limit(2).sort({ name: 1 })
    .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'Jack');
        assert(users[1].name === 'Joe');
        done();
    });
});