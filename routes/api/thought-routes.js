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
// get all thoughts
.get(getAllThought);

router.route('/:userId/:thoughId')
// get a single thought by its _id
.get(getThoughtById)
// // update a thought by its _id
// .put(updateThought)
// // remove a thought by its id
// .delete(deleteThought);

// // api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId')
// // create a reaction stored in a signle thought's reactions array field
// .post(addReaction)
// // to pull and remove a reaction by the reactions reactionId value
// .delete(removeReaction);

module.exports=router;