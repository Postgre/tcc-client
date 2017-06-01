(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/MySite', ['exports', 'jquery', 'Site'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('Site'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.Site);
        global.MySite = mod.exports;
    }
})(this, function (exports, _jquery, _Site2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getInstance = exports.run = exports.MySite = undefined;

    var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

    var _Site3 = babelHelpers.interopRequireDefault(_Site2);

    var SELECTORS = [{
        role: "caroler",
        selector: ".cc-if-caroler"
    }, {
        role: "customer",
        selector: ".cc-if-customer"
    }, {
        role: "director",
        selector: ".cc-if-director"
    }];

    var MySite = function (_Site) {
        babelHelpers.inherits(MySite, _Site);

        function MySite() {
            babelHelpers.classCallCheck(this, MySite);
            return babelHelpers.possibleConstructorReturn(this, (MySite.__proto__ || Object.getPrototypeOf(MySite)).apply(this, arguments));
        }

        babelHelpers.createClass(MySite, [{
            key: 'processed',
            value: function processed() {
                babelHelpers.get(MySite.prototype.__proto__ || Object.getPrototypeOf(MySite.prototype), 'processed', this).call(this);

                var role = "user";
                if (localStorage.role) role = localStorage.role;

                for (var i = 0; i < SELECTORS.length; i++) {
                    var s = SELECTORS[i].selector;
                    (0, _jquery2.default)(s).hide();
                }

                for (var _i = 0; _i < SELECTORS.length; _i++) {
                    var definition = SELECTORS[_i];
                    var r = definition.role;
                    var _s = definition.selector;
                    console.log(role, r, _s);
                    if (role === r) {
                        (0, _jquery2.default)(_s).show();
                    }
                }
            }
        }]);
        return MySite;
    }(_Site3.default);

    var instance = null;
    function getInstance() {
        if (!instance) {
            instance = new MySite();
        }
        return instance;
    }
    function run() {
        var site = getInstance();
        site.run();
    }
    exports.default = MySite;
    exports.MySite = MySite;
    exports.run = run;
    exports.getInstance = getInstance;
});
