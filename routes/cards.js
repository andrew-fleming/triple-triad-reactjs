import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Card from '../models/Card.js'

const router = express.Router()

// @route GET /api/cards/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Cards route working')
})

// @route GET /api/cards
// @desc Get all released cards
// @access Private
router.get('/', requiresAuth, async (req, res) => {
	try {
		const cards = await Card.find({ ...Card })

		return res.json(cards)
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// @route POST /api/cards/new
// @route Release new card
// @access Private
router.post('/new', requiresAuth, async (req, res) => {
	try {
		const { isValid, errors } = validateCard(req.body)

		if (!isValid) {
			return res.status(400).json(errors)
		}

		const newCard = new Card({
			number: req.body.number,
			name: req.body.name,
			rarity: req.body.rarity,
			element: req.body.element,
			image: req.body.image,
		})

		await newCard.save()
		return res.json(newCard)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

export default router
