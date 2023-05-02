import express from 'express'
import requiresAuth from '../middleware/permissions.js'
import User from '../models/User.js'

const router = express.Router()

// @route GET /api/profile/test
// @desc Test the profile route
// @access Public
router.get('/test', (req, res) => {
    res.send('Auth route working')
})

// @route PUT /api/profile/
// @desc Update user's profile
// @access Private
router.put('/', requiresAuth, async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                username: req.body.username,
                image: req.body.image,
                coin: req.body.coin,
                rank: req.body.rank,
                level: req.body.level,
                xp: req.body.xp,
                firstDeck: req.body.firstDeck,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route PUT /api/profile/stats
// @desc Update user's stats
// @access Private
router.put('/stats', requiresAuth, async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                stats: {
                    matches: req.body.matches,
                    wins: req.body.wins,
                    losses: req.body.losses,
                    draws: req.body.draws,
                },
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

// @route PUT /api/profile/packs
// @desc Update user's packs
// @access Private
router.put('/packs', requiresAuth, async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate(
            {
                _id: req.user._id,
            },
            {
                packs: req.body.packs,
            }
        )
        return res.json(updatedProfile)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

export default router
