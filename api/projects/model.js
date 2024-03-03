// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAllProjects() {
    return db('projects');
}

async function getProjectById(project_id) {
    const projectRows = await db('projects as p')
        .where('project_id', project_id);
    
    return projectRows[0] || null;
}

async function addProject(project) {
    const [project_id] = await db('projects').insert(project, 'project_id');
    return db('projects').where({ project_id }).first();
}

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
};