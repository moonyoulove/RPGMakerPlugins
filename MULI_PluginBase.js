//=============================================================================
// MULI_PluginBase.js
// =============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.0
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins
 *
 * @help
 *
 */

var MULI = MULI || {};
MULI.PluginBase = class {};
MULI.PluginBase.pluginName = "MULI_PluginBase";
MULI.PluginBase.alias = {};
MULI.PluginBase.parameters = PluginManager.parameters(MULI.PluginBase.pluginName);

PluginManager.hasPlugin = function(name) {
    return this._scripts.includes(name);
};

/**
 * Automatically choose whether to alias itself or the parent class.
 *
 * @param {Object} aliasClass - Use "Foo.prototype" for instance methods and "Foo" for static methods.
 * @param {string} methodName - The name of the method to alias.
 * @returns {Function} - The aliased method, callable with "call" or "apply".
 */
PluginManager.alias = function(aliasClass, methodName) {
    if (aliasClass.hasOwnProperty(methodName)) {
        return aliasClass[methodName];
    } else {
        const superClass = Object.getPrototypeOf(aliasClass);
        const superMethod = function(...args) {
            return superClass[methodName].apply(this, args);
        };
        return superMethod;
    }
};