const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { CertDetails } = require('./../models/CertDetails');

beforeEach((done) => {
  CertDetails.remove({}).then(() => done());
});

describe('POST /CertDetails' ,() => {
  it('should create a new CertDetails', (done) => {
    var HintCode = 'test-HintCode';
    var Description = 'test-Description';

    request(app)
      .post('/CertDetails')
      .send({HintCode,Description})
      .expect(200)
      .expect((res) => {
        expect(res.body.HintCode).toBe(HintCode);
        expect(res.body.Description).toBe(Description);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        CertDetails.find().then((docs) => {
          expect(docs.length).toBe(1);
          expect(docs[0].HintCode).toBe(HintCode);
          expect(docs[0].Description).toBe(Description);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create CertDetails with invalid body data', (done) => {
    request(app)
      .post('/CertDetails')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        CertDetails.find().then((docs) =>{
          expect(docs.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });

});
