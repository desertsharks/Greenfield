// Socket helper functions
angular.module('greenfield')
  .factory('AnalysisServices', function($http) {

  var session = {
    id: '',
    url: '/host',
    //provider: '', //where can we get this from GET
    socket: null
  };

  // Sends a request of all sessions from a host
  // Receives the session IDs, start times

  var allSessionsHistory = function(cb) {
    return $http({
      method: 'GET',
      //in the db, looking at
      url: session.url + '/'
    })
    .then(function(resp) {
      // Historical data pulled from DB

      session.id = resp.data;
      cb(resp.data);
    });
  };

  //Sends a request of a specific session from a host
  //Recieves detailed vote average vs time data

  var singleSessionAnalysis = function(cb){
    return $http({
      method: 'GET',
      url: session.url + '/' + session.id
    })
    .then(function(resp){

      session.id = resp.data;
      cb(resp.data);
    })
  }


  return {
    getSessionsHistory: getSessionsHistory
  };

});