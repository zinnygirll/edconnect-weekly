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

    getFullName() {
        return (this.firstname + " " + this.lastname);
    }
}

class Users extends DataModel {
    //email and password must be available in the same object
    authenticate(email, password) {
        for (let j = 0; j < this.data.length; j++) {
            if((this.data[j].email == email) && (this.data[j].password == password)) {
                return true;
            } else {
                return false;
            }
        }
           
    }

    getByEmail(email) {
       return (this.data.filter(e=> e.email == email)).length == 1 ? this.data.filter(e => e.matricNumber == 1)[0]  : null;
    }

    getByMatricNumber(matricNumber) {
       return (this.data.filter(e=> e.matricNumber == matricNumber)).length == 1 ? this.data.filter(e => e.matricNumber == 1)[0]  : null;
    }

    validate(obj) {
        for (let a in this.data) {
            //none of the properties in obj is empty
            for (let key in obj) {
                if ((obj.key !== undefined) && (obj.key !== null)) {
                    if (this.data[a].email !== obj.email) {
                        if (this.data[a].matricNumber !== obj.matricNumber) {
                            if (obj.password.length >= 7) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }                        
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};