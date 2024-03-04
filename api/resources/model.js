// build your `Resource` model here
const db = require('../../data/dbConfig');

async function getAllResources() {
    return db('resources');
}

async function addResource(resource) {
    try {
        const [newResource] = await db('resources')
            .returning(['resource_id', 'resource_name', 'resource_description'])
            .insert({
                ...resource,
            });

        if (!newResource) {
            throw new Error('Failed to create resource');
        }

        return newResource;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllResources,
    addResource,
};