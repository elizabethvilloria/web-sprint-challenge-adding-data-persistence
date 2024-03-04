// build your `Task` model here
const db = require('../../data/dbConfig');

async function getAllTasks() {
  const tasks = await db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    );

  return tasks;
}

async function addTask(task) {
  const newTask = await db('tasks').insert({
    ...task,
    task_completed: task.task_completed || 0,
  }, ['task_id', 'task_description', 'task_notes', 'task_completed', 'project_id']);
  return newTask[0];
}

async function isValidProject(project_id) {
  const project = await db('projects').where('project_id', project_id).first();
  return !!project;
}

module.exports = {
  getAllTasks,
  addTask,
  isValidProject,
};