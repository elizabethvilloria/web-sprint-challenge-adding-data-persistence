// build your `/api/projects` router here
const router = require('express').Router()
const projectModel = require('./model.js')

router.get('/:project_id', (req, res, next) => {
    projectModel.getProjectById(req.params.project_id)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'ERROR in projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
