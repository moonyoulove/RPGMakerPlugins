// -----===================================================================-----
// MULI_WindowTextField.js
// -----===================================================================-----

/*:zh_TW
 * @target MV MZ
 * @plugindesc v1.4.0 仿原生文字框輸入，運用透明<input>
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins/blob/main/MULI_WindowTextField.js
 *
 * @help
 * 插件命令:
 * TextField input 5 1 true true // 參數依序為最大字數、變量ID、
 * 允許空白和允許取消，變量的內容會做為預設文字。
 *
 * 名稱輸入處理指令，會判斷最近一次的輸入操作是鼠標鍵盤還是搖桿，
 * 來啟用與禁用鍵盤輸入，原本的字符表也會隨之禁用或啟用。
 *
 * @command input
 * @text 輸入文字
 * @desc
 *
 * @arg maxLength
 * @text 最大長度
 * @desc
 * @default -1
 * @type number
 * @min -1
 *
 * @arg variableId
 * @text 變量ID
 * @desc
 * @default 0
 * @type number
 * @min 0
 *
 * @arg allowEmpty
 * @text 允許留空
 * @desc
 * @default false
 * @type boolean
 *
 * @arg allowCancel
 * @text 允許取消
 * @desc
 * @default false
 * @type boolean
 *
 * @param window
 * @text -----視窗-----
 *
 * @param defaultWidth
 * @parent window
 * @text 預設寬度
 * @desc 沒有設最大字數時的預設寬度
 * @default 480
 * @type number
 *
 * @param minWidth
 * @parent window
 * @text 最小寬度
 * @desc 設有最大字數時自動適應的最小寬度，0=無限制
 * @default 240
 * @type number
 * @min 0
 *
 * @param maxWidth
 * @parent window
 * @text 最大寬度
 * @desc 設有最大字數時自動適應的最大寬度，0=遊戲寬度
 * @default 0
 * @type number
 * @min 0
 *
 * @param windowHeight
 * @parent window
 * @text 視窗高度
 * @desc 0=自動適應一個行高
 * @default 0
 * @type number
 * @min 0
 *
 * @param textField
 * @text -----文字框-----
 *
 * @param textFieldY
 * @parent textField
 * @text 文字框y座標
 * @desc 視窗內文字框的位置，對齊為"none"時才有效
 * @default 0
 * @type number
 *
 * @param textFieldAlign
 * @parent textField
 * @text 文字框y座標對齊
 * @desc
 * @default center
 * @type select
 * @option 靠上
 * @value top
 * @option 置中
 * @value center
 * @option 靠下
 * @value bottom
 * @option 無
 * @value none
 *
 * @param button
 * @text -----按鈕-----
 *
 * @param buttonImage
 * @parent button
 * @text 按鈕圖片
 * @desc MV可以使用TextFieldButton.png，MZ可以留空使用預設圖片
 * @default TextFieldButton
 * @type file
 * @dir img/system
 * @require 1
 *
 * @param buttonHeight
 * @parent button
 * @text 按鈕高度
 * @desc
 * @default 48
 * @type number
 * @min 1
 *
 * @param buttonAlign
 * @parent button
 * @text 按鈕水平對齊
 * @desc 相對於視窗的位置
 * @default center
 * @type select
 * @option 靠左
 * @value left
 * @option 置中
 * @value center
 * @option 靠右
 * @value  right
 *
 * @param buttonCancel
 * @parent button
 * @text -----取消按鈕-----
 *
 * @param buttonCancelX
 * @parent buttonCancel
 * @text 取消按鈕在圖片裡的X座標
 * @desc
 * @default 0
 * @type number
 *
 * @param buttonCancelWidth
 * @parent buttonCancel
 * @text 取消按鈕的寬度
 * @desc
 * @default 96
 * @type number
 * @min 1
 *
 * @param buttonOk
 * @parent button
 * @text -----確認按鈕-----
 *
 * @param buttonOkX
 * @parent buttonOk
 * @text 確認按鈕在圖片裡的X座標
 * @desc
 * @default 96
 * @type number
 *
 * @param buttonOkWidth
 * @parent buttonOk
 * @text 確認按鈕的寬度
 * @desc
 * @default 96
 * @type number
 * @min 1
 *
 * @param text
 * @text -----文字-----
 *
 * @param selectionColor
 * @parent text
 * @text 反白顏色
 * @desc 留空則自動檢測視窗指標的圖片顏色
 * @default
 * @type string
 *
 * @param textAlign
 * @parent text
 * @text 文字水平對齊
 * @desc 文字框內文字水平對齊
 * @default left
 * @type select
 * @option 靠左
 * @value left
 * @option 置中
 * @value center
 * @option 靠右
 * @value  right
 * 
 * @base MULI_PluginBase
 * @orderAfter MULI_PluginBase
 */

