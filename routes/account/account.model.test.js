const Account = require('./account.model');
let account = Account.default();

test('default account creation', () => {
    // let test = Account.default();
    expect(account.account_id).toBe(null);
    expect(account.email).toBe(null);
    expect(account.password).toBe(null);
    expect(account.fname).toBe(null);
    expect(account.lname).toBe(null);
});

test(' Account::ID::Get', () => {
    expect(account.getAccountId()).toBe(account.account_id);

});

test(' Account::ID::Set', () => {
    account.setAccountId(0);
    expect(account.getAccountId()).toBe(0);
});