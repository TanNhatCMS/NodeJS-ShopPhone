const JsonDB = require('./JsonDB');
const MySQLDB = require('./MySQLDB');
const MongoDB = require('./MongoDB');

const dbType = process.env.DB_TYPE || 'json';

let db;

switch (dbType) {
    case 'mysql':
        db = new MySQLDB();
        break;
    case 'mongodb':
        db = new MongoDB();
        break;
    case 'json':
    default:
        db = new JsonDB();
        break;
}

module.exports = db;
