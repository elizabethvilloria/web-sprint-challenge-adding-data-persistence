// build your `Project` model here
function getProjectById(project_id) {
    return Promise.resolve(`PROJECT ${project_id}`)
}

module.exports = { getProjectById }