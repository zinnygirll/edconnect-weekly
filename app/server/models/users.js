const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName () {
        return `${this.firstname} ${this.lastname}`; 
    }
}

class Users extends DataModel {
    //email and password must be available in the same object
    authenticate(email, password) {
        let trueEmail = this.data.filter(e=> e.email === email)
        let truePassword = this.data.filter(e=> e.password === password)
        if (trueEmail[0] === truePassword[0]) {
            return true
        } 
        return false;
    }

    getByEmail(email) {
       return (this.data.filter(e=> e.email === email)).length == 1 ? (this.data.filter(e => e.email === email))[0]  : null;
    }

    getByMatricNumber(matricNumber) {
       return (this.data.filter(e=> e.matricNumber === matricNumber)).length == 1 ? (this.data.filter(e => e.matricNumber === matricNumber))[0]  : null;
    }

    validate(obj) {
        //none of the properties in obj is empty
        let isEmpty = false
        for (let key in obj) {
            if ((obj[key] === undefined) || (obj[key] === null)) {
                isEmpty = true
            }
        } 
        let userByEmail = this.data.find(item => {
            return item.email === obj.email
        })
        let userByMatric = this.data.find(item => {
            return item.matricNumber === obj.matricNumber
        })
        if(isEmpty || userByEmail || userByMatric || obj.password.length < 7) {
            return false
        } else {
            return true
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};