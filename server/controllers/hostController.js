var sessions = require('../collections/SessionsCollection').sessions;
var socketUtils = require('../utils/socketUtils');

// Calculates the aggregate stats from cache
// Returns current and average
exports.calculateStats = function(sessionId, cb) {
  cb({
    currentAverage: sessions.getCurrentAverage(sessionId),
    historicalAverage: sessions.getHistoricalAverage(sessionId),
    userCount: sessions.getUserCount(sessionId)
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.status(204).end();
};

// Return a sessionId
// Begins listening to a session
exports.registerSession = function(req, res) {
  var hostInfo = req.session.passport.user;
  var sessionId = sessions.addNewSession({
    provider: hostInfo.provider,
    hostId: hostInfo.hostId,
    cb: function() {
      socketUtils.init(sessionId, function() {
        res.send(sessionId); // Client will redirect to /#/host/sessionId
      });
    }
  });
};

exports.retrieveSessions = function(req, res) {
  var hostInfo = req.session.passport.user;
  // TODO: Complete this
};

exports.redirect = function(req, res) {
  res.redirect('/#/host/' + (req.params.sessionId || ''));
};