/*:zh_CN
 * @target MV MZ
 * @plugindesc 仿原生文字框输入，运用透明<input>
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins/blob/main/MULI_WindowTextField.js
 *
 * @help
 * 插件命令:
 * TextField input 5 1 true true // 参数依序为最大字数、变量ID、
 * 允许空白和允许取消，变量的内容会做为预设文字。
 *
 * 名称输入处理指令，会判断最近一次的输入操作是鼠标键盘还是摇杆，
 * 来启用与禁用键盘输入，原本的字符表也会随之禁用或启用。
 *
 * @command input
 * @text 输入文字
 * @desc
 *
 * @arg maxLength
 * @text 最大长度
 * @desc
 * @default -1
 * @type number
 * @min -1
 *
 * @arg variableId
 * @text 变量ID
 * @desc
 * @default 0
 * @type number
 * @min 0
 *
 * @arg allowEmpty
 * @text 允许留空
 * @desc
 * @default false
 * @type boolean
 *
 * @arg allowCancel
 * @text 允许取消
 * @desc
 * @default false
 * @type boolean
 *
 * @param window
 * @text -----视窗-----
 *
 * @param defaultWidth
 * @parent window
 * @text 预设宽度
 * @desc 没有设最大字数时的预设宽度
 * @default 480
 * @type number
 *
 * @param minWidth
 * @parent window
 * @text 最小宽度
 * @desc 设有最大字数时自动适应的最小宽度，0=无限制
 * @default 240
 * @type number
 * @min 0
 *
 * @param maxWidth
 * @parent window
 * @text 最大宽度
 * @desc 设有最大字数时自动适应的最大宽度，0=游戏宽度
 * @default 0
 * @type number
 * @min 0
 *
 * @param windowHeight
 * @parent window
 * @text 视窗高度
 * @desc 0=自动适应一个行高
 * @default 0
 * @type number
 * @min 0
 *
 * @param textField
 * @text -----文字框-----
 *
 * @param textFieldY
 * @parent textField
 * @text 文字框y座标
 * @desc 视窗内文字框的位置，对齐为"none"时才有效
 * @default 0
 * @type number
 *
 * @param textFieldAlign
 * @parent textField
 * @text 文字框y座标对齐
 * @desc
 * @default center
 * @type select
 * @option 靠上
 * @value top
 * @option 置中
 * @value center
 * @option 靠下
 * @value bottom
 * @option 无
 * @value none
 *
 * @param button
 * @text -----按钮-----
 *
 * @param buttonImage
 * @parent button
 * @text 按钮图片
 * @desc MV可以使用TextFieldButton.png，MZ可以留空使用预设图片
 * @default TextFieldButton
 * @type file
 * @dir img/system
 * @require 1
 *
 * @param buttonHeight
 * @parent button
 * @text 按钮高度
 * @desc
 * @default 48
 * @type number
 * @min 1
 *
 * @param buttonAlign
 * @parent button
 * @text 按钮水平对齐
 * @desc 相对于视窗的位置
 * @default center
 * @type select
 * @option 靠左
 * @value left
 * @option 置中
 * @value center
 * @option 靠右
 * @value  right
 *
 * @param buttonCancel
 * @parent button
 * @text -----取消按钮-----
 *
 * @param buttonCancelX
 * @parent buttonCancel
 * @text 取消按钮在图片里的X座标
 * @desc
 * @default 0
 * @type number
 *
 * @param buttonCancelWidth
 * @parent buttonCancel
 * @text 取消按钮的宽度
 * @desc
 * @default 96
 * @type number
 * @min 1
 *
 * @param buttonOk
 * @parent button
 * @text -----确认按钮-----
 *
 * @param buttonOkX
 * @parent buttonOk
 * @text 确认按钮在图片里的X座标
 * @desc
 * @default 96
 * @type number
 *
 * @param buttonOkWidth
 * @parent buttonOk
 * @text 确认按钮的宽度
 * @desc
 * @default 96
 * @type number
 * @min 1
 *
 * @param text
 * @text -----文字-----
 *
 * @param selectionColor
 * @parent text
 * @text 反白颜色
 * @desc 留空则自动检测视窗指标的图片颜色
 * @default
 * @type string
 *
 * @param textAlign
 * @parent text
 * @text 文字水平对齐
 * @desc 文字框内文字水平对齐
 * @default left
 * @type select
 * @option 靠左
 * @value left
 * @option 置中
 * @value center
 * @option 靠右
 * @value  right
 * 
 * @base MULI_PluginBase
 * @orderAfter MULI_PluginBase
 */

/*:en-US
 * @target MV MZ
 * @plugindesc v1.4.0 Imitate native textbox input, apply transparency<input>
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins/blob/main/MULI_WindowTextField.js
 *
 * @help
 * Plugin Commands.
 * TextField input 5 1 true true // Parameters are maximum number of characters, variable ID in order,
 * Allow Blank and Allow Cancel. The content of the variable is used as the default text.
 *
 * The name input processing command determines whether the most recent input operation was with the mouse keyboard or joystick.
 * The name input processing command will determine whether the most recent input operation was with the mouse keyboard or joystick to enable or disable keyboard input, and the original character table will be disabled or enabled as well.
 *
 * @command input
 * @text Input Text
 * @desc
 *
 * @arg maxLength
 * @text Maximum Length
 * @desc
 * @default -1
 * @type number
 * @min -1
 *
 * @arg variableId
 * @text Variable ID
 * @desc
 * @default 0
 * @type number
 * @min 0
 *
 * @arg allowEmpty
 * @text Leave blank
 * @desc
 * @default false
 * @type boolean
 *
 * @arg allowCancel
 * @text Allow Cancel
 * @desc
 * @default false
 * @type boolean
 *
 * @param window
 * @text ----- window -----
 *
 * @param defaultWidth
 * @parent window
 * @text Default Width
 * @desc Default width when no maximum number of characters is set.
 * @default 480
 * @type number
 *
 * @param minWidth
 * @parent window
 * @text Minimum width
 * @desc Minimum width that automatically adapts when there is a maximum number of characters, 0=unlimited
 * @default 240
 * @type number
 * @min 0
 *
 * @param maxWidth
 * @parent window
 * @text Maximum width
 * @desc Maximum width that automatically adapts when the maximum number of characters is set, 0=game width
 * @default 0
 * @type number
 * @min 0
 *
 * @param windowHeight
 * @parent window
 * @text Window Height
 * @desc 0=Automatically adapts to a line height
 * @default 0
 * @type number
 * @min 0
 *
 * @param textField
 * @text ----- Textbox -----
 *
 * @param textFieldY
 * @parent textField
 * @text Textbox y-coordinate
 * @desc Position of the textbox in the window, valid when alignment is "none".
 * @default 0
 * @type number
 *
 * @param textFieldAlign
 * @parent textField
 * @text Textbox y-coordinate alignment
 * @desc
 * @default center
 * @type select
 * @option Up
 * @value top
 * @option Center
 * @value center
 * @option Down
 * @value bottom
 * @option None
 * @value none
 *
 * @param button
 * @text ----- button -----
 *
 * @param buttonImage
 * @parent button
 * @text Button Image
 * @desc MV can use TextFieldButton.png, MZ can leave it blank and use the default image.
 * @default TextFieldButton
 * @type file
 * @dir img/system
 * @require 1
 *
 * @param buttonHeight
 * @parent button
 * @text Button Height
 * @desc
 * @default 48
 * @type number
 * @min 1
 *
 * @param buttonAlign
 * @parent button
 * @text Button horizontal alignment
 * @desc Position relative to window
 * @default center
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value  right
 *
 * @param buttonCancel
 * @parent button
 * @text ----- Cancel button -----
 *
 * @param buttonCancelX
 * @parent buttonCancel
 * @text Cancel the X coordinate of the button in the picture.
 * @desc
 * @default 0
 * @type number
 *
 * @param buttonCancelWidth
 * @parent buttonCancel
 * @text Cancel the width of the button
 * @desc
 * @default 96
 * @type number
 * @min 1
 *
 * @param buttonOk
 * @parent button
 * @text ----- Confirm button -----
 *
 * @param buttonOkX
 * @parent buttonOk
 * @text Confirm the X-coordinate of the button in the picture.
 * @desc
 * @default 96
 * @type number
 *
 * @param buttonOkWidth
 * @parent buttonOk
 * @text Confirm the width of the button
 * @desc
 * @default 96
 * @type number
 * @min 1
 *
 * @param text
 * @text ----- text -----
 *
 * @param selectionColor
 * @parent text
 * @text Highlight color
 * @desc Leave blank to automatically detect the image color of the window pointer.
 * @default
 * @type string
 *
 * @param textAlign
 * @parent text
 * @text Text Alignment
 * @desc Horizontal alignment of the text in the text box
 * @default left
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value  right
 * 
 * @base MULI_PluginBase
 * @orderAfter MULI_PluginBase
 */

