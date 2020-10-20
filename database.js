const odbc = require('odbc');

odbc.connect('DSN=MAGIC', (error, connection) => {
    if (error) { throw error; }
    // now have an open connection to IBM i from any Linux or Windows machine
    connection.query('select * From ac2020.DBFAUT0001', (error, result) => {
        if (error) { throw error; }
        console.log(result);
    })
});

