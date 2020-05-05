const handleGetUser = (req, res, db) => {
  const { id } = req.params;

  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      }
      else {
        res.status(404).json('User not found!');
      }
    })
    .catch(() => res.status(400).json('Error fiding the user'));
}

const handleUserEntries = (req, res, db) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0])
      } else {
        res.status(400).json('Error updating entries');
      }
    })
    .catch(() => res.status(400).json('Unable to get entries'));
}

module.exports = {
  handleGetUser: handleGetUser,
  handleUserEntries: handleUserEntries
};