var MULI = MULI || {};
MULI.TextField = class {};
MULI.TextField.pluginName = "MULI_WindowTextField";
MULI.TextField.parameters = PluginManager.parameters("MULI_WindowTextField");
MULI.TextField.alias = {};
MULI.TextField.commands = {
    input(maxLength, variableId, allowEmpty, allowCancel) {
        $gameMessage.setTextField(maxLength, variableId, allowEmpty, allowCancel);
        this.setWaitMode("message");
    },
};
MULI.TextField.defaultWidth = Number(MULI.TextField.parameters.defaultWidth);
MULI.TextField.minWidth = Number(MULI.TextField.parameters.minWidth);
MULI.TextField.maxWidth = Number(MULI.TextField.parameters.maxWidth);
MULI.TextField.windowHeight = Number(MULI.TextField.parameters.windowHeight);
MULI.TextField.textFieldY = Number(MULI.TextField.parameters.textFieldY);
MULI.TextField.textFieldAlign = MULI.TextField.parameters.textFieldAlign;
MULI.TextField.textAlign = MULI.TextField.parameters.textAlign;
MULI.TextField.selectionColor = MULI.TextField.parameters.selectionColor;
MULI.TextField.buttonImage = MULI.TextField.parameters.buttonImage;
MULI.TextField.buttonHeight = Number(MULI.TextField.parameters.buttonHeight);
MULI.TextField.buttonAlign = MULI.TextField.parameters.buttonAlign;
MULI.TextField.buttonCancelX = Number(MULI.TextField.parameters.buttonCancelX);
MULI.TextField.buttonCancelWidth = Number(MULI.TextField.parameters.buttonCancelWidth);
MULI.TextField.buttonOkX = Number(MULI.TextField.parameters.buttonOkX);
MULI.TextField.buttonOkWidth = Number(MULI.TextField.parameters.buttonOkWidth);

if (Utils.RPGMAKER_NAME === "MV") {
    function Window_StatusBase() {
        this.initialize.apply(this, arguments);
    }

    Window_StatusBase.prototype = Object.create(Window_Selectable.prototype);
    Window_StatusBase.prototype.constructor = Window_StatusBase;

    Window_StatusBase.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    };
}

function Window_TextField() {
    this.initialize.apply(this, arguments);
}

Window_TextField.prototype = Object.create(Window_StatusBase.prototype);
Window_TextField.prototype.constructor = Window_TextField;

Window_TextField.prototype.initialize = function(messageWindow) {
    this._messageWindow = messageWindow;
    const args = Utils.RPGMAKER_NAME === "MV" ? [0, 0, 0, 0] : [new Rectangle()];
    Window_StatusBase.prototype.initialize.apply(this, args);
    this.openness = 0;
    this.createTextField();
    this.createTextFieldButtons();
    this.deactivate();
};

Window_TextField.prototype.start = function() {
    this.setTextFieldMaxLength($gameMessage.textFieldMaxLength());
    this.setTextFieldValue(String($gameVariables.value($gameMessage.textFieldVariableId()) || ""));
    this.updatePlacement();
    this.updateTextFieldButtons(this._messageWindow >= Graphics.boxHeight / 2);
    this.updateTextField();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
};

Window_TextField.prototype.refresh = function() {
    Window_StatusBase.prototype.refresh.call(this);
    if (this._textField) {
        this.drawTextFieldValue();
        this.drawTextFieldLength();
    }
};

Window_TextField.prototype.windowWidth = function() {
    const maxLength = this._textField.maxLength;
    if (maxLength >= 0) {
        const textWidth = this.textWidth("永") * maxLength;
        const lengthWidth = this.textWidth("0") * (maxLength.toString().length * 2 + 1);
        const totalWidth = textWidth + lengthWidth + this.padding * 2;
        return totalWidth.clamp(MULI.TextField.minWidth, MULI.TextField.maxWidth || Graphics.boxWidth);
    } else {
        return MULI.TextField.defaultWidth;
    }
};

Window_TextField.prototype.lineHeight = function() {
    // HACK chrome android 字體:行高=28:36 輸入框指針會看不到
    return 38;
};

Window_TextField.prototype.windowHeight = function() {
    return MULI.TextField.windowHeight || this.fittingHeight(1);
};

Window_TextField.prototype.updatePlacement = function() {
    const messageY = this._messageWindow.y;
    const spacing = 8;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = (Graphics.boxWidth - this.width) / 2;
    if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height - spacing;
    } else {
        this.y = messageY + this._messageWindow.height + spacing;
    }
};

Window_TextField.prototype.isOkEnabled = function() {
    return $gameMessage.textFieldAllowEmpty() ? true : this._textField.value.length > 0;
};

Window_TextField.prototype.isOkTriggered = function() {
    return Input.isTriggered("ok");
};

Window_TextField.prototype.isCancelEnabled = function() {
    return $gameMessage.textFieldAllowCancel();
};

Window_TextField.prototype.onTextFieldOk = function() {
    if (this.isOkEnabled()) {
        this.processOk();
    } else {
        this.playBuzzerSound();
    }
};

Window_TextField.prototype.onTextFieldCancel = function() {
    if (this.isCancelEnabled()) {
        this.processCancel();
    } else {
        this.playBuzzerSound();
    }
};

Window_TextField.prototype.processOk = function() {
    Window_StatusBase.prototype.processOk.call(this);
    $gameVariables.setValue($gameMessage.textFieldVariableId(), this._textField.value);
    this.end();
};

Window_TextField.prototype.processCancel = function() {
    Window_StatusBase.prototype.processCancel.call(this);
    this.end();
};

