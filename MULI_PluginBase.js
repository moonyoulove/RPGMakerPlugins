// =============================================================================
// MULI_PluginBase.js
// =============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.1.0
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins
 *
 * @help
 * - PluginManager.hasPlugin(name)
 *   Returns true if the named plugin (no extension) is loaded.
 *
 * - PluginManager.alias(aliasClass, methodName)
 *   If the parent class has not implemented the method yet, and another
 *   plugin implements it later, reading the value directly skips it.
 *   This method aliases either itself or the parent class, avoiding that.
 *   Using class syntax has no such issue.
 *
 * - restoreMembers
 *   Keeps member properties in sync across lifecycles: sets defaults when
 *   an object is created, and fills new fields when JsonEx decodes an old save.
 *   Always check with `=== undefined` to avoid overwriting saved data.
 *
 *   Example:
 *   Game_Character.prototype.initMembers = function() {
 *       MULI.MiniMap.alias["Game_Character.prototype.initMembers"].call(this);
 *       this._miniMapDirection = 0; // Do not add new properties here
 *       this.restoreMembers();      // Put them in restoreMembers instead
 *   };
 *   Game_Character.prototype.restoreMembers = function() {
 *       // Check for undefined first to avoid overwriting saved values
 *       if (this._miniMapDirection === undefined) this._miniMapDirection = 0;
 *   };
 *
 * @param autoCheckDeps
 * @text Auto Check Deps (MV only)
 * @desc Run plugin dependency/order check on boot? Lets MV use MZ's dependency tags.
 * @type boolean
 * @on ON
 * @off OFF
 * @default false
 */

/*:zh_TW
 * @target MV MZ
 * @plugindesc v1.1.0
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins
 *
 * @help
 * - PluginManager.hasPlugin(name)
 *   回傳指定插件（不含副檔名）是否已載入。
 *
 * - PluginManager.alias(aliasClass, methodName)
 *   若 alias 當下父類別尚未實作該方法，而別的插件後來才補上實作，直接取值會跳過它；
 *   本方法會自動判斷要 alias 自身或父類別，避免此問題。
 *   使用 class 語法糖則無此問題。
 *
 * - restoreMembers
 *   跨生命週期的成員屬性同步與補丁：建立物件時提供預設值，
 *   JsonEx 解碼舊存檔時補齊新增欄位。
 *   實作時須用 `=== undefined` 判斷，避免覆蓋存檔資料。
 *
 *   範例：
 *   Game_Character.prototype.initMembers = function() {
 *       MULI.MiniMap.alias["Game_Character.prototype.initMembers"].call(this);
 *       this._miniMapDirection = 0; // 任何新增的屬性不要寫在這
 *       this.restoreMembers();      // 而是放到 restoreMembers 裡
 *   };
 *   Game_Character.prototype.restoreMembers = function() {
 *       // 先判斷是否為 undefined，避免覆蓋存檔中已有的值
 *       if (this._miniMapDirection === undefined) this._miniMapDirection = 0;
 *   };
 *
 * @param autoCheckDeps
 * @text 自動檢查依賴（僅 MV）
 * @desc 是否在啟動時檢查插件依賴與順序？此功能讓 MV 也能使用 MZ 的依賴標籤。
 * @type boolean
 * @on 開啟
 * @off 關閉
 * @default false
 */

/** @type {MULI} */
var MULI = MULI || {};
MULI.PluginBase = class {};
MULI.PluginBase.pluginName = "MULI_PluginBase";
MULI.PluginBase.alias = {};
MULI.PluginBase.parameters = PluginManager.parameters(MULI.PluginBase.pluginName);
MULI.PluginBase.autoCheckDeps = MULI.PluginBase.parameters["autoCheckDeps"] === "true";

