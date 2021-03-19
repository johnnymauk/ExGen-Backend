class Muscle {
    constructor(muscle_id, name, musclegroup_id){
        this._muscle_id = muscle_id;
        this._name = name;
        this._musclegroup_id = musclegroup_id;
    }

    static default(){
        return new Muscle(null,null,null);
    }

    get muscle_id() {
        return this._muscle_id;
    }

    get name() {
        return this._name;
    }

    get musclegroup_id() {
        return this._musclegroup_id;
    }


    set muscle_id(value) {
        this._muscle_id = value;
    }

    set name(value) {
        this._name = value;
    }

    set musclegroup_id(value) {
        this._musclegroup_id = value;
    }
}

module.exports = Muscle;