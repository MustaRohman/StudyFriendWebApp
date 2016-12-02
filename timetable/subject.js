const Topic = require('./topic');

class Subject {
  constructor(name, sessionSize, ...topics) {
    this.name = name;
    const topicsList = [];
    topics.forEach(function(topic) {
      topicsList.push(new Topic(topic));
    });
    this.topics = topicsList;
    this.durationHours = (this.topics.length * sessionSize) / 60;
  }


  get getName() {
    return this.name;
  }

  set addTopic(topic) {
    this.topics.push(topic);
  }
}

module.exports = Subject;
