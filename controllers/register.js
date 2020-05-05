const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json('Invalid form submission');
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        db('users')
          .returning('*')
          .insert({
            name: name,
            email: email,
            password_digest: hash,
            joined: new Date()
          })
          .then(user => res.json(user[0]))
          .catch((err) => res.status(400).json('Unable to register!'));
    });
  });
}

module.exports = {
  handleRegister: handleRegister
};
