import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            user: req.user
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    })
})

router.get('/logout', function(req, res, next) {
    req.logout((err) => {
        if (err) { return next(err) }

        req.session.destroy((err) => {
            res.clearCookie('connect.sid')

            res.json({ 
            status: 'logout',
            user: {},
            })
        })
    })
})

const CLIENT_URL = process.env.NODE_ENV === 'production'
    ? 'https://client-4d30.onrender.com'
    : 'http://localhost:5173'

router.get('/github', passport.authenticate('github', { scope: [ 'read:user' ] }))

router.get('/github/callback', passport.authenticate('github', {
        successRedirect: `${CLIENT_URL}/`,
        failureRedirect: `${CLIENT_URL}/destinations`,
    })
)

export default router