Window_TextField.prototype.end = function() {
    this.close();
    this._textFieldButtonContainer.hideButtons();
    this._messageWindow.terminateMessage();
};

// @rmmz
Window_TextField.prototype.setMessageWindow = function(messageWindow) {
    this._messageWindow = messageWindow;
};

function Window_NameTextField() {
    this.initialize.apply(this, arguments);
}

Window_NameTextField.prototype = Object.create(Window_NameEdit.prototype);
Window_NameTextField.prototype.constructor = Window_NameTextField;

Window_NameTextField.prototype.initialize = function(...args) {
    // @rmmz mv:[actor, maxLength] mz:[rect]
    Window_NameEdit.prototype.initialize.apply(this, args);
    this._isKeyboardInput = true;
    this._inputWindow = null;
    this.createTextField();
    this.setTextFieldValue(this._name);
    this.setTextFieldMaxLength(this._maxLength);
    this.activate();
    this.createTextFieldButtons();
};

// @rmmz
Window_NameTextField.prototype.setup = function(actor, maxLength) {
    Window_NameEdit.prototype.setup.call(this, actor, maxLength);
    this.updateTextField();
    this.setTextFieldValue(this._name);
    this.setTextFieldMaxLength(this._maxLength);
};

Window_NameTextField.prototype.createTextField = function() {
    Window_NameEdit.prototype.createTextField.call(this);
    this._textField.style.textAlign = "center";
};

Window_NameTextField.prototype.setKeyboardInput = function(value) {
    this._isKeyboardInput = value;
};

Window_NameTextField.prototype._onTextFieldKeyDown = function(event) {
    if (!this._isKeyboardInput) {
        event.preventDefault();
    } else {
        Window_NameEdit.prototype._onTextFieldKeyDown.call(this, event);
    }
};

Window_NameTextField.prototype.lineHeight = function() {
    // HACK chrome android 字體:行高=28:36 輸入框指針會看不到
    return 38;
};

Window_NameTextField.prototype.setInputWindow = function(window) {
    this._inputWindow = window;
};

Window_NameTextField.prototype.onTextFieldOk = function() {
    this._inputWindow.onNameOk();
};

Window_NameTextField.prototype.onTextFieldCancel = function() {
    SoundManager.playBuzzer();
};

Window_NameTextField.prototype.textFieldRect = function() {
    const rect = this.itemRect(0);
    rect.x = this.faceWidth();
    rect.width = this.innerWidth - rect.x;
    return rect;
};

Window_NameTextField.prototype.drawUnderline = function(index) {};

Window_NameTextField.prototype.drawChar = function(index) {};

Window_NameTextField.prototype.refresh = function() {
    Window_NameEdit.prototype.refresh.call(this);
    this.setCursorRect(0, 0, 0, 0);
    if (this._textField) {
        this.drawTextFieldValue();
        this.drawTextFieldLength();
    }
};

Window_NameTextField.prototype._onTextFieldInput = function(event) {
    Window_NameEdit.prototype._onTextFieldInput.call(this, event);
    this._name = this._textField.value;
    this._index = this._name.length;
};

Window_NameTextField.prototype.add = function(ch) {
    const result = Window_NameEdit.prototype.add.call(this, ch);
    if (result) {
        this._textField.value = this._name;
        this.refresh();
    }
    return result;
};

Window_NameTextField.prototype.back = function() {
    const result = Window_NameEdit.prototype.back.call(this);
    if (result) {
        this._textField.value = this._name;
        this.refresh();
    }
    return result;
};

Window_NameTextField.prototype.restoreDefault = function() {
    this.setTextFieldValue(this._defaultName);
    Window_NameEdit.prototype.restoreDefault.call(this);
};

function Scene_NameKeyboard() {
    this.initialize.apply(this, arguments);
}

Scene_NameKeyboard.prototype = Object.create(Scene_Name.prototype);
Scene_NameKeyboard.prototype.constructor = Scene_NameKeyboard;

Scene_NameKeyboard.prototype.createEditWindow = function() {
    // 替換(用proxy避免父類與子類衝突)
    Window_NameEdit = new Proxy(Window_NameEdit, {
        construct(target, args, newTarget) {
            Window_NameEdit = target;
            return new Window_NameTextField(...args);
        },
    });
    Scene_Name.prototype.createEditWindow.call(this);
};

Scene_NameKeyboard.prototype.createInputWindow = function() {
    Scene_Name.prototype.createInputWindow.call(this);
    this._editWindow.setInputWindow(this._inputWindow);
    this._inputWindow.deactivate();
};

Scene_NameKeyboard.prototype.start = function() {
    Scene_Name.prototype.start.call(this);
    this.updateInputType();
};

Scene_NameKeyboard.prototype.update = function() {
    Scene_Name.prototype.update.call(this);
    if (Input.gamepadDate > 0 || Input.keyboardDate > 0) {
        this.updateInputType();
    }
};

Scene_NameKeyboard.prototype.updateInputType = function() {
    const inputType = Input.gamepadDate > Input.keyboardDate ? "gamepad" : "keyboard";
    if (this._lastInputType !== inputType) {
        this._lastInputType = inputType;
        switch (inputType) {
            case "gamepad":
                this._editWindow.setKeyboardInput(false);
                this._inputWindow.activate();
                this._inputWindow.show();
                this._inputWindow.refresh();
                this._editWindow.y = (Graphics.boxHeight - (this._editWindow.height + this._editWindow.fittingHeight(9) + 8)) / 2;
                this._editWindow.updateTextFieldPosition();
                this._editWindow.moveTextFieldCursorToEnd();
                break;
            case "keyboard":
                this._editWindow.setKeyboardInput(true);
                this._inputWindow.deactivate();
                this._inputWindow.hide();
                this._editWindow.y = (Graphics.boxHeight - this._editWindow.height) / 2;
                this._editWindow.updateTextFieldPosition();
                this._editWindow.updateTextFieldButtons();
                break;
        }
    }
};

function TextFieldButtonContainer() {
    this.initialize.apply(this, arguments);
}

TextFieldButtonContainer.prototype = Object.create(Sprite.prototype);
TextFieldButtonContainer.prototype.constructor = TextFieldButtonContainer;

TextFieldButtonContainer.prototype.initialize = function(textFieldWindow) {
    Sprite.prototype.initialize.call(this);
    this._textFieldWindow = textFieldWindow;
};

