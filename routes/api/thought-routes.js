const router = require('express').Router();
const {
    addThought,
    getAllThought,
    getThoughtById,
    updateThought,
    removeThought,
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
.delete(removeThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
// create a reaction stored in a single thought's reactions array field
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);
 
module.exports=router;