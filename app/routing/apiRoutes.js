// Require path
var path = require('path');

// Import the list of friend entries
var friends = require("../data/friends.js");

// Export API routes
module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  // Total list of friend entries
  app.post("/api/friends", function (req, res) {

    // Capture user input
    var user = req.body;
    var userScores = user.friendScore;

    //This is the maximum difference between two users.
    var minDifference = 50;

    // Set variables for match's name and Image.
    var matchName = '';
    var matchImage = '';


    // for (var i = 0; i < userScores.length; i++) {
    //   userScores[i] = parseInt(userScores[i]);
    // }

    // This loops through the friends that we have in our friends list
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      //This loops through the Friends scores 
      for (var j = 0; j < friends[i].friendScore.length; j++) {

        // Calculates the difference between the different friends and provides us with an absolute value.
        var difference = Math.abs(userScores[j] - friends[i].friendScore[j]);
        totalDifference += difference;
      }

      // If lowest difference, record the friend match
      if (difference < minDifference) {
        minDifference = totalDifference;
        matchName = friends[i].friendName;
        matchImage = friends[i].friendPhoto;
      }
    }

    // Add new user input
    friends.push(user);

    // Send appropriate response
    res.json({ matchName: matchName, matchImage: matchImage, userScore: minDifference });

  });
};

