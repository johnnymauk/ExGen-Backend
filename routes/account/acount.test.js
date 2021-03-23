const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { db } = require("../../db");

afterAll(async () => {
    await db.end();
});

describe('ACCOUNT::GET::ID', () => {

    test('GOOD', async done => {
        await request.get('/account/1').then( response => {
            expect(response.status).toBe(200);
            expect(response.body.info).toBeDefined();
            expect(response.body.info.fname).toBe('John');
        });
        done();
    });

    test('NOT FOUND', async done => {
        await request.get('/account/0').then( response => {
            expect(response.status).toBe(404);
            expect(response.body.info).toBeUndefined();

        });
        done();
    });

    test('BAD REQUEST', async done => {
        await request.get('/account/abc').then( response => {
            expect(response.status).toBe(400);
            expect(response.body.info).toBeUndefined();
        });
        done();
    });
})

describe('ACCOUNT::POST::ID', () =>{
    const data = {
        email: "example2@example.com",
        fname: "Mazie",
        lname: "Nicky"
    }

    test('GOOD', async done => {
        await request
            .post('/account/2')
            .send(data)
            .then( response => {
                expect(response.status).toBe(200);
                expect(response.body.info).toBeDefined();
                expect(response.body.info.account_id).toBe(2);
            });
        done();
    });

    test('NOT FOUND', async done => {
        await request
            .post('/account/0')
            .send(data)
            .then( response => {
                expect(response.status).toBe(404);
                expect(response.body.info).toBeUndefined();
            });
        done();
    });

    test('BAD REQUEST', async done => {
        await request
            .post('/account/abc')
            .send(data)
            .then( response => {
                expect(response.status).toBe(400);
                expect(response.body.info).toBeUndefined();
            });
        done();
    });
})

describe('ACCOUNT::ID::PASSWORD', () => {

    test('POST::NEW PASS::GOOD', async done => {
        await request.post('/account/2/password_reset').then( response => {
            expect(response.status).toBe(200);
            expect(response.body.info.account_id).toBe(2);
        });
        done()
    });

    test('POST::NEW PASS::BAD REQUEST', async done => {
        await request.post('/account/abc/password_reset').then( response => {
            expect(response.status).toBe(400);
            expect(response.body.info).toBeUndefined();
        });
        done()
    });

    test('POST::NEW PASS::NOT FOUND', async done => {
        await request.post('/account/0/password_reset').then( response => {
            expect(response.status).toBe(404);
            expect(response.body.info).toBeUndefined();
        });
        done()
    });
})


describe('ACCOUNT::CHECK EMAILS', () => {

    test('Email Exists', async done => {
        await request.get('/account/check')
            .query({ email: 'example2@example.com' })
            .then( response => {
                expect(response.status).toBe(200);
                expect(response.body.info).toBe(1);
        })
        done()
    })

    test('Email Does Not Exist', async done => {
        await request.get('/account/check')
            .query({ email: 'example0@example.com' })
            .then( response => {
                expect(response.status).toBe(404);
                expect(response.body.info).toBe(0);
        })
        done()
    })

});

describe('ACCOUNT::CREATE THEN DELETE', () => {
    test('ALl PARAMS PRESENT', async done => {
        const data = {
            email: 'temp2@temp.com',
            fname: 'tempname',
            lname: 'templname',
            pass: '$2b$10$SMOfe5vCHGYurgnVfIyTpOn9/IVF1IpJtDHR3SdHk2eeiFEheNMSm'
        }
        await request.post('/account/create')
            .send(data)
            .then( async response => {
                expect(response.status).toBe(200);
                expect(response.body.info.account_id).toBeDefined();

                await request.delete('/account/'+response.body.info.account_id+'/delete')
                    .then( resp => {
                        expect(resp.status).toBe(200);
                        expect(resp.body.info.account_id).toBe(response.body.info.account_id);
                    })
            })
        done();
    })
});
