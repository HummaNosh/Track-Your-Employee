class Dept {
    constructor (id, department_name ) {
        this.id = id;
        this.department_name = department_name;
    }

    getID() {
        return this.id;
    }

    getDeptName () {
        return this.department_name;
    }
}


module.exports = Dept;