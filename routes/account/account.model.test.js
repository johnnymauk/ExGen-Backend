const Account = require("./account.model");

describe("Default Account", () => {

    let account = Account.default();

    test("Constructor Check", () => {
        // let test = Account.default();
        expect(account.account_id).toBe(null);
        expect(account.email).toBe(null);
        expect(account.password).toBe(null);
        expect(account.fname).toBe(null);
        expect(account.lname).toBe(null);
    });

    test(" Account::ID::Get", () => {
        expect(account.getAccountId()).toBe(account.account_id);
    });

    test(" Account::ID::Set", () => {
        account.setAccountId(0);
        expect(account.account_id).toBe(0);
    });

    test(" Account::Email::Get", () => {
        expect(account.getEmail()).toBe(account.email);
    });

    test(" Account::Email::Set", () => {
        let temp = "example@example.com";
        account.setEmail(temp);
        expect(account.email).toBe(temp);
    });

    test(" Account::Password::Get", () => {
        expect(account.getPassword()).toBe(account.password);
    });

    test(" Account::Password::Set", () => {
        let temp = "Password";
        account.setPassword(temp);
        expect(account.password).toBe(temp);
    });

    test(" Account::FName::Get", () => {
        expect(account.getFName()).toBe(account.fname);
    });

    test(" Account::FName::Set", () => {
        let temp = "John";
        account.setFName(temp);
        expect(account.fname).toBe(temp);
    });

    test(" Account::LName::Get", () => {
        expect(account.getLName()).toBe(account.lname);
    });

    test(" Account::LName::Set", () => {
        let temp = "Doe";
        account.setLName(temp);
        expect(account.lname).toBe(temp);
    });

});

describe("Non-Default Account", () => {
    let account_id = 1;
    let email = "example@example.com";
    let password = "Password";
    let fname = "John";
    let lname = "Doe";
    let account = new Account(account_id,email, password,fname,lname);

    test("Constructor Check", () => {
        // let test = Account.default();
        expect(account.account_id).toBe(account_id);
        expect(account.email).toBe(email);
        expect(account.password).toBe(password);
        expect(account.fname).toBe(fname);
        expect(account.lname).toBe(lname);
    });

});