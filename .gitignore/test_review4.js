// Association test

it('Saves a relation between a user and a blog post', done => {
    User.findOne({ name: 'Joe' })
    //Populate a prop name -> blogPosts
    .populate('blogPosts')
    .then(user => {
        assert(user.blogPosts[0].title === 'JS is greate');
        done();
    });
});

// To populate more than 1 layer, you must provide two prop: path, model
User.findOne({ name: 'Joe' })
.populate({
    path: 'blogPosts',
    populate: {
        path: 'comments',
        model: 'comment',
        populate: {
            path: 'user',
            model: 'user'
        }
    }
}).then(user => console.log(user));