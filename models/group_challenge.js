var orm = require('../config/orm')

var group_challenge = {
    //Expecting newChallenge object that includes type, name, and start/end date.
    createChallenge: function (newChallenge, callback) {
        let query = {
            table: 'group_challenges',
            data: newChallenge,
            debug: true
        };
        orm.insert(query, callback);
    }
};

module.exports = group_challenge;