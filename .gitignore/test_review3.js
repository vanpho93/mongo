it('Remove a user to remove his posts', done => {
    //Middleware function is only have effect thi instance delete method
    joe.remove()
    .then(() => BlogPost.count())
    .then(count => {
        assert(count === 0);
        done();
    })
});

//Create sub doc with ref
beforeEach(done => {
    joe = new User({ name: 'Joe', blogPosts: [] });
    blogPost = new BlogPost({
        title: 'JS is greate',
        content: 'Typescript is much better',
    });
    // Using push to add subdoc
    joe.blogPosts.push(blogPost);

    // Remember call save all instance, using Promise.all to wait
    Promise.all([joe.save(), blogPost.save()])
    .then(() => done());
});

// Ways to delete an record
/*
    Instance remove method
    Class remove User.remove({ condition }) -> remove intances
    Class remove one User.findOneAndRemove
    Class findByIdAndRemove
*/

