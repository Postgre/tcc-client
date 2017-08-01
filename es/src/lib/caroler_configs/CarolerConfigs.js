module.exports = class CarolerConfigs {

    constructor(opts) {
        Object.assign(this, CarolerConfigs.defaults);
        Object.assign(this, opts);
    }

    static get options() {
        return [
            {
                name: "Trio (S,A,B)",
                val: "trio_sab"
            },
            {
                name: "Trio (S,T,B)",
                val: "trio_stb"
            },
            {
                name: "Quartet",
                val: "quartet"
            },
            {
                name: "Sixtet",
                val: "sixtet"
            },
            {
                name: "Octet",
                val: "octet"
            }
        ]
    }

    static get defaults() {
        return {
            "trio_sab": false,
            "trio_stb": false,
            "quartet": true,
            "sixtet": false,
            "octet": false
        }
    }
};