var path = require('path');

var friends = require("../data/friends.js");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    var user = req.body;
    var userScores = user.friendScore;
    var minDifference = 50;
    var matchName = '';
    var matchImage = '';

    for (var i = 0; i < userScores.length; i++) {
      userScores[i] = parseInt(userScores[i]);
    }

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].friendScore.length; j++) {
        var difference = Math.abs(userScores[j] - friends[i].friendScore[j]);
        totalDifference += difference;
      }

      if (difference < minDifference) {
        minDifference = totalDifference;
        matchName = friends[i].friendName;
        matchImage = friends[i].friendPhoto;
      }
    }

    friends.push(user);

    res.json({ matchName: matchName, matchImage: matchImage, userScore: minDifference });

  });
};

