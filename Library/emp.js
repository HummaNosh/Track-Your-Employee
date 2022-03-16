class Emp {
    constructor (id, first_name, last_name, role_id, manager_id ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    getID() {
        return this.id;
    }

    getFirst () {
        return this.first_name;
    }

    getLast () {
        return this.last_name;
    }

    getRoleID () {
        return this.role_id;
    }

    getManagerID () {
        return this.manager_id;
    }
}


module.exports = Emp;