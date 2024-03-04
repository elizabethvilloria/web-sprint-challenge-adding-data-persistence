// build your `/api/resources` router here
// resources/router.js
const router = require('express').Router();
const resourceModel = require('./model.js');

// [GET] /api/resources
router.get('/', async (req, res, next) => {
    try {
        const resources = await resourceModel.getAllResources();
        res.status(200).json(resources);
    } catch (error) {
        next(error);
    }
});

// [POST] /api/resources
router.post('/', async (req, res, next) => {
    try {
        const { resource_name, resource_description } = req.body;

        if (!resource_name) {
            return res.status(400).json({ error: 'resource_name is required' });
        }

        const newResource = await resourceModel.addResource({
            resource_name,
            resource_description,
        });

        res.status(201).json({
            resource_id: newResource.resource_id,
            resource_name: newResource.resource_name,
            resource_description: newResource.resource_description,
        });
    } catch (error) {
        next(error);
    }
});


router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'ERROR in resources router',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;