const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hash = (password) => { 
   return bcrypt.hashSync(password, salt);
} 

const compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}


module.exports = {
    hash,
    compare
}