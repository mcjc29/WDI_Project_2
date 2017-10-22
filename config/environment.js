module.exports = {
  port: process.env.PORT || 4000,
  dbURI: process.env.MONGODB_URI || 'mongodb://localhost/data',
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret'
};
