describe('Creating records', () => {
    it('save an user', (done) => {
        const pho = new User({ name: 'Pho Nguyen' });
        pho.save()
            .then(() => {
                // isNew is an special prop
                assert(!pho.isNew);
                done();
            });
    })
});

//There is 5 ways you can update records
/*
    set and save
    instance update method
    class findOneAndUpdate
    class findIdAndUpdate

*/

//Using $inc operator
it('Can increment the post count', done => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 } })
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
        assert(user.postCount === 1);
        done();
    });
});

//Validation test

describe('Validation records', () => {
    it('Requires a user name', done => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        assert(validationResult.errors.name.message === 'Name is required');
        done();
    });

    it('Requires a user name', done => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        assert(validationResult.errors.name.message === 'Name must be longer than 2 character');
        done();
    });
});

x.then(user => {
    const post = user.posts[0];
    //Use remove instead splice to delete a subdocument
    post.remove();
    return user.save();
})
