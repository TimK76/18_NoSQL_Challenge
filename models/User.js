const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }, 
        email: {
            type: String,
            unique: true,
            required: true, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of thoughts and reactions on retrieveal
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total, comment) => total + commment.replies.length +1, 0);
});

const User = model('User', UserSchema);

module.exports = User;