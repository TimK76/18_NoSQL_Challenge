const router = require('express').Router();
const {
    addThought,
    getAllThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
// create a new thought (don't forget to push the created thought's -id to the associated user's thoughts array field)
.post(addThought)
.get(getAllThought);


router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
// create a reaction stored in a single thought's reactions array field
.post(addReaction)
// to pull and remove a reaction by the reactions reactionId value
.delete(removeReaction);
 
module.exports=router;