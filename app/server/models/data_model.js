class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        let userId = this.data.find(item => item.id === id)
        if(!userId) {
            return null
        }
        return userId;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        let user = this.data.find(item => item.id === id)
        if(!user) {
            return false
        }
        for(let key in obj) {
            user[key] = obj[key]
        }
        return true 
    }

    delete(id) {  
        let i = this.data.findIndex(item => item.id === id)
        if(i > -1) {
            this.data.splice(i, 1)
            return true
        }
        return false
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;