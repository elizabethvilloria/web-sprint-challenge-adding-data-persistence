exports.up = async function (knex) {
  await knex.schema.createTable('project_resources', (table) => {
    table.increments('project_resource_id');
    table
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('project_id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
    table
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .references('resource_id')
      .inTable('resources')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('project_resources');
};
