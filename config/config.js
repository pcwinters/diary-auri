module.exports = {
  development: {
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    use_env_variable: "DATABASE_URL"
  },
  production: {
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    use_env_variable: "DATABASE_URL"
  }
};
