/* globals api, expect, describe, xdescribe, beforeEach, afterEach, it, xit */
require('../spec_helper');

const Student = require('../../models/student');

// overall name of tests
describe('Students Routes', () => {

  // drop database before and after each test
  beforeEach(done => {
    Student.collection.remove();
    done();
  });

  afterEach(done => {
    Student.collection.remove();
    done();
  });

  describe('GET /api/students', () => {

    beforeEach(done => {
      Student.create({
        name: 'George Wilman',
        image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
      })
        .then(() => done())
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/students')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get('/api/students')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should contain an array of students', done => {
      api
        .get('/api/students')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return object with properities: id, name, image, createdAt, updatedAt', done => {
      api.get('/api/students')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              'id',
              'name',
              'image',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });

    });

  });

  describe('Create multiple students', () => {

    beforeEach(done => {
      Student.create([
        {
          name: 'George Wilman',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3 849.jpg'
        },
        {
          name: 'Wilson Espina',
          image: 'https://user-images.githubusercontent.com/28314323/32404855-373aa592-c151-11e7-9661-5e870aca48b6.jpg'
        }
      ])
        .then(() => done())
        .catch(done);
    });

    it('should create 2 students', done => {
      api
        .get('/api/students')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body.length).to.equal(2);
          done();
        });
    });

  });

  describe('POST /api/students', () => {

    it('should return a 201 response', done => {
      api
        .post('/api/students')
        .set('Accept', 'application/json')
        .send({
          name: 'George Wilman',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
        })
        .expect(201, done);
    });

    it('should create a new student', done => {
      api
        .post('/api/students')
        .set('Accept', 'application/json')
        .send({
          student: {
            name: 'George Wilman',
            image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
          }
        })
        .end((err, res) => {
          const student = res.body;

          expect(student)
            .to.have.property('id')
            .and.to.be.a('string');

          expect(student)
            .to.have.property('name')
            .and.to.be.a('string');

          expect(student)
            .to.have.property('image')
            .and.to.be.a('string');

          expect(student)
            .to.have.property('createdAt')
            .and.to.be.a('string');

          expect(student)
            .to.have.property('updatedAt')
            .and.to.be.a('string');

          done();
        });

    });

  });

  describe('GET /api/students/:id', () => {

    let student;

    beforeEach(done => {
      Student.create({
        name: 'George Wilman',
        image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
      })
        .then(studentData => {
          student = studentData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .get(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return object with properities: id, name, image, createdAt, updatedAt', done => {
      api.get(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              'id',
              'name',
              'image',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

  });

  describe('PUT /api/students/:id', () => {

    let student;

    beforeEach(done => {
      Student.create({
        name: 'George Wilman',
        image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
      })
        .then(studentData => {
          student = studentData;
          done();
        })
        .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .put(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Joe Bloggs',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
        })
        .expect(200, done);
    });

    it('should return a JSON object', done => {
      api
        .put(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Joe Bloggs',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
        })
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return object with properities: id, name, image, createdAt, updatedAt', done => {
      api
        .put(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Joe Bloggs',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
        })
        .end((err, res) => {
          expect(res.body)
            .and.have.all.keys([
              'id',
              'name',
              'image',
              'createdAt',
              'updatedAt'
            ]);
          done();
        });
    });

    it('should return new saved data', done => {
      api
        .put(`/api/students/${student.id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Joe Bloggs',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
        })
        .end((err, res) => {
          expect(res.body.name)
            .to.be.eq('Joe Bloggs');
          done();
        });
    });

  });

  describe('DELETE /api/students/:id', () => {

    let student;

    beforeEach(done => {
      Student.create(
        {
          name: 'George Wilman',
          image: 'https://user-images.githubusercontent.com/28314323/32336553-7fcb53c6-bfe7-11e7-9439-516d73e3849.jpg'
        })
        .then(studentData => {
          student = studentData;
          done();
        })
        .catch(done);
    });

    it('should return a 204 response', done => {
      api
        .delete(`/api/students/${student.id}`)
        .expect(204, done);
    });

  });

});
