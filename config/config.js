let config = {
    local: {
        mysql:{
            url: process.env.DB_URL,
        },
        //url: "http://localhost:3001",
        apiKeys:{}
    },
    prod: {
        mysql:{
            url: process.env.JAWSDB_URL,
        },
        //url: 'https://healthy-people-front-end.herokuapp.com/',
        apiKeys:{}
    }
};

module.exports = config[process.env.APP_ENV || 'local'];