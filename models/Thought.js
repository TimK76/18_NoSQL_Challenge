const { Schema, model, Types } = require('mongoose');
const { Thought } = require('.');


const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with Thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            Required: true
        },
        createdAt: {
            Type: Date,
            default: Date.now,
            // get: createdAtVal => 
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        }, 
        createdAt: {
            Type: Date,
            default: Date.now,
            // get: createdAtVal => 
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length.reduce(
        (total, reaction) => total + reaction.length +1, 0

    );
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;