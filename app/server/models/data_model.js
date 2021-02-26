class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for (let b in this.data) {
            if(this.data[b].id === id) {
                return this.data[b];
                break;
            } 
            return null;
        }
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
       for (let x = 0; x < this.data.tength; x++) {
            if(this.data[x].id === id) {
                this.data[x] = obj;
                return true;
                break;
            } else {
                return false;
            }
       }  
    }

    delete(id) {  
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].id === id) {
                this.data.splice(i, 1);
                return true;
            } else {
                return false;
            }
        }
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;