module.exports = (json, moment) => {
  const timetable = json;
  const newEvents = [];

  const parsePeriod = (period) => {
    const date = period.dateTime.date.split('-');
    const startTime = period.dateTime.time;
    const startDate = new Date(
      parseInt(date[0]),
      parseInt(date[1]) - 1,
      parseInt(date[2]),
      parseInt(startTime.hour),
      parseInt(startTime.minute)
    );

    const temp = {
      title: period.topicName,
      start: startDate
    };

    if (period.type === 'BREAK') {
      return;
      // temp.title = 'Break';
    } else if (period.type === 'REWARD') {
      return;
      // temp.title = 'Reward';
    }

    if (period.type === 'BREAK_DAY') {
      temp.allDay = true;
    }

    if (period.type === 'SUBJECT' || 'BREAK') {
      temp.end = moment(startDate).add(period.periodDuration, 'm').toDate();
    }

    newEvents.push(temp);
  };

  for (const date in timetable) {
    if (!timetable.hasOwnProperty(date)) continue;
    timetable[date].forEach((period) => {parsePeriod(period);});
  }
  return newEvents;
};
