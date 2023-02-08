import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import Collection from '../models/Collection.js'
import { assignRandomValues } from '../utils/assignRandomValues.js'

const router = express.Router()

// @route GET /api/collection/test
// @desc Test the auth route
// @access Public
router.get('/test', (req, res) => {
	res.send('Collection route working')
})

// @route GET /api/collection
// @desc Get user's card collection
// @access Private
router.get('/', requiresAuth, async (req, res) => {
	try {
		const collection = await Collection.find({
			user: req.body._id,
		}).sort({ number: 1 })

		return res.json(collection)
	} catch (error) {
		return res.status(500).send(error.message)
	}
})

// @route POST /api/collection/new
// @route Add card to user's collection
// @access Private
router.post('/new', requiresAuth, async (req, res) => {
	try {
		const values = assignRandomValues(req)

		const newCollection = new Collection({
			user: req.body.user,
			number: req.body.number,
			name: req.body.name,
			rarity: req.body.rarity,
			element: req.body.element,
			image: req.body.image,
			values: values,
		})

		await newCollection.save()
		return res.json(newCollection)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route PUT /api/collection/:collectionId
// @desc Update a card in user's collection
// @access Private
router.put('/:collectionId', requiresAuth, async (req, res) => {
	try {
		const card = await Collection.findOne({
			user: req.body._id,
			_id: req.params.collectionId,
		})

		if (!card) {
			return res.status(404).json({ error: 'Card does not exist' })
		}

		const updatedCard = await Collection.findOneAndUpdate(
			{
				user: req.body._id,
				_id: req.params.collectionId,
			},
			{
				image: req.body.image,
				values: req.body.values,
			},
			{
				new: true,
			}
		)

		return res.json(updatedCard)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route PUT /api/collection/:collectionId/favorite
// @desc Add card from user's collection to favorites
// @access Private
router.put('/:collectionId/favorite', requiresAuth, async (req, res) => {
	try {
		const card = await Collection.findOne({
			user: req.body._id,
			_id: req.params.collectionId,
		})

		if (!card) {
			return res.status(404).json({ error: 'Card does not exist' })
		}

		if (card.favorite) {
			return res.status(400).json({ error: 'Already added to favorites' })
		}

		const updatedCard = await Collection.findOneAndUpdate(
			{
				user: req.body._id,
				_id: req.params.collectionId,
			},
			{
				favorite: true,
			},
			{
				new: true,
			}
		)

		return res.json(updatedCard)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route PUT /api/collection/:collectionId/removeFavorite
// @desc Remove card from user's collection form favorites
// @access Private
router.put('/:collectionId/removeFavorite', requiresAuth, async (req, res) => {
	try {
		const card = await Collection.findOne({
			user: req.body._id,
			_id: req.params.collectionId,
		})

		if (!card) {
			return res.status(404).json({ error: 'Card does not exist' })
		}

		if (!card.favorite) {
			return res
				.status(400)
				.json({ error: 'Card already removed from favorites' })
		}

		const updatedCard = await Collection.findOneAndUpdate(
			{
				user: req.body._id,
				_id: req.params.collectionId,
			},
			{
				favorite: false,
			},
			{
				new: true,
			}
		)

		return res.json(updatedCard)
	} catch (error) {
		console.log(error)
		return res.status(500).send(error.message)
	}
})

// @route DELETE /api/collection/:collectionId/delete
// @desc Remove card from user's collection
// @access Private
router.delete('/:collectionId/delete', requiresAuth, async (req, res) => {
	try {
		const card = await Collection.findOne({
			_id: req.params.collectionId,
		})

		if (!card) {
			return res.status(404).json({ error: 'Card does not exist' })
		}

		await Collection.findOneAndRemove({
			_id: req.params.collectionId,
		})

		return res.json({ success: true })
	} catch (error) {
		console.log(error)
		res.status(500).send(error.message)
	}
})

export default router
