//-----===================================================================-----
// MULI_WindowTextField.js
//-----===================================================================-----

/*:
 * @target MV MZ
 * @plugindesc 仿原生文字框輸入，運用透明<input>
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins/blob/main/MULI_WindowTextField.js
 *
 * @help
 * 插件命令:
 * TextField input 5 1 true true // 參數依序為最大字數、變量ID、
 * 允許空白和允許取消
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

class TextField {}

TextField.pluginName = "MULI_WindowTextField";
TextField.parameters = PluginManager.parameters("MULI_WindowTextField");
TextField.commands = {
    input(maxLength, variableId, allowEmpty, allowCancel) {
        $gameMessage.setTextField(maxLength, variableId, allowEmpty, allowCancel);
        this.setWaitMode("message");
    }
};
TextField.defaultWidth = Number(TextField.parameters.defaultWidth);
TextField.minWidth = Number(TextField.parameters.minWidth);
TextField.maxWidth = Number(TextField.parameters.maxWidth);
TextField.windowHeight = Number(TextField.parameters.windowHeight);
TextField.textFieldY = Number(TextField.parameters.textFieldY);
TextField.textFieldAlign = TextField.parameters.textFieldAlign;
TextField.textAlign = TextField.parameters.textAlign;
TextField.selectionColor = TextField.parameters.selectionColor;
TextField.buttonImage = TextField.parameters.buttonImage;
TextField.buttonHeight = Number(TextField.parameters.buttonHeight);
TextField.buttonAlign = TextField.parameters.buttonAlign;
TextField.buttonCancelX = Number(TextField.parameters.buttonCancelX);
TextField.buttonCancelWidth = Number(TextField.parameters.buttonCancelWidth);
TextField.buttonOkX = Number(TextField.parameters.buttonOkX);
TextField.buttonOkWidth = Number(TextField.parameters.buttonOkWidth);

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
    this.createButtons();
    this.deactivate();
};

Window_TextField.prototype.start = function() {
    this.setTextFieldMaxLength($gameMessage.textFieldMaxLength());
    this.setTextFieldValue(String($gameVariables.value($gameMessage.textFieldVariableId()) || ""));
    this.updatePlacement();
    this.updateTextField();
    this.placeButtons();
    this.updateButtonsVisiblity();
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
        const textWidth = this.textWidth("永") * Math.min(maxLength, 5);
        const lengthWidth = this.textWidth("0") * (maxLength.toString().length * 2 + 1);
        const totalWidth = textWidth + lengthWidth + this.padding * 2;
        return totalWidth.clamp(TextField.minWidth, TextField.maxWidth || Graphics.boxWidth);
    } else {
        return TextField.defaultWidth;
    }
};

Window_TextField.prototype.windowHeight = function() {
    return TextField.windowHeight || this.fittingHeight(1);
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

Window_TextField.prototype.buttonY = function() {
    const spacing = 8;
    if (this._messageWindow.y >= Graphics.boxHeight / 2) {
        return 0 - this._buttons[0].height - spacing;
    } else {
        return this.height + spacing;
    }
};

Window_TextField.prototype.updateButtonsVisiblity = function() {
    if (Utils.RPGMAKER_NAME === "MV" ? TouchInput.date > Input.date : ConfigManager.touchUI) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Window_TextField.prototype.createButtons = function() {
    const bitmap = TextField.buttonImage ? ImageManager.loadSystem(TextField.buttonImage) : null;
    const buttonHeight = TextField.buttonHeight;
    this._buttons = [];
    for (let i = 0; i < 2; i++) {
        // @rmmz
        const button = new Sprite_Button(["cancel", "ok"][i]);
        if (bitmap) {
            const x = [TextField.buttonCancelX, TextField.buttonOkX][i];
            const buttonWidth = [TextField.buttonCancelWidth, TextField.buttonOkWidth][i];
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, buttonWidth, buttonHeight);
            button.setHotFrame(x, buttonHeight, buttonWidth, buttonHeight);
        }
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this.onTextFieldCancel.bind(this));
    this._buttons[1].setClickHandler(this.onTextFieldOk.bind(this));
};

Window_TextField.prototype.placeButtons = function() {
    const numButtons = this._buttons.length;
    const spacing = 16;
    let totalWidth = -spacing;
    for (let i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    let x = 0;
    switch (TextField.buttonAlign) {
        case "left":
            x = 0;
            break;
        case "center":
            x = (this.width - totalWidth) / 2;
            break;
        case "right":
            x = this.width - totalWidth;
            break;
    }
    for (let j = 0; j < numButtons; j++) {
        const button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
};

Window_TextField.prototype.showButtons = function() {
    for (let i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

Window_TextField.prototype.hideButtons = function() {
    for (let i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

Window_TextField.prototype.isOkEnabled = function() {
    return $gameMessage.textFieldAllowEmpty() ? true : this._textField.value.length > 0;
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
    this.hideButtons();
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
    Window_NameEdit = TextField.Window_NameEdit || Window_NameEdit;
    // @rmmz mv:[actor, maxLength] mz:[rect]
    Window_NameEdit.prototype.initialize.apply(this, args);
    this._isKeyboardInput = true;
    this._inputWindow = null;
    this.createTextField();
    this.setTextFieldValue(this._name);
    this.setTextFieldMaxLength(this._maxLength);
    this.activate();
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

Window_NameTextField.prototype.setInputWindow = function(window) {
    this._inputWindow = window;
};

Window_NameTextField.prototype.onTextFieldOk = function() {
    this._inputWindow.onNameOk();
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

Scene_NameKeyboard.prototype.initialize = function() {
    Scene_Name.prototype.initialize.call(this);
};

Scene_NameKeyboard.prototype.createEditWindow = function() {
    // 替換
    TextField.Window_NameEdit = Window_NameEdit;
    Window_NameEdit = Window_NameTextField;
    Scene_Name.prototype.createEditWindow.call(this);
};

Scene_NameKeyboard.prototype.createInputWindow = function() {
    Scene_Name.prototype.createInputWindow.call(this);
    this._editWindow.setInputWindow(this._inputWindow);
};


Scene_NameKeyboard.prototype.start = function() {
    Scene_Name.prototype.start.call(this);
    if (Input.gamepadDate > TouchInput.date && Input.gamepadDate >= Input.date) {
        this._editWindow.setKeyboardInput(false);
    } else {
        this._inputWindow.deselect();
        this._inputWindow.deactivate();
    }
};

(() => {
    if (Utils.RPGMAKER_NAME === "MV") {
        Object.defineProperty(Window.prototype, "innerWidth", {
            get: function() {
                return Math.max(0, this._width - this._padding * 2);
            },
            configurable: true
        });

        Object.defineProperty(Window.prototype, "innerHeight", {
            get: function() {
                return Math.max(0, this._height - this._padding * 2);
            },
            configurable: true
        });
    } else {
        PluginManager.registerCommand(TextField.pluginName, "input", function(args) {
            TextField.commands.input.call(this, Number(args.maxLength), Number(args.variableId), Boolean(args.allowEmpty), Boolean(args.allowCancel));
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

        const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
        Scene_Message.prototype.createAllWindows = function() {
            this.createTextFieldWindow();
            _Scene_Message_createAllWindows.call(this);
        };

        Scene_Message.prototype.createTextFieldWindow = function() {
            this._textFieldWindow = new Window_TextField();
            this.addWindow(this._textFieldWindow);
        };

        const _Scene_Message_associateWindows = Scene_Message.prototype.associateWindows;
        Scene_Message.prototype.associateWindows = function() {
            _Scene_Message_associateWindows.call(this);
            const messageWindow = this._messageWindow;
            messageWindow.setTextFieldWindow(this._textFieldWindow);
            this._textFieldWindow.setMessageWindow(messageWindow);
        };
    }

    const _Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function() {
        _Scene_Base_terminate.call(this);
        if (this._windowLayer) {
            // @rmmz mz的windowlayer沒有removeChildren
            this._windowLayer.destroy();
        }
    };

    // 要使用文字框時必須
    Window_Base.prototype.createTextField = function() {
        this.on("added", this._onAdded, this);
        this.on("removed", this._onRemoved, this);
        this.createTextFieldElement();
        this.updateTextField();
    }

    Window_Base.prototype.createTextFieldElement = function() {
        this._textField = document.createElement("input");
        this._textField.tabIndex = -1;
        this._textField.className = "textField";
        this._textField.dataset.fontScale = "1";
        this._textField.dataset.prePress = String(Input.isPressed("ok"));
        this._textField.addEventListener("blur", this._onTextFieldLostFocus.bind(this));
        this._textField.addEventListener("keydown", this._onTextFieldKeyDown.bind(this));
        this._textField.addEventListener("input", this._onTextFieldInput.bind(this));
        this._textField.addEventListener("contextmenu", this._onTextFieldRightClick.bind(this));
        this._textField.addEventListener("compositionstart", this._onTextFieldCompositionStart.bind(this));
        this._textField.addEventListener("compositionend", this._onTextFieldCompositionEnd.bind(this));
        this._textField.addEventListener("keyup", this._onTextFieldKeyUp.bind(this));
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
        event.stopPropagation();
        if (this._textField.dataset.composing === "true") {
            this._textField.dataset.composed = "true";
        }
    };

    Window_Base.prototype._onTextFieldCompositionStart = function(event) {
        this._textField.dataset.composing = "true";
    };

    Window_Base.prototype._onTextFieldCompositionEnd = function(event) {
        this._textField.dataset.composing = "false";
    };

    Window_Base.prototype._onTextFieldKeyUp = function(event) {
        const dataset = this._textField.dataset;
        if (this.active && dataset.prePress !== "true" && dataset.composing !== "true" && dataset.composed !== "true") {
            switch (event.code) {
                case "Enter":
                    this.onTextFieldOk();
                    break;
                case "Escape":
                    this.onTextFieldCancel();
                    break;
            }
        }
        dataset.composed = "false";
        dataset.prePress = "false";
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
        this._textField.style.textAlign = TextField.textAlign;
        this.updateTextFieldFontSize();
        const color = TextField.selectionColor || this.cursorColor();
        this._textField.style.setProperty("--textField-selection-color", color);
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

    const _Window_Base_move = Window_Base.prototype.move;
    Window_Base.prototype.move = function(x, y, width, height) {
        width = width || this._width;
        height = height || this._height;
        let needsUpdate = false;
        if (this.x !== x || this.y !== y && this._width === width && this._height === height) {
            needsUpdate = true;
        }
        _Window_Base_move.call(this, x, y, width, height);
        if (needsUpdate) {
            this.updateTextFieldPosition();
        }
    };

    const _Window_Base__refreshAllPart = Window_Base.prototype._refreshAllPart;
    Window_Base.prototype._refreshAllPart = function() {
        _Window_Base__refreshAllPart.call(this);
        this.updateElement();
    };

    Window_Base.prototype.updateTextFieldPosition = function() {
        if (this._textField) {
            const rect = this.textFieldRect();
            this._textField.style.left = Graphics.unit(this.padding + rect.x - this.canvasToLocalX(Graphics.pageToCanvasX(0)));
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

    const _Window_Base_open = Window_Base.prototype.open;
    Window_Base.prototype.open = function() {
        _Window_Base_open.call(this);
        this.updateTextFieldVisibility();
    };

    const _Window_Base_close = Window_Base.prototype.close;
    Window_Base.prototype.close = function() {
        _Window_Base_close.call(this);
        this.updateTextFieldVisibility();
    };

    const _Window_Base_show = Window_Base.prototype.show;
    Window_Base.prototype.show = function() {
        _Window_Base_show.call(this);
        this.updateTextFieldVisibility();
    };

    const _Window_Base_hide = Window_Base.prototype.hide;
    Window_Base.prototype.hide = function() {
        _Window_Base_hide.call(this);
        this.updateTextFieldVisibility();
    };

    const _Window_Base_activate = Window_Base.prototype.activate;
    Window_Base.prototype.activate = function() {
        _Window_Base_activate.call(this);
        if (this._textField) {
            this._textField.disabled = false;
            this._textField.focus();
            this._textField.dataset.prePress = String(Input.isPressed("ok"));
        }
    };

    const _Window_Base_deactivate = Window_Base.prototype.deactivate;
    Window_Base.prototype.deactivate = function() {
        _Window_Base_deactivate.call(this);
        if (this._textField) {
            this._textField.setSelectionRange(-1, -1);
            this._textField.disabled = true;
        }
    };

    Window_Base.prototype.textFieldRect = function() {
        const x = 0;
        const height = this.lineHeight();
        let y = 0;
        switch (TextField.textFieldAlign) {
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
                y = TextField.textFieldY;
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

    Window_Base.prototype.cursorColor = function() {
        return this.windowskin.getPixel(112, 112);
    };

    const _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
    Window_Message.prototype.isAnySubWindowActive = function() {
        return this._textFieldWindow.active || _Window_Message_isAnySubWindowActive.call(this);
    };

    const _Window_Message_startInput = Window_Message.prototype.startInput;
    Window_Message.prototype.startInput = function() {
        if (_Window_Message_startInput.call(this)) {
            return true;
        } else if ($gameMessage.isTextField()) {
            this._textFieldWindow.start();
            return true;
        } else {
            return false;
        }
    };

    const _Window_Message_subWindows = Window_Message.prototype.subWindows;
    Window_Message.prototype.subWindows = function() {
        return _Window_Message_subWindows.call(this).concat([this._textFieldWindow]);
    };

    const _Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
    Window_Message.prototype.createSubWindows = function() {
        _Window_Message_createSubWindows.call(this);
        this._textFieldWindow = new Window_TextField(this);
    };

    // @rmmz
    Window_Message.prototype.setTextFieldWindow = function(textFieldWindow) {
        this._textFieldWindow = textFieldWindow;
    };

    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.call(this);
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

    const _Game_Message_isBusy = Game_Message.prototype.isBusy;
    Game_Message.prototype.isBusy = function() {
        return this.isTextField() || _Game_Message_isBusy.call(this);
    };

    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        _Game_Interpreter_command101.call(this);
        const nextCommnad = this._list[this._index];
        if (nextCommnad && nextCommnad.code === 356) {
            const args = nextCommnad.parameters[0].split(" ");
            if (args[0] === "TextField" && args[1] === "input") {
                this._index++;
                $gameMessage.setTextField(Number(args[2]), Number(args[3]), Boolean(args[4]), Boolean(args[5]));
            }
        }
        return false;
    };

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "TextField") {
            switch (args[0]) {
                case "input":
                    TextField.commands.input.call(this, Number(args[1]), Number(args[2]), Boolean(args[3]), Boolean(args[4]));
                    break;
            }
        }
    };

    const _SceneManager_push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if (sceneClass === Scene_Name) {
            sceneClass = Scene_NameKeyboard;
        }
        _SceneManager_push.call(this, sceneClass);
    };

    const _SceneManager_catchException = SceneManager.catchException;
    SceneManager.catchException = function(e) {
        _SceneManager_catchException.call(this, e);
        Graphics.hideAllTextField();
    };

    Graphics.hideAllTextField = function() {
        this._textFieldWindows.forEach(window => window.hideTextField());
    };

    Graphics.hideElement = function(element) {
        // 不需要使用時隱藏，避免阻擋文字框的滑鼠操作
        element.style.visibility = "hidden";
    };

    Graphics.showElement = function(element) {
        element.style.visibility = "visible";
    };

    const _Graphics__createErrorPrinter = Graphics._createErrorPrinter;
    Graphics._createErrorPrinter = function() {
        _Graphics__createErrorPrinter.call(this);
        this.hideElement(this._errorPrinter);
    };

    const _Graphics_printLoadingError = Graphics.printLoadingError;
    Graphics.printLoadingError = function(url) {
        _Graphics_printLoadingError.call(this, url);
        if (this._errorPrinter && !this._errorShowed) {
            this.showElement(this._errorPrinter);
        }
    };

    const _Graphics_printError = Graphics.printError;
    Graphics.printError = function(name, message) {
        _Graphics_printError.call(this, name, message);
        if (this._errorPrinter) {
            this.showElement(this._errorPrinter);
        }
    };

    const _Graphics_eraseLoadingError = Graphics.eraseLoadingError;
    Graphics.eraseLoadingError = function() {
        _Graphics_eraseLoadingError.call(this);
        if (this._errorPrinter && !this._errorShowed) {
            this.hideElement(this._errorPrinter);
        }
    };

    const _Graphics_showFps = Graphics.showFps;
    Graphics.showFps = function() {
        _Graphics_showFps.call(this);
        if (this._fpsMeter) {
            this.showElement(this._modeBox);
        }
    };

    const _Graphics_hideFps = Graphics.hideFps;
    Graphics.hideFps = function() {
        _Graphics_hideFps.call(this);
        if (this._fpsMeter) {
            this.hideElement(this._modeBox);
        }
    };

    const _Graphics__createModeBox = Graphics._createModeBox;
    Graphics._createModeBox = function() {
        _Graphics__createModeBox.call(this);
        this.hideElement(this._modeBox);
    };

    const Graphics_initialize = Graphics.initialize;
    Graphics.initialize = function(width, height, type) {
        Graphics_initialize.call(this, width, height, type);
        this._textFieldWindows = new Set();
        return !!this._app;
    };

    const _Graphics__updateAllElements = Graphics._updateAllElements;
    Graphics._updateAllElements = function() {
        _Graphics__updateAllElements.call(this);
        this._textFieldWindows.forEach(window => window.updateTextField());
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

    const _Input__updateGamepadState = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        const lastState = this._gamepadStates[gamepad.index] || [];
        _Input__updateGamepadState.call(this, gamepad);
        const changed = this._gamepadStates[gamepad.index].some((state, i) => state !== lastState[i]);
        if (changed) {
            this._gamepadDate = Date.now();
        }
    };

    Object.defineProperty(Input, "gamepadDate", {
        get: function() {
            return this._gamepadDate;
        },
        configurable: true
    });

    const _Input_clear = Input.clear;
    Input.clear = function() {
        _Input_clear.call(this);
        this._gamepadDate = 0;
    };

    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet.insertRule(`
.textField {
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
.textField::selection {
    background: var(--textField-selection-color);
}`);
})();