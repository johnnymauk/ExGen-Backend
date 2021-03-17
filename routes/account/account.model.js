class Account {
    constructor(account_id, email, password, fname, lname){
        this.account_id = account_id;
        this.email = email;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
    }

    static default(){
        return new Account(null,null,null,null,null);
    }

    getAccountId(){ return this.account_id; };
    getEmail(){ return this.email; };
    getPassword(){ return this.password; };
    getFName(){ return this.fname; };
    getLName(){ return this.lname; };

    setAccountId(id){ this.account_id = id; };
    setEmail(email){ this.email = email; };
    setPassword(password){ this.password = password; };
    setFName(fname){ this.fname = fname; };
    setLName(lname){ this.lname = lname; };

}

module.exports = Account;