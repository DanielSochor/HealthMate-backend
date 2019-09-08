var user = require("./user_controller");
var authorizer = require("./middleware/authenticate");
var group_challenge = require("../models/group_challenge");
var challenge_member = require("../models/challenge_member");
var challenge_log = require("../models/challenge_log");
var message = require("../models/message")


module.exports = function(app) {

    //========Users====================================================================

    app.post("/api/user", function(request, response) {
        user.create(request, response);
    });
    app.post("/api/user/login", function(request, response) {
        user.login(request, response);
    });
    app.delete("/api/user/login", function(request, response) {
        user.logout(request, response);
    });
    app.get("/api/user", authorizer.authenticate, function(request, response) {
        user.getUserBySession(request, response);
    });
    app.get("/api/user/:id", authorizer.authenticate, function(request, response) {
        user.getUserByID(request, response);
    });

    //========Challenges================================================================
    app.post("/api/group_challenge/create", function(request, response) {
        group_challenge.createChallenge(request.body, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    //Get all group challenges that a user belongs to
    app.get("/api/group_challenge/:user_id", function(request, response) {
        var user_id = request.params.user_id
        group_challenge.getUserChallenges(user_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });



    //========Challenge Members==========================================================
    app.post("/api/challenge_member/create", function(request, response) {
        challenge_member.createChallengeMember(request.body, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    app.delete("/api/challenge_member/delete", function(request, response) {
        challenge_member.deleteChallengeMember(request.body, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    //========Running Distance Logs =============================================================

    app.post("/api/running_distance_logs/create", function(request, response) {
        challenge_log.createRunningDistLog(request.body, function(error, result){
            console.log(request.body)
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    app.get("/api/running_distance_logs/:group_challenge_id", function(request, response) {
        var group_challenge_id = request.params.group_challenge_id
        challenge_log.getRunningDistLogs(group_challenge_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    app.get("/api/running_distance_logs/user/:user_id/:group_challenge_id", function(request, response) {
        var user_id = request.params.user_id
        var group_challenge_id = request.params.group_challenge_id
        challenge_log.getUserRunningDistLogs(user_id, group_challenge_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });



    //=============Running Pace Logs===============================================================

    app.post("/api/running_pace_logs/create", function(request, response) {
        challenge_log.createRunningPaceLog(request.body, function(error, result){
            console.log(request.body)
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    
    app.get("/api/running_pace_logs/:group_challenge_id", function(request, response) {
        var group_challenge_id = request.params.group_challenge_id
        challenge_log.getRunningPaceLogs(group_challenge_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

//=============Biking Pace Logs===============================================================
    app.post("/api/biking_pace_logs/create", function(request, response) {
        challenge_log.createBikingPaceLog(request.body, function(error, result){
            console.log(request.body)
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    app.get("/api/biking_pace_logs/:group_challenge_id", function(request, response) {
        var group_challenge_id = request.params.group_challenge_id
        challenge_log.getBikingPaceLogs(group_challenge_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    //========Biking Distance Logs =============================================================
    app.post("/api/biking_distance_logs/create", function(request, response) {
        challenge_log.createBikingDistLog(request.body, function(error, result){
            console.log(request.body)
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    app.get("/api/biking_distance_logs/:group_challenge_id", function(request, response) {
        var group_challenge_id = request.params.group_challenge_id
        challenge_log.getBikingDistLogs(group_challenge_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    
//========Message Logs =============================================================
    app.post("/api/messages/create", function(request, response) {
        message.createMessage(request.body, function(error, result){
            console.log(request.body)
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });

    app.get("/api/messages/:group_challenge_id", function(request, response) {
        var group_challenge_id = request.params.group_challenge_id
        message.allChallengeMessages(group_challenge_id, function(error, result){
            if (error) {
                response.json(error)
            } else {
                response.json(result)
            }
        });
    });


}
