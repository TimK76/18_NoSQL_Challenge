const { Thought, User } = require('../models');

const thoughtController = {
addThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
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
getAllThought(req, res) {
  Thought.find({})
  // .populate({
  //   path: 'User',
  //   select: '-__v'
  // })
  .select('-__v')
  .sort({ _id: -1 })
  .then(dbThoughtData => res.json(dbThoughtData))
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
},
getThoughtById({ params }, res) {
  Thought.findOne({ _id: req.params.id })
    // .populate({
    //   path: 'comments',
    //   select: '-__v'
    // })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
},
// updateThought,
// deleteThought,
// addReaction,
// removeReaction
}

module.exports= thoughtController;
