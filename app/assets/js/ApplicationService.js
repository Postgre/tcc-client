(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("/ApplicationService", ["exports", "jquery"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("jquery"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery);
        global.ApplicationService = mod.exports;
    }
})(this, function (exports, _jquery) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.renderSession = exports.registerIf = exports.registerBind = exports.bindOperations = exports.ifOperations = undefined;

    var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

    var ifOperations = [];
    var bindOperations = [];

    function renderSession() {
        ifOperations.forEach(function (operation) {
            var result = operation.condition();
            result ? (0, _jquery2.default)(operation.selector).show() : (0, _jquery2.default)(operation.selector).hide();
        });
        bindOperations.forEach(function (operation) {
            (0, _jquery2.default)(operation.selector).html(operation.content());
        });
    }
    function registerIf(selector, func) {
        ifOperations.push({
            "selector": selector,
            "condition": func
        });
    }
    function registerBind(selector, func) {
        bindOperations.push({
            "selector": selector,
            "content": func
        });
    }

    exports.ifOperations = ifOperations;
    exports.bindOperations = bindOperations;
    exports.registerBind = registerBind;
    exports.registerIf = registerIf;
    exports.renderSession = renderSession;
});
