module.exports = class SpDate {

    constructor(){
        this.from = null;
        this.to = null;
        this.available = true;
        this.scale = 1;
    }

    static availabilityOptions(){
        return [
            {
                val: true,
                label: "Yes"
            },
            {
                val: false,
                label: "No"
            }
        ];
    }
};