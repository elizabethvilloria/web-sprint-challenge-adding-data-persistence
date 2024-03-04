// build your `/api/tasks` router here
const router = require('express').Router()
const taskModel = require('./model.js')

// [GET] /api/tasks
router.get('/', async (req, res, next) => {
    try {
      const tasks = await taskModel.getAllTasks();
  
      const formattedTasks = tasks.map(task => ({
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes,
        task_completed: Boolean(task.task_completed), 
        project_name: task.project_name,
        project_description: task.project_description,
      }));
  
      // Respond with the formatted tasks
      res.status(200).json(formattedTasks);
    } catch (error) {
      // Handle errors
      next(error);
    }
  });
  
  // [POST] /api/tasks
  router.post('/', async (req, res, next) => {
    try {
      const { task_description, task_notes, task_completed, project_id } = req.body;
  
      if (!task_description) {
        return res.status(400).json({ error: 'task_description is required' });
      }
      if (!project_id) {
        return res.status(400).json({ error: 'project_id is required' });
      }
  
      const isValidProject = await taskModel.isValidProject(project_id);
      if (!isValidProject) {
        return res.status(400).json({ error: 'Invalid project_id' });
      }
  
      const newTask = await taskModel.addTask({
        task_description,
        task_notes,
        task_completed: Boolean(task_completed) || false,
        project_id,
      });
  
      res.status(201).json({
        task_id: newTask.task_id,
        task_description: newTask.task_description,
        task_notes: newTask.task_notes,
        task_completed: Boolean(newTask.task_completed), 
        project_id: newTask.project_id,
      });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;