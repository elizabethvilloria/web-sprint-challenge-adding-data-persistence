// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAllProjects() {
    const projects = await db('projects');
    return projects;
}

async function getProjectById(project_id) {
    const projectRows = await db('projects as p')
        .where('project_id', project_id);
    
    return projectRows[0] || null;
}

async function addProject(project) {
    try {
        const [newProject] = await db('projects')
            .returning(['project_id', 'project_name', 'project_description', 'project_completed'])
            .insert({
                ...project,
                project_completed: project.project_completed || false,
            });

        return newProject;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
};