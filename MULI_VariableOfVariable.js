//=============================================================================
// MULI_VariableOfVariable.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc 實現像RM2K3以變數：[第N編號的變數]來操作的功能
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins
 *
 * @help
 * ==插件命令==
 * SetVarConvertMode true true // 參數1代表是否要轉換操作的變數，參數2代表
 * 是否要轉換數值的變數。
 * 此命令用在"控制變數"或"控制開關"之前，來模擬RM2K3的功能，執行這兩種指令後會
 * 清除mode，再次使用還得呼叫命令。
 * 另外，控制開關事件選擇的雖然是開關，但代表的是變數，如果開關數量小於變數導致選
 * 擇不到所需的變數，可以將開關範圍設置為兩個相同的編號，或者直接擴充開關的數量。
 * 
 * @command SetVarConvertMode
 * @text 設置變數轉換模式
 * @desc 控制開關和控制變數前，設置是否以"第N編號的變數"為編號來選擇變數
 *
 * @arg convertControlled
 * @text 轉換操作的變數
 * @desc 以"第N編號的變數"為編號來選擇要操作的變數
 * @default false
 * @type boolean
 * 
 * @arg convertValue
 * @text 轉換數值的變數
 * @desc 以"第N編號的變數"為編號來選擇要賦予的數值
 * @default false
 * @type boolean
 * 
 * @param 
 * @text 
 * @desc 
 * @default
 * @type string
 * 
 * @base_
 * @orderAfter
 * @orderBefore
 *
 * @requiredAssets
 *
 * @noteParam
 * @noteRequire 1
 * @noteDir
 * @noteType file
 * @noteData
 */

/*~struct~:
 * @param
 * @text
 * @desc
 * @default
 * @type string
 */

var MULI = MULI || {};
MULI.Variable2 = class {};
MULI.Variable2.pluginName = "MULI_VariableOfVariable";
MULI.Variable2.parameters = PluginManager.parameters(MULI.Variable2.pluginName);
MULI.Variable2.commands = {
    setVarConvertMode(convertControlled, convertValue) {
        this._convertControlledVariable = convertControlled;
        this._convertValueVariable = convertValue;
    }
};

(() => {
    if (Utils.RPGMAKER_NAME !== "MV") {
        PluginManager.registerCommand(MULI.Variable2.pluginName, "SetVarConvertMode", function(args) {
            MULI.Variable2.commands.setVarConvertMode.call(this, args.convertControlled === "true", args.convertValue === "true");
        });
    }

    const _Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
    Game_Interpreter.prototype.initialize = function(depth) {
        _Game_Interpreter_initialize.call(this, depth);
        this._originalParams = [];
        this._convertControlledVariable = false;
        this._convertValueVariable = false;
    };

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "SetVarConvertMode") {
            MULI.Variable2.commands.setVarConvertMode.call(this, args[0] === "true", args[1] === "true");
        }
    };

    // Control Switches
    const _Game_Interpreter_command121 = Game_Interpreter.prototype.command121;
    Game_Interpreter.prototype.command121 = function(params) {
        // @rmmz
        params = params || this._params;
        this.convertVariableParams(params, [0, 1], []);
        _Game_Interpreter_command121.call(this, params);
        this.restoreParameters(params);
        return true;
    };

    // Control Variables
    const _Game_Interpreter_command122 = Game_Interpreter.prototype.command122;
    Game_Interpreter.prototype.command122 = function(params) {
        // @rmmz
        params = params || this._params;
        this.convertVariableParams(params, [0, 1], params[3] === 1 ? [4] : []);
        _Game_Interpreter_command122.call(this, params);
        this.restoreParameters(params);
        return true;
    };

    Game_Interpreter.prototype.convertVariableParams = function(params, controlledVarIds, valueVarIds) {
        if (this._convertControlledVariable || this._convertValueVariable) {
            this._originalParams = JSON.parse(JSON.stringify(params));
            if (this._convertControlledVariable) {
                controlledVarIds.forEach(id => params[id] = $gameVariables.value(params[id]));
                this._convertControlledVariable = false;
            }
            if (this._convertValueVariable) {
                valueVarIds.forEach(id => params[id] = $gameVariables.value(params[id]));
                this._convertValueVariable = false;
            }
        }
    };

    Game_Interpreter.prototype.restoreParameters = function(params) {
        if (this._originalParams.length > 0) {
            params.splice(0, params.length, this._originalParams);
            this._originalParams = [];
        }
    };
})();