// build your `/api/projects` router here
const router = require('express').Router()
const projectModel = require('./model.js')

// GET /api/projects/:project_id
router.get('/', async (req, res, next) => {
    try {
      const projects = await projectModel.getAllProjects();
      const formattedProjects = projects.map(project => ({
        project_name: project.project_name,
        project_description: project.project_description,
        project_completed: Boolean(project.project_completed) || false, 
      }));
      res.status(200).json(formattedProjects);
    } catch (error) {
      next(error);
    }
  });
  

// POST /api/projects
router.post('/', async (req, res, next) => {
    try {
        const { project_name, project_description, project_completed } = req.body;

        if (!project_name) {
            return res.status(400).json({ error: 'project_name is required' });
        }

        const newProject = await projectModel.addProject({
            project_name,
            project_description,
            project_completed: Boolean(project_completed) || false,
        });

        if (newProject) {
            res.status(201).json({
                project_id: newProject.project_id,
                project_name: newProject.project_name,
                project_description: newProject.project_description,
                project_completed: newProject.project_completed === 1 ? true : false,
            });
        } else {
            res.status(500).json({ error: 'Failed to create project' });
        }
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'ERROR in projects router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
