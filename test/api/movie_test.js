const chai = require('chai');
const chai_http = require('chai-http');
const should = chai.should();
const server = require('../../app');
chai.use(chai_http);

let token, movie_id;
describe('/api/movies test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: "salimcankaradeniz1", password: "pike.123"})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            done()
        });
    });
    describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'test film1',
                director_id: "5bd5b4b0d6da683c3aae21dd",
                category: 'Komedi',
                country: "Türkiye",
                imdb_score: 8,
                year: 2018
            };
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('year');
                    movie_id = res.body._id;
                    done();
                });
        });
    });
    describe('/GET/:movie_id movie', () => {
        it('it should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                });
        });
    });
    describe('/PUT/:movie_id movie', () => {
        it('it should Update a movie', (done) => {
            const movie = {
                title: '1903bjk',
                director_id: "5bd5b4b0d6da683c3aae21dd",
                category: 'Macera',
                country: "Türkiye",
                imdb_score: 8,
                year: 1903
            };
            chai.request(server)
                .put('/api/movies/'+ movie_id)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    res.body.should.have.property('year').eql(movie.year);
                    done();
                });

        });
    });
    describe('/DELETE/:movie_id movie', () => {
        it('it should Delete a movie', (done) => {
            const movie = {
                title: '1903bjk',
                director_id: "5bd5b4b0d6da683c3aae21dd",
                category: 'Macera',
                country: "Türkiye",
                imdb_score: 8,
                year: 1903
            };
            chai.request(server)
                .delete('/api/movies/'+ movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });

        });
    });
});