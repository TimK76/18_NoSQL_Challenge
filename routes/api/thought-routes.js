const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/userId')
.get(getAllThought)
.get(getThoughtById)
.post(addThought)
.put(updateThought)
.delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId')
.post(addReaction)
.delete(removeThought);
