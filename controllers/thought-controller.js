const { Thought, User } = require('../models');

const thoughtController = {
addThought(req, res) {
    console.log(body);
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { _id: req.body.userID },
          { $push: { thoughts: data._id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
// getAllThought,
// getThoughtById,
// updateThought,
// deleteThought,
// addReaction,
// removeReaction
}

module.exports= thoughtController;
