const Pool = require ("pg").Pool;

const pool = new Pool({
    user:"rajsisangra",
    password:"Rajsisangra003:",
    host:"localhost",
    port:"5431",
    database:"erpmodule"

});

module.exports = pool;
