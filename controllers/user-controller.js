const { User } = require('../models');

const userController = {
createUser({ body }, res) {
  console.log('createUser')
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},
getAllUser(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
},
getUserById(req, res) {
    User.findOne({ _id: req.params.id })
     .select('-__v')
     .populate(
      'thoughts'
    )
    .populate(
      'friends'
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
},
updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},
addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: {friends: params.friendId}},
      {new: true, runValidators: true}
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!"});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: {friends: params.friendId}},
      { new: true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
};

module.exports=userController;