TextFieldButtonContainer.prototype.buttonY = function(top = false) {
    const spacing = 8;
    if (top) {
        return 0 - this._buttons[0].height - spacing;
    } else {
        return this._textFieldWindow.height + spacing;
    }
};

TextFieldButtonContainer.prototype.updateButtonsVisibility = function() {
    if (Utils.RPGMAKER_NAME === "MV" ? TouchInput.date > Input.date : ConfigManager.touchUI) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

TextFieldButtonContainer.prototype.createButtons = function() {
    const bitmap = MULI.TextField.buttonImage ? ImageManager.loadSystem(MULI.TextField.buttonImage) : null;
    const buttonHeight = MULI.TextField.buttonHeight;
    this._buttons = [];
    for (let i = 0; i < 2; i++) {
        // @rmmz
        const button = new Sprite_Button(["cancel", "ok"][i]);
        if (bitmap) {
            const x = [MULI.TextField.buttonCancelX, MULI.TextField.buttonOkX][i];
            const buttonWidth = [MULI.TextField.buttonCancelWidth, MULI.TextField.buttonOkWidth][i];
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, buttonWidth, buttonHeight);
            button.setHotFrame(x, buttonHeight, buttonWidth, buttonHeight);
            button.updateFrame();
        }
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this._textFieldWindow.onTextFieldCancel.bind(this._textFieldWindow));
    this._buttons[1].setClickHandler(this._textFieldWindow.onTextFieldOk.bind(this._textFieldWindow));
};

