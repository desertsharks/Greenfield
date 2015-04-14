// holds vote collection
// holds aggregate statistics

var Backbone = require('backbone');
var VotesCollection = require('../collections/VotesCollection').VotesCollection;
exports.SessionModel = Backbone.Model.extend({
  initialize: function(params) {
    this.set('votes', new VotesCollection());

    // Used to compute current average
    this.set('sumVoteVals', 0);
    this.set('voteCount', 0);

    // Used to compute historical average
    this.set('cumSumVoteVals', 0);
    this.set('sumVoteCounts', 0);

    if (params && params.interval) {
      this.set('interval', params.interval);
      this.set('intervalObject', setInterval(this.update.bind(this), this.get('interval')));
    }
  },

  // Adds a new user and returns its id
  addUser: function() {
    return this.get('votes').addNewUser();
  },

  // Changes the voteVal of an existing user
  // Updates sumVoteVals and voteCount
  // Returns if voteVals are distinct
  changeVote: function(userId, voteVal) {
    var vote = this.get('votes').get(userId);
    if (voteVal !== vote.get('voteVal')) {
      this.set('sumVoteVals', this.get('sumVoteVals') + voteVal - vote.get('voteVal'));
      this.set('voteCount', this.get('voteCount') + (voteVal !== null) - (vote.get('voteVal') !== null));
      vote.set('voteVal', voteVal);
      return true;
    }
    return false;
  },

  // Updates historical average data every interval
  // Averages by number of votes
  update: function() {
    this.set('cumSumVoteVals', this.get('cumSumVoteVals') + this.get('sumVoteVals'));
    this.set('sumVoteCounts', this.get('sumVoteCounts') + this.get('voteCount'));
  },

  getCurrentAverage: function() {
    return this.get('sumVoteVals') / this.get('voteCount');
  },

  getHistoricalAverage: function() {
    return this.get('cumSumVoteVals') / this.get('sumVoteCounts');
  }
});
