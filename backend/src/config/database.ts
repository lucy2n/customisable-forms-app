import { Sequelize } from 'sequelize';

// Define database configuration options
const dbConfig = {
  development: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'lysia2002',
    database: process.env.MYSQL_DATABASE || 'forms_app',
    host: process.env.MYSQLHOST || 'localhost',
    dialect: 'mysql',  // Can be 'postgres', 'sqlite', etc., depending on your database
    logging: console.log,  // Set to false if you don't want to log SQL queries
  },
  test: {
    username: process.env.MYSQLUSER || 'test_user',
    password: process.env.MYSQL_ROOT_PASSWORD || 'test_password',
    database: process.env.MYSQL_DATABASE || 'test_database',
    host: process.env.MYSQLHOST || 'localhost',
    dialect: 'sqlite',
    storage: ':memory:',  // In-memory database for testing
    logging: false,
  },
  production: {
    username: process.env.MYSQLUSER || 'prod_user',
    password: process.env.MYSQL_ROOT_PASSWORD || 'prod_password',
    database: process.env.MYSQL_DATABASE || 'prod_database',
    host: process.env.MYSQLHOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  },
};

// Environment detection (development, test, production)
const env = process.env.NODE_ENV || 'development';

// Select the right config based on environment
const currentConfig = dbConfig[env as keyof typeof dbConfig];

// Initialize Sequelize
const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect as 'mysql',
    logging: currentConfig.logging,
  }
);

export default sequelize;