TextFieldButtonContainer.prototype.placeButtons = function(top = false) {
    const numButtons = this._buttons.length;
    const spacing = 16;
    let totalWidth = -spacing;
    for (let i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    let x = 0;
    switch (MULI.TextField.buttonAlign) {
        case "left":
            x = 0;
            break;
        case "center":
            x = (this._textFieldWindow.width - totalWidth) / 2;
            break;
        case "right":
            x = this._textFieldWindow.width - totalWidth;
            break;
    }
    for (let j = 0; j < numButtons; j++) {
        const button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY(top);
        x += button.width + spacing;
    }
};

TextFieldButtonContainer.prototype.showButtons = function() {
    for (let i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

TextFieldButtonContainer.prototype.hideButtons = function() {
    for (let i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

(() => {
    if (Utils.RPGMAKER_NAME === "MV") {
        Object.defineProperty(Window.prototype, "innerWidth", {
            get: function() {
                return Math.max(0, this._width - this._padding * 2);
            },
            configurable: true,
        });

        Object.defineProperty(Window.prototype, "innerHeight", {
            get: function() {
                return Math.max(0, this._height - this._padding * 2);
            },
            configurable: true,
        });
    } else {
        PluginManager.registerCommand(MULI.TextField.pluginName, "input", function(args) {
            MULI.TextField.commands.input.call(this, Number(args.maxLength), Number(args.variableId), args.allowEmpty === "true",
                args.allowCancel === "true");
        });

        Window_Base.prototype.canvasToLocalX = function(x) {
            var node = this;
            while (node) {
                x -= node.x;
                node = node.parent;
            }
            return x;
        };

        Window_Base.prototype.canvasToLocalY = function(y) {
            var node = this;
            while (node) {
                y -= node.y;
                node = node.parent;
            }
            return y;
        };

        MULI.TextField.alias["Scene_Message.prototype.createAllWindows"] = PluginManager.alias(Scene_Message.prototype, "createAllWindows");
        Scene_Message.prototype.createAllWindows = function() {
            this.createTextFieldWindow();
            MULI.TextField.alias["Scene_Message.prototype.createAllWindows"].call(this);
        };

        Scene_Message.prototype.createTextFieldWindow = function() {
            this._textFieldWindow = new Window_TextField();
            this.addWindow(this._textFieldWindow);
        };

        MULI.TextField.alias["Scene_Message.prototype.associateWindows"] = PluginManager.alias(Scene_Message.prototype, "associateWindows");
        Scene_Message.prototype.associateWindows = function() {
            MULI.TextField.alias["Scene_Message.prototype.associateWindows"].call(this);
            const messageWindow = this._messageWindow;
            messageWindow.setTextFieldWindow(this._textFieldWindow);
            this._textFieldWindow.setMessageWindow(messageWindow);
        };
    }

    MULI.TextField.alias["Scene_Base.prototype.terminate"] = PluginManager.alias(Scene_Base.prototype, "terminate");
    Scene_Base.prototype.terminate = function() {
        MULI.TextField.alias["Scene_Base.prototype.terminate"].call(this);
        if (this._windowLayer) {
            // @rmmz mz的windowLayer沒有removeChildren
            this._windowLayer.destroy();
        }
    };

    // 要使用文字框時必須
    Window_Base.prototype.createTextField = function() {
        this.on("added", this._onAdded, this);
        this.on("removed", this._onRemoved, this);
        this.createTextFieldElement();
        this.updateTextField();
    };

    Window_Base.prototype.createTextFieldElement = function() {
        this._textField = document.createElement("input");
        this._textField.className = "text-field";
        this._textField.dataset.fontScale = "1";
        this._textField.style.textAlign = MULI.TextField.textAlign;
        // 考慮到只有純鍵盤的狀態，如果輸入框指針跑走會無法輸入
        this._textField.addEventListener("blur", this._onTextFieldLostFocus.bind(this));
        this._textField.addEventListener("keydown", this._onTextFieldKeyDown.bind(this));
        this._textField.addEventListener("input", this._onTextFieldInput.bind(this));
        this._textField.addEventListener("contextmenu", this._onTextFieldRightClick.bind(this));
        this._textField.addEventListener("compositionstart", this._onTextFieldCompositionStart.bind(this));
        this._textField.addEventListener("compositionend", this._onTextFieldCompositionEnd.bind(this));
        this._textField.addEventListener("keyup", this._onTextFieldKeyUp.bind(this));
        this._textField.addEventListener("touchstart", (event) => event.stopPropagation());
    };

    Window_Base.prototype._onAdded = function() {
        document.body.appendChild(this._textField);
        Graphics.addTextFieldWindow(this);
        if (this.active) {
            this._textField.focus();
        }
        this.updateTextFieldPosition();
    };

    Window_Base.prototype._onRemoved = function() {
        this._textField.disabled = true;
        document.body.removeChild(this._textField);
        Graphics.deleteTextFieldWindow(this);
    };

    Window_Base.prototype._onTextFieldLostFocus = function(event) {
        this._textField.focus();
    };

    Window_Base.prototype._onTextFieldKeyDown = function(event) {
        if (!event.code.match(/F\d+/)) {
            event.stopPropagation();
        }
        if (event.repeat) {
            this._textField.dataset.repeated = "true";
        } else {
            this._textField.dataset.composed = "false";
        }
    };

    Window_Base.prototype._onTextFieldCompositionStart = function(event) {
        // override
    };

    Window_Base.prototype._onTextFieldCompositionEnd = function(event) {
        this._textField.dataset.composed = "true";
    };

    Window_Base.prototype._onTextFieldKeyUp = function(event) {
        const dataset = this._textField.dataset;
        if (this.active && dataset.repeated !== "true" && dataset.composed !== "true") {
            // event.code cannot support virtual keyboard
            switch (event.key) {
                case "Enter":
                    this.onTextFieldOk();
                    break;
                case "Escape":
                    this.onTextFieldCancel();
                    break;
            }
        }
        dataset.repeated = "false";
    };

    Window_Base.prototype.onTextFieldOk = function() {
        // override
    };

    Window_Base.prototype.onTextFieldCancel = function() {
        // override
    };

    Window_Base.prototype._onTextFieldRightClick = function(event) {
        event.preventDefault();
    };

    Window_Base.prototype.updateTextField = function() {
        this.updateTextFieldPosition();
        const rect = this.textFieldRect();
        this._textField.style.width = Graphics.unit(rect.width);
        this._textField.style.height = Graphics.unit(rect.height);
        this._textField.style.caretColor = this.contents.textColor;
        this._textField.style.fontFamily = this.contents.fontFace;
        this.updateTextFieldFontSize();
        const color = MULI.TextField.selectionColor || this.textFieldSelectionColor();
        this._textField.style.setProperty("--textField-selection-color", color);
    };

    Window_Base.prototype.textFieldSelectionColor = function() {
        return this.windowskin.getPixel(120, 120) + this.windowskin.getAlphaPixel(120, 120).toString(16).padZero(2);
    };

    Window_Base.prototype._onTextFieldInput = function(event) {
        const width = this.textWidth(this._textField.value);
        const maxWidth = this.textFieldRect().width;
        this._textField.dataset.fontScale = String(width > maxWidth ? maxWidth / width : 1);
        this.updateTextFieldFontSize();
        this.refresh();
    };

    Window_Base.prototype.updateTextFieldFontSize = function() {
        this._textField.style.fontSize = Graphics.unit(this.contents.fontSize * Number(this._textField.dataset.fontScale));
    };

    MULI.TextField.alias["Window_Base.prototype.move"] = PluginManager.alias(Window_Base.prototype, "move");
    Window_Base.prototype.move = function(x, y, width, height) {
        width = width || this._width;
        height = height || this._height;
        let needsUpdate = false;
        if (this.x !== x || this.y !== y && this._width === width && this._height === height) {
            needsUpdate = true;
        }
        MULI.TextField.alias["Window_Base.prototype.move"].call(this, x, y, width, height);
        if (needsUpdate) {
            this.updateTextFieldPosition();
        }
    };

    MULI.TextField.alias["Window_Base.prototype._refreshAllPart"] = PluginManager.alias(Window_Base.prototype, "_refreshAllPart");
    Window_Base.prototype._refreshAllPart = function() {
        MULI.TextField.alias["Window_Base.prototype._refreshAllPart"].call(this);
        this.updateElement();
    };

    Window_Base.prototype.updateTextFieldPosition = function() {
        if (this._textField) {
            const rect = this.textFieldRect();
            this._textField.style.left = Graphics.unit(
                this.padding + rect.x - this.canvasToLocalX(Graphics.pageToCanvasX(0)),
            );
            this._textField.style.top = Graphics.unit(this.padding + rect.y - this.canvasToLocalY(Graphics.pageToCanvasY(0)));
        }
    };

    Window_Base.prototype.updateTextFieldVisibility = function() {
        if (this._textField) {
            this._textField.style.visibility = (this.visible && (this.isOpen() || this.isOpening()) && !this.isClosing()) ? "visible" : "hidden";
        }
    };

    Window_Base.prototype.hideTextField = function() {
        this._textField.style.visibility = "hidden";
    };

    MULI.TextField.alias["Window_Base.prototype.open"] = PluginManager.alias(Window_Base.prototype, "open");
    Window_Base.prototype.open = function() {
        MULI.TextField.alias["Window_Base.prototype.open"].call(this);
        this.updateTextFieldVisibility();
    };

    MULI.TextField.alias["Window_Base.prototype.close"] = PluginManager.alias(Window_Base.prototype, "close");
    Window_Base.prototype.close = function() {
        MULI.TextField.alias["Window_Base.prototype.close"].call(this);
        this.updateTextFieldVisibility();
    };

    MULI.TextField.alias["Window_Base.prototype.show"] = PluginManager.alias(Window_Base.prototype, "show");
    Window_Base.prototype.show = function() {
        MULI.TextField.alias["Window_Base.prototype.show"].call(this);
        this.updateTextFieldVisibility();
    };

    MULI.TextField.alias["Window_Base.prototype.hide"] = PluginManager.alias(Window_Base.prototype, "hide");
    Window_Base.prototype.hide = function() {
        MULI.TextField.alias["Window_Base.prototype.hide"].call(this);
        this.updateTextFieldVisibility();
    };

    MULI.TextField.alias["Window_Base.prototype.activate"] = PluginManager.alias(Window_Base.prototype, "activate");
    Window_Base.prototype.activate = function() {
        MULI.TextField.alias["Window_Base.prototype.activate"].call(this);
        if (this._textField) {
            this._textField.setSelectionRange(-1, -1);
            this._textField.disabled = false;
            this._textField.focus();
            this._textField.dataset.repeated = String(Input.isPressed("ok"));
        }
    };

    MULI.TextField.alias["Window_Base.prototype.deactivate"] = PluginManager.alias(Window_Base.prototype, "deactivate");
    Window_Base.prototype.deactivate = function() {
        MULI.TextField.alias["Window_Base.prototype.deactivate"].call(this);
        if (this._textField) {
            this._textField.setSelectionRange(-1, -1);
            this._textField.disabled = true;
            this._textField.blur();
        }
    };

    Window_Base.prototype.moveTextFieldCursorToEnd = function() {
        this._textField.setSelectionRange(-1, -1);
    };

    Window_Base.prototype.textFieldRect = function() {
        const x = 0;
        const height = this.lineHeight();
        let y = 0;
        switch (MULI.TextField.textFieldAlign) {
            case "top":
                y = 0;
                break;
            case "center":
                y = (this.innerHeight - height) / 2;
                break;
            case "bottom":
                y = this.innerHeight - height;
                break;
            case "none":
                y = MULI.TextField.textFieldY;
                break;
        }
        const width = this.innerWidth;
        return new Rectangle(x, y, width, height);
    };

    Window_Base.prototype.setTextFieldMaxLength = function(length) {
        if (length >= 0) {
            this._textField.maxLength = length;
        } else {
            this._textField.removeAttribute("maxLength");
        }
    };

    Window_Base.prototype.setTextFieldValue = function(value) {
        this._textField.value = value;
    };

    Window_Base.prototype.drawTextFieldValue = function() {
        const temp = this.contents.fontSize;
        this.contents.fontSize *= Number(this._textField.dataset.fontScale);
        const { x, y, width } = this.textFieldRect();
        this.drawText(this._textField.value, x, y, width, this._textField.style.textAlign);
        this.contents.fontSize = temp;
    };

    Window_Base.prototype.drawTextFieldLength = function() {
        if (this._textField.maxLength > 0) {
            const text = this._textField.value.length + "/" + this._textField.maxLength;
            const x = 0;
            const y = this.innerHeight - this.lineHeight();
            const width = this.innerWidth;
            this.drawText(text, x, y, width, "right");
        }
    };

    Window_Base.prototype.createTextFieldButtons = function() {
        this._textFieldButtonContainer = new TextFieldButtonContainer(this);
        this.addChild(this._textFieldButtonContainer);
        this._textFieldButtonContainer.createButtons();
    };

    Window_Base.prototype.updateTextFieldButtons = function(top) {
        this._textFieldButtonContainer.placeButtons(top);
        this._textFieldButtonContainer.updateButtonsVisibility();
    };

    MULI.TextField.alias["Window_NameInput.prototype.refresh"] = PluginManager.alias(Window_NameInput.prototype, "refresh");
    Window_NameInput.prototype.refresh = function() {
        this.changePaintOpacity(this.active);
        MULI.TextField.alias["Window_NameInput.prototype.refresh"].call(this);
        this.changePaintOpacity(true);
    };

    MULI.TextField.alias["Window_Message.prototype.isAnySubWindowActive"] = PluginManager.alias(Window_Message.prototype, "isAnySubWindowActive");
    Window_Message.prototype.isAnySubWindowActive = function() {
        return this._textFieldWindow.active || MULI.TextField.alias["Window_Message.prototype.isAnySubWindowActive"].call(this);
    };

    MULI.TextField.alias["Window_Message.prototype.startInput"] = PluginManager.alias(Window_Message.prototype, "startInput");
    Window_Message.prototype.startInput = function() {
        if (MULI.TextField.alias["Window_Message.prototype.startInput"].call(this)) {
            return true;
        } else if ($gameMessage.isTextField()) {
            this._textFieldWindow.start();
            return true;
        } else {
            return false;
        }
    };

    MULI.TextField.alias["Window_Message.prototype.subWindows"] = PluginManager.alias(Window_Message.prototype, "subWindows");
    Window_Message.prototype.subWindows = function() {
        return MULI.TextField.alias["Window_Message.prototype.subWindows"].call(this).concat([this._textFieldWindow]);
    };

    MULI.TextField.alias["Window_Message.prototype.createSubWindows"] = PluginManager.alias(Window_Message.prototype, "createSubWindows");
    Window_Message.prototype.createSubWindows = function() {
        MULI.TextField.alias["Window_Message.prototype.createSubWindows"].call(this);
        this._textFieldWindow = new Window_TextField(this);
    };

    // @rmmz
    Window_Message.prototype.setTextFieldWindow = function(textFieldWindow) {
        this._textFieldWindow = textFieldWindow;
    };

    MULI.TextField.alias["Game_Message.prototype.clear"] = PluginManager.alias(Game_Message.prototype, "clear");
    Game_Message.prototype.clear = function() {
        MULI.TextField.alias["Game_Message.prototype.clear"].call(this);
        this._textFieldMaxLength = -1;
        this._textFieldVariableId = 0;
        this._textFieldAllowEmpty = false;
        this._textFieldAllowCancel = false;
    };

    Game_Message.prototype.textFieldMaxLength = function() {
        return this._textFieldMaxLength;
    };

    Game_Message.prototype.textFieldVariableId = function() {
        return this._textFieldVariableId;
    };

    Game_Message.prototype.textFieldAllowEmpty = function() {
        return this._textFieldAllowEmpty;
    };

    Game_Message.prototype.textFieldAllowCancel = function() {
        return this._textFieldAllowCancel;
    };

    Game_Message.prototype.setTextField = function(maxLength, variableId, allowEmpty, allowCancel) {
        this._textFieldMaxLength = maxLength;
        this._textFieldVariableId = variableId;
        this._textFieldAllowEmpty = allowEmpty;
        this._textFieldAllowCancel = allowCancel;
    };

    Game_Message.prototype.isTextField = function() {
        return this._textFieldVariableId > 0;
    };

    MULI.TextField.alias["Game_Message.prototype.isBusy"] = PluginManager.alias(Game_Message.prototype, "isBusy");
    Game_Message.prototype.isBusy = function() {
        
        return this.isTextField() || MULI.TextField.alias["Game_Message.prototype.isBusy"].call(this);
    };

    // Show Text
    MULI.TextField.alias["Game_Interpreter.prototype.command101"] = PluginManager.alias(Game_Interpreter.prototype, "command101");
    Game_Interpreter.prototype.command101 = function(params) {
        const isBusy = $gameMessage.isBusy();
        const result = MULI.TextField.alias["Game_Interpreter.prototype.command101"].call(this, params);
        if (!isBusy) {
            const nextCommand = this._list[this._index];
            if (nextCommand && nextCommand.code === 356) {
                const args = nextCommand.parameters[0].split(" ");
                if (args[0] === "TextField" && args[1] === "input") {
                    this._index++;
                    $gameMessage.setTextField(Number(args[2]), Number(args[3]), args[4] === "true", args[5] === "true");
                }
            }
            if (Utils.RPGMAKER_NAME === "MZ" && result) {
                return true;
            }
        }
        return false;
    };

    // Name Input Processing
    MULI.TextField.alias["Game_Interpreter.prototype.command303"] = PluginManager.alias(Game_Interpreter.prototype, "command303");
    Game_Interpreter.prototype.command303 = function(params) {
        Scene_Name = new Proxy(Scene_Name, {
            construct(target, args, newTarget) {
                Scene_Name = target;
                return new Scene_NameKeyboard(...args);
            },
        });
        return MULI.TextField.alias["Game_Interpreter.prototype.command303"].call(this, params);
    };

    MULI.TextField.alias["Game_Interpreter.prototype.pluginCommand"] = PluginManager.alias(Game_Interpreter.prototype, "pluginCommand");
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        MULI.TextField.alias["Game_Interpreter.prototype.pluginCommand"].call(this, command, args);
        if (command === "TextField") {
            switch (args[0]) {
                case "input":
                    MULI.TextField.commands.input.call(this, Number(args[1]), Number(args[2]), Boolean(args[3]), Boolean(args[4]));
                    break;
            }
        }
    };

    MULI.TextField.alias["SceneManager.catchException"] = PluginManager.alias(SceneManager, "catchException");
    SceneManager.catchException = function(e) {
        MULI.TextField.alias["SceneManager.catchException"].call(this, e);
        Graphics.hideAllTextField();
    };

    Graphics.hideAllTextField = function() {
        this._textFieldWindows.forEach((window) => window.hideTextField());
    };

    Graphics.hideElement = function(element) {
        // HACK 不需要使用時隱藏，避免阻擋文字框的滑鼠操作
        element.style.visibility = "hidden";
    };

    Graphics.showElement = function(element) {
        element.style.visibility = "visible";
    };

    MULI.TextField.alias["Graphics._createErrorPrinter"] = PluginManager.alias(Graphics, "_createErrorPrinter");
    Graphics._createErrorPrinter = function() {
        MULI.TextField.alias["Graphics._createErrorPrinter"].call(this);
        this.hideElement(this._errorPrinter);
    };

    MULI.TextField.alias["Graphics.printLoadingError"] = PluginManager.alias(Graphics, "printLoadingError");
    Graphics.printLoadingError = function(url) {
        MULI.TextField.alias["Graphics.printLoadingError"].call(this, url);
        if (this._errorPrinter && !this._errorShowed) {
            this.showElement(this._errorPrinter);
        }
    };

    MULI.TextField.alias["Graphics.printError"] = PluginManager.alias(Graphics, "printError");
    Graphics.printError = function(name, message) {
        MULI.TextField.alias["Graphics.printError"].call(this, name, message);
        if (this._errorPrinter) {
            this.showElement(this._errorPrinter);
        }
    };

    MULI.TextField.alias["Graphics.eraseLoadingError"] = PluginManager.alias(Graphics, "eraseLoadingError");
    Graphics.eraseLoadingError = function() {
        MULI.TextField.alias["Graphics.eraseLoadingError"].call(this);
        if (this._errorPrinter && !this._errorShowed) {
            this.hideElement(this._errorPrinter);
        }
    };

    MULI.TextField.alias["Graphics.showFps"] = PluginManager.alias(Graphics, "showFps");
    Graphics.showFps = function() {
        MULI.TextField.alias["Graphics.showFps"].call(this);
        if (this._fpsMeter) {
            this.showElement(this._modeBox);
        }
    };

    MULI.TextField.alias["Graphics.hideFps"] = PluginManager.alias(Graphics, "hideFps");
    Graphics.hideFps = function() {
        MULI.TextField.alias["Graphics.hideFps"].call(this);
        if (this._fpsMeter) {
            this.hideElement(this._modeBox);
        }
    };

    MULI.TextField.alias["Graphics._createModeBox"] = PluginManager.alias(Graphics, "_createModeBox");
    Graphics._createModeBox = function() {
        MULI.TextField.alias["Graphics._createModeBox"].call(this);
        this.hideElement(this._modeBox);
    };

    MULI.TextField.alias["Graphics._createAllElements"] = PluginManager.alias(Graphics, "_createAllElements");
    Graphics._createAllElements = function() {
        MULI.TextField.alias["Graphics._createAllElements"].call(this);
        this._textFieldWindows = new Set();
    };

    MULI.TextField.alias["Graphics._updateAllElements"] = PluginManager.alias(Graphics, "_updateAllElements");
    Graphics._updateAllElements = function() {
        MULI.TextField.alias["Graphics._updateAllElements"].call(this);
        this._textFieldWindows.forEach((window) => window.updateTextField());
    };

    Graphics.addTextFieldWindow = function(window) {
        this._textFieldWindows.add(window);
    };

    Graphics.deleteTextFieldWindow = function(window) {
        this._textFieldWindows.delete(window);
    };

    Graphics.unit = function(value) {
        return value * this._realScale + "px";
    };

    MULI.TextField.alias["Input._updateGamepadState"] = PluginManager.alias(Input, "_updateGamepadState");
    Input._updateGamepadState = function(gamepad) {
        const lastState = this._gamepadStates[gamepad.index] || [];
        MULI.TextField.alias["Input._updateGamepadState"].call(this, gamepad);
        const changed = this._gamepadStates[gamepad.index].some((state, i) => state && !lastState[i]);
        if (changed) {
            this._gamepadDate = Date.now();
        }
    };

    Object.defineProperty(Input, "gamepadDate", {
        get: function() {
            return this._gamepadDate;
        },
        configurable: true,
    });

    MULI.TextField.alias["Input._onKeyDown"] = PluginManager.alias(Input, "_onKeyDown");
    Input._onKeyDown = function(event) {
        MULI.TextField.alias["Input._onKeyDown"].call(this, event);
        this._keyboardDate = Date.now();
    };

    Object.defineProperty(Input, "keyboardDate", {
        get: function() {
            return this._keyboardDate;
        },
        configurable: true,
    });

    MULI.TextField.alias["Input.clear"] = PluginManager.alias(Input, "clear");
    Input.clear = function() {
        MULI.TextField.alias["Input.clear"].call(this);
        this._gamepadDate = 0;
        this._keyboardDate = 0;
    };

    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet.insertRule(`
.text-field {
    position: absolute;
    z-index: 4;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    outline: none;
    color: #00000000;
}`);
    style.sheet.insertRule(`
.text-field::selection {
    background-color: var(--textField-selection-color);
}`);
})();
