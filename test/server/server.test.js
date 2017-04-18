const request = require('supertest');
describe('loading express', function() {
  let server;
  beforeEach(() => {
    server = require('../../server');
  });
  afterEach(() => {
    server.close();
  });
  it('responds to /', function testSlash(done) {
    request(server)
    .get('/')
    .expect(200, done);
  });
  it('responds to /code', function testPath(done) {
    request(server)
      .get('/code')
      .set('Content-Type', 'application/json')
      .set('Code', '8db7275d-aedf')
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        done();
      });
  });
});
