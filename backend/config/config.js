// Check Env
var env = process.env.NODE_ENV || 'development';
//fetch env.config
var config = require('./config.json.js');
var envConfig = config[env];
//add env.config value to process.env
Object.keys(envConfig).forEach(key=> process.env[key] = envConfig[key] );