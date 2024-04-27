//User router file
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require("../middleware/auth")

const router = new express.Router()

//REGISTRATION=>users post request(new version)
router.post('/', async (req, res) => {

	try {
		const user = new User(req.body)
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		res.status(400).send(error);
	}
})

//LOGIN=> POST route for user login
// router.post('/users/login', async (req, res) => {
router.post('/login', async (req, res) => {

	const { email, password } = req.body;

	try {
		// Use the findByCredentials function to find and authenticate the user
		const user = await User.findByCredentials(email, password);

		// User is authenticated, you can generate a token or set a session here
		// For example, in a real-world application, you might use JWT for authentication
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (error) {
		res.status(401).send();
	}
});

// LOGOUT => POST route for user logout
// It removes the current token from the user's tokens array and saves the user.
// router.post('/users/logout', auth, async (req, res) => {
router.post('/logout', auth, async (req, res) => {

	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token
		})
		await req.user.save()
		res.send({ message: 'Logged out successfully' })
	} catch (error) {
		res.status(500).send({ error: 'Server error' })
	}
})

// POST route for user logoutAll
// logging out from all devices
// It clears all tokens from the user's tokens array.
// router.post('/users/logoutAll', auth, async (req, res) => {
router.post('/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send()
	}
})

//Get current user (fetch the user's profile)
// A GET route at /users/me endpoint is defined to fetch the user's profile.
// It utilizes the auth middleware to authenticate the user before sending back the user data.
// router.get('/users/me', auth, async (req, res) => {
router.get('/me', auth, async (req, res) => {
	// console.log("ll")
	res.send(req.user)

})

//Getting single users(Debug)
// router.get("/users/:id", async (req, res) => {
//    const _id = req.params.id

//    try {
//       const user = await User.findById(_id)
//       console.log("user");
//       if (!user) {
//          // console.log("shdhash")
//          return res.status(404).send()
//       }
//       res.send(user)
//    } catch (error) {
//       res.status(500).send()
//    }
// })

//Debug->404
// A PATCH route at ('/users/me') endpoint is defined for updating the user's profile.
// It validates and applies updates provided in the request body to the user object.
// The updated user object is saved and sent back.
router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" })
	}

	try {
		updates.forEach((update) => req.user[update] = req.body[update])
		await req.user.save()
		res.send(req.user)
	} catch (error) {
		res.status(400).send(error)
	}
})

//DELETE USER
//Debud-404
// A DELETE route at (/users/me) endpoint is defined for deleting the user's account.
// It deletes the user from the database.
// router.delete('/users/me', auth, async (req, res) => {
router.delete('/me', auth, async (req, res) => {
	try {
		await User.deleteOne(req.user._id)
		res.send(req.user)
	} catch (error) {
		res.status(400).send()
	}
})

//Image upload
// Routes for uploading, deleting, and fetching user avatars are defined.
// Multer middleware is used for handling file uploads.
// Sharp library is used to process and resize the uploaded image.
// Routes are protected with the auth middleware to ensure authentication before avatar - related operations.
const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			// You can always pass an error if something goes wrong:
			cb(new Error('Please upload an image!'))
		}

		// To accept the file pass `true`, like so:
		cb(null, true)

	}
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
	const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
	req.user.avatar = buffer
	await req.user.save()
	res.send()
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {

	req.user.avatar = undefined
	req.user.save()
	res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		if (!user || !user.avatar) {
			throw new Error()
		}
		res.set('Content-Type', 'image/png')
		res.send(user.avatar)
	} catch (error) {
		res.status(404).send()
	}
})

module.exports = router