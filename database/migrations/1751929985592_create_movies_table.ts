import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('status_id').unsigned().references('id').inTable('movie_statuses').notNullable()
      table.integer('writer_id').unsigned().references('id').inTable('cineasts').notNullable()
      table.integer('director_id').unsigned().references('id').inTable('cineasts').notNullable()
      table.string('title', 100).notNullable()
      table.string('slug', 200).notNullable().unique()
      table.string('summary').notNullable().defaultTo('')
      table.text('synopsis').nullable()
      table.string('poster_url').notNullable().defaultTo('')
      table.timestamp('release_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
