const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {todo} = require('./../models/todo');

var todos = [{
    text: "Hello I am number 1"
},{
    text: "Hello I am number 2"
}]

beforeEach((done) => {
    todo.remove().then(() => {
        todo.insertMany(todos);
    }).then(() => done());
})

describe('POST /todos',() => {
    it('Should create a new todo',(done) => {
        var text = "Created from test suite"
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if (err){
                    return done(err);
                }

                todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });
    it('Should not create a new todo',(done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if(err) {
                    return done(err);
                }

                todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('Should get all the todos',(done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});