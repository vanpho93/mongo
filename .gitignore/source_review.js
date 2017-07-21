const mongoose = require('mongoose');
// How to create a Schema
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    //How to reference to another collection
    user: { type: Schema.Types.ObjectId, ref: 'user' }
});

//Create class and exports
const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;

// Setup default Promise
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    // Very normal prop
    likes: Number,
    // Prop that must exist
    name: {
        type: String,
        // Require true, error name when name prop don't exist
        required: [true, 'Name is required'],
        // Validate with function
        validate: {
            validator: name => name.length > 2,
            // Error message if validator return false
            message: 'Name must be longer than 2 character'
        }
    },
    // a prop that is an array of another user-define type
    posts: [PostSchema],
    //Create a reference to an other collection
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// Create an virtual prop using get function
UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

// Using middleware function
// Before remove a user, you must remove all his blogPost
// Must be function instead of arrow function, because of this keyword inside
UserSchema.pre('remove', function (next) {
    const BlogPost = mongoose.model('blogPost');
    // $in is an mongo operator
    BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});
