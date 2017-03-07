const request = require('supertest');
const timetableInput = './input.js';
describe('loading express', function() {
  let server;
  beforeEach(() => {
    server = require('../server');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /', function testSlash(done) {
    request(server)
    .get('/')
    .expect(200, done);
  });
  it('responds to /timetable/create', function testPath(done) {
    request(server)
      .post('/timetable/create')
      .send(timetableInput)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
