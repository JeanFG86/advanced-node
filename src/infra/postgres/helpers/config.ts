import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'advanced_node',
  password: '123456',
  entities: ['dist/infra/postgres/entities/index.js']
}