/**
 * Check whether a plugin is currently loaded.
 *
 * @param {string} name - The name of the plugin without file extension.
 * @returns {boolean} True if the plugin is loaded.
 */
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
            if (superClass && superClass[methodName]) {
                return superClass[methodName].apply(this, args);
            }
        };
        return superMethod;
    }
};

/**
 * Extract all values of a given tag from a plugin's config block.
 *
 * @param {string} config - The leading comment block of the plugin file.
 * @param {string} tag - Tag name without "@", e.g. "base" or "orderAfter".
 * @returns {string[]} Trimmed tag values; empty array if none found.
 */
PluginManager.getTagValues = function(config, tag) {
    const re = new RegExp(`(?<=@${tag}[ \\t]+)[^\\n\\r@]+`, "g");
    const matches = config.match(re);
    if (matches) {
        return matches.map((value) => value.trim());
    }
    return [];
};

/**
 * Check plugin dependencies.
 *
 * Lets MV use MZ-style tags as well:
 * @base        Must be loaded after the specified plugin (error if missing, no extension).
 * @orderAfter  Should be loaded after the specified plugin.
 * @orderBefore Should be loaded before the specified plugin.
 *
 * Only reads plugin files and compares order in an NW.js environment.
 * Reports via console.error and never stops the game.
 */
PluginManager.checkDependencies = function() {
    if (Utils.isNwjs()) {
        const fs = nw.require("fs");
        const startPattern = "\u002f\u002a\u003a";
        const endPattern = "\u002a\u002f";
        for (const [i, name] of this._scripts.entries()) {
            const path = this._path + name + ".js";
            /** @type {string} */
            let script;
            try {
                script = fs.readFileSync(path, "utf-8");
            } catch (e) {
                console.warn(`[CheckDeps] Cannot read "${name}.js", skipped.`, e);
                continue;
            }
            const start = script.indexOf(startPattern);
            const end = script.indexOf(endPattern, start);
            if (start === -1 || end === -1) {
                continue;
            }
            const configBlock = script.slice(start, end + endPattern.length);
            const basePlugins = this.getTagValues(configBlock, "base");
            const orderAfterPlugins = this.getTagValues(configBlock, "orderAfter");
            const orderBeforePlugins = this.getTagValues(configBlock, "orderBefore");

            basePlugins.forEach((basePlugin) => {
                if (!this._scripts.includes(basePlugin)) {
                    console.error(`Plugin ${name} depends on ${basePlugin}.`);
                }
            });
            orderAfterPlugins.forEach((orderAfterPlugin) => {
                if (this._scripts.slice(i).includes(orderAfterPlugin)) {
                    console.error(`Plugin ${name} must be loaded after ${orderAfterPlugin}.`);
                }
            });
            orderBeforePlugins.forEach((orderBeforePlugin) => {
                if (this._scripts.slice(0, i + 1).includes(orderBeforePlugin)) {
                    console.error(`Plugin ${name} must be loaded before ${orderBeforePlugin}.`);
                }
            });
        }
    } else {
        console.log("Not in an NW.js environment. Plugin dependency check is unavailable.");
    }
};

MULI.PluginBase.alias["Scene_Boot.prototype.start"] = PluginManager.alias(Scene_Boot.prototype, "start");
Scene_Boot.prototype.start = function() {
    MULI.PluginBase.alias["Scene_Boot.prototype.start"].call(this);
    if (MULI.PluginBase.autoCheckDeps && Utils.RPGMAKER_NAME === "MV" && Utils.isOptionValid("test")) {
        PluginManager.checkDependencies();
    }
};

MULI.PluginBase.alias["JsonEx._decode"] = PluginManager.alias(JsonEx, "_decode");
JsonEx._decode = function(value, circular, registry) {
    value = MULI.PluginBase.alias["JsonEx._decode"].call(this, value, circular, registry);
    if (value && value["@"] && typeof value.restoreMembers === "function") {
        // Hook for repairing old saves missing new-version properties
        value.restoreMembers();
    }
    return value;
};
