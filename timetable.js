// Timetable config with default values
const BREAK = 15;
const SESSION_SIZE = 45;
const AVG_MODULE_LENGTH = 240;

// Front-end: take module input and turn into objects
class Topic {
  constructor(name) {
    this.name = name;
  }
}

class Period {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    if (type === 'topic') {
      this.duration = SESSION_SIZE;
    } else {
      this.duration = BREAK;
    }
  }
}

class Subject {
  constructor(name, startTime, endTime, ...topics) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    const topicsList = [];
    topics.forEach(function(topic) {
      topicsList.push(new Topic(topic));
    });
    this.topics = topicsList;
  }

  get getName() {
    return this.name;
  }

  set addTopic(topic) {
    this.topics.push(topic);
  }
}

const CSL = new Subject('CSL', null, null, 'logic', 'trees' );

function generateTimetable(...subjects) {
  const d = new Date(2016, 12, 1, 9, 0, 0, 0);
}


console.log(AVG_MODULE_LENGTH / SESSION_SIZE);
console.log(CSL);
