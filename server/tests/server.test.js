const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

var {app} = require('./../server');
var {todo} = require('./../models/todo');

var todos = [{
    _id : new ObjectId(),
    text: "Hello I am number 1"
},{
    _id : new ObjectId(),
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

describe('GET /todos/:id', () => {
    it('Should get the todo', (done) => {
        var id = todos[0]._id;
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should get a 404 if the id is not found',(done) => {
        request(app)
            .get(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 if the id is invalid', (done) => {
        request(app)
            .get(`/todos/1234`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos', () => {
    it('Should delete the todo item', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                }).catch((e) => {
                    done(err);
                })
            })
    })

    it('Should get a 404 if the id is not found',(done) => {
        request(app)
            .delete(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 if the id is invalid', (done) => {
        request(app)
            .delete(`/todos/1234`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos:id', () => {
    it('Should return update the todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: "updates from test suite",
                completed: true })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe("updates from test suite");
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: "updates from test suite",
                completed: false })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe("updates from test suite");
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});