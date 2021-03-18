const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

test('Account::GET', async done => {
    await request.get('/account').then( response => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("GET ACCOUNT");
    });
    done();
});

test('Account::POST', async done => {
    await request.post('/account').then( response => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("POST ACCOUNT");
    });
    done()
});