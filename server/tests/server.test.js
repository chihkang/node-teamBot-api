const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { QuestionHelper } = require('./../models/QuestionHelper');

const QuestionHelperData = [{
  HintCode:"CA9999",
  Description:"Update Cert Error"
},{
  HintCode:"CA1999",
  Description:"Apply Cert Error"
}]

beforeEach((done) => {
  QuestionHelper.remove({}).then(() =>{
    return QuestionHelper.insertMany(QuestionHelperData);
  }).then(() => done());
});

describe('POST /QuestionHelper' ,() => {
  it('should create a new QuestionHelper', (done) => {
    var HintCode = 'test-HintCode';
    var Description = 'test-Description';

    request(app)
      .post('/QuestionHelper')
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

        QuestionHelper.find({HintCode}).then((docs) => {
          expect(docs.length).toBe(1);
          expect(docs[0].HintCode).toBe(HintCode);
          expect(docs[0].Description).toBe(Description);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create QuestionHelper with invalid body data', (done) => {
    request(app)
      .post('/QuestionHelper')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        QuestionHelper.find().then((docs) =>{
          expect(docs.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

describe('GET /QuestionHelper', () => {
  it('should get all QuestionHelper', (done) =>{
      request(app)
        .get('/QuestionHelper')
        .expect(200)
        .expect((res) => {
          // doc from server.js GET/QuestionHelper
          expect(res.body.docs.length).toBe(2);
        })
        .end(done);
  });
});

describe('GET /QuestionHelper/:hintcode', () =>{
  it('should return QuestionHelper doc',(done) =>{
    request(app)
      .get(`/QuestionHelper/${QuestionHelperData[0].HintCode}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.HintCode).toBe(QuestionHelperData[0].HintCode);
      })
      .end(done);
  });

  it('should return 404 if QuestionHelper not found', (done) => {
    // make sure you get a 404 back
    var wrongHintCode = 'CA3344';
    request(app)
      .get(`/QuestionHelper/${wrongHintCode}`)
      .expect(404)
      .end(done);
  });

});
