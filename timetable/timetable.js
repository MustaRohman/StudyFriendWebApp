const Subject = require('./subject');

// Timetable config with default values
const BREAK = 15;
const SESSION_SIZE = 45;
const AVG_MODULE_LENGTH = 240;

// Front-end: take module input and turn into objects


const CSL = new Subject('CSL', SESSION_SIZE, 'logic', 'trees' );

function generateTimetable(...subjects) {
  const d = new Date(2016, 12, 1, 9, 0, 0, 0);
}

console.log(CSL);
