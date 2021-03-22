const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const { db } = require("../../db");

afterAll(async () => {
    await db.end();
});

describe('ACCOUNT::GET', () => {

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


test('Account::POST', async done => {
    await request.post('/account').then( response => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("POST ACCOUNT");
    });
    done()
});