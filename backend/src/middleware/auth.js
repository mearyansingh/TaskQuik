const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req, res, next) => {
   try {
      //Get token from header
      const token = req.header('Authorization').replace('Bearer ', '')

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // "tokens.token": token:: This part of the query is checking for a sub-document within the user document with a field named "tokens" that contains an array of tokens.
      // It's checking if any of the tokens in this array match the token extracted from the request header.
      // The line essentially tries to find a user in the database whose _id matches the decoded._id(user ID from the token) and whose "tokens" array contains the provided token.
      // If such a user is found, it's stored in the user variable for further processing.
      const user = await User.findOne({ _id: decoded._id, "tokens.token": token })

      if (!user) {
         throw new Error('User not found')
      }
      req.token = token
      req.user = user
      next()
   } catch (error) {
      res.status(401).send({ error: "Please authenticate." })//unAuthorized
   }
}

module.exports = auth;