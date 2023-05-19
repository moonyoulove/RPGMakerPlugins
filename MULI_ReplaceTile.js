//=============================================================================
// MULI_ReplaceTile.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc 替換地圖上ID為n的圖塊
 * @author moonyoulove
 * @url
 *
 * @help
 * 有一個新的全域變量:$gameTiles，遊戲存檔裡會保存替換的狀態
 *
 * 插件命令：
 * ReplaceTile Replace z tileId1 tileId2 //將z層的圖塊1都換成圖塊2
 * ReplaceTile ReplaceAt z x y tileId //將z層(x,y)替換成圖塊ID
 * ReplaceTile AutoReplaceAt z x y kind //將z層(x,y)替換成圖塊種類
 * ReplaceTile ReplaceIn regionId z tileID //將z層地區ID為n的替換成圖塊ID
 * ReplaceTile AutoReplaceIn regionId z kind //將z層地區ID為n的替換成圖塊種類
 * ReplaceTile Restore z tileId //將z層的圖塊還原成原本的數據
 * ReplaceTile RestoreFrom z x y //將z層(x,y)的圖塊還原成原本的數據
 * ReplaceTile Clear //將當前地圖的替換都還原
 * ReplaceTile Clear All //將所有地圖的替換都還原
 * ReplaceTile Refresh //立即刷新圖塊更變
 * ReplaceTile SetupTileFlow z x y auto kind tileId //配置圖塊流的源頭
 * ReplaceTile UpdateTileFlow //更新圖塊流
 * 
 * 讓替代圖塊生效:
 * MV裡需要用ReplaceTile Refresh命令，MZ則是每30幀自動刷新，也可以手動刷新
 * 
 * 自動圖塊種類的算法:
 * 到地圖繪製筆刷的圖層A欄位，從左至右由上至下，由0開始算即為自動圖塊的種類
 * 
 * 圖塊流使用方法:
 * 1.先設置(=重置)圖塊流 SetupTileFlow z x y auto kind tileId
 * z為圖塊流要繪製到的地圖層級，x和y為源頭的座標，auto為true/false，
 * 代表圖塊流是要用自動圖塊還是一般圖塊，所以kind與tileId擇一就好，另一個留空
 * 2.用一個並行事件執行UpdateTileFlow命令，圖塊流就會開始向外流動，
 * 依照需求設置要流動多久和速度，可以用事件的等待指令做到
 * 3.當流夠或流滿時，讓並行事件停止執行即可
 * 
 * @command Replace
 * @text 全部替代
 * @desc
 *
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg tileId1
 * @text
 * @desc 替代哪個圖塊ID
 * @default 0
 * @type number
 * @min 0
 * @max 8191
 * 
 * @arg tileId2
 * @text
 * @desc 替代成哪個圖塊ID
 * @default 0
 * @type number
 * @min 0
 * @max 8191
 * 
 * @command ReplaceAt
 * @text 替代位於(x,y)的圖塊
 * @desc
 *
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg x
 * @text
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg y
 * @text
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg tileId
 * @text
 * @desc 替代成哪個圖塊ID
 * @default 0
 * @type number
 * @min 0
 * @max 8191
 * 
 * @command AutoReplaceAt
 * @text 用自動圖塊替代位於(x,y)的圖塊
 * @desc
 *
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg x
 * @text
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg y
 * @text
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg kind
 * @text
 * @desc 替代成哪個圖塊種類，從畫地圖的筆刷欄算，由0開始
 * @default 0
 * @type number
 * @min 0
 * @max 127
 * 
 * @command ReplaceIn
 * @text 替代所有地區ID為n的圖塊
 * @desc
 *
 * @arg regionId
 * @text
 * @desc 地區ID
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg tileId
 * @text
 * @desc 替代成哪個圖塊ID
 * @default 0
 * @type number
 * @min 0
 * @max 8191
 * 
 * @command AutoReplaceIn
 * @text 用自動圖塊替代地區ID為n的圖塊
 * @desc
 * 
 * @arg regionId
 * @text
 * @desc 地區ID
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg kind
 * @text
 * @desc 替代成哪個圖塊種類，從畫地圖的筆刷欄算，由0開始
 * @default 0
 * @type number
 * @min 0
 * @max 127
 * 
 * @command Restore
 * @text 還原圖塊ID為n的所有圖塊
 * @desc
 * 
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg tileId
 * @text
 * @desc 還原哪個圖塊ID
 * @default 0
 * @type number
 * @min 0
 * @max 8191
 * 
 * @command RestoreFrom
 * @text 還原(x,y)的圖塊
 * @desc
 * 
 * @arg z
 * @text
 * @desc 替代到哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg x
 * @text
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg y
 * @text
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * 
 * @command Clear
 * @text 清除當前地圖的所有替代
 * @desc
 * 
 * @command ClearAll
 * @text 清除所有地圖的所有替代
 * @desc
 * 
 * @command Refresh
 * @text 立即刷新圖塊
 * @desc
 * 
 * @command SetupTileFlow
 * @text 配置圖塊流
 * @desc
 * 
 * @arg z
 * @text
 * @desc 在哪個地圖層級(0-3)
 * @default 0
 * @type number
 * @min 0
 * @max 3
 * 
 * @arg x
 * @text
 * @desc 初始位置，源頭
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg y
 * @text
 * @desc 初始位置，源頭
 * @default 0
 * @type number
 * @min 0
 * 
 * @arg auto
 * @text
 * @desc 是否是自動圖塊，kind和tileID二選一
 * @default true
 * @type boolean
 * 
 * @arg kind
 * @text
 * @desc 圖塊種類，從畫地圖的筆刷欄算，由0開始
 * @default 0
 * @type number
 * @min 0
 * @max 127
 * 
 * @arg tileId
 * @text
 * @desc 圖塊ID
 * @default 0
 * @type number
 * @min 0
 * @max 8191
 * 
 * @command UpdateTileFlow
 * @text 更新圖塊流
 * @desc 持續執行就會一直向外流動
 * 
 * @param blockFlowRegionId
 * @text 禁止圖塊流通行的地區ID
 * @desc 
 * @default 0
 * @type number
 * @min 0
 * @max 255
 * 
 * @param flowStopSwitchId
 * @text 用來判斷圖塊流是不是停止了的開關ID
 * @desc 
 * @default 0
 * @type number
 * @min 0
 *
 * @base_
 * @orderAfter
 * @orderBefore
 *
 * @requiredAssets
 *
 * @noteParam
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

class ReplaceTile { }
ReplaceTile.pluginName = "MULI_ReplaceTile";
ReplaceTile.parameters = PluginManager.parameters(ReplaceTile.pluginName);
ReplaceTile.blockFlowRegionId = Number(ReplaceTile.parameters.blockFlowRegionId);
ReplaceTile.flowStopSwitchId = Number(ReplaceTile.parameters.flowStopSwitchId);
ReplaceTile.A2_SHAPE_TABLE = [
    [[[[0, 2], [0, 4]], [[0, 2], [0, 4]]], [[[2, 2], [2, 0]], [[2, 2], [2, 4]]]], // 如果要參考的圖塊是在左上角
    [[[[3, 2], [1, 2]], [[3, 2], [1, 2]]], [[[3, 4], [3, 0]], [[3, 4], [1, 4]]]], // 右上
    [[[[0, 5], [2, 5]], [[0, 5], [2, 5]]], [[[0, 3], [2, 1]], [[0, 3], [2, 3]]]], // 左下
    [[[[3, 5], [3, 3]], [[3, 5], [3, 3]]], [[[1, 5], [3, 1]], [[1, 5], [1, 3]]]]  // 右下
];
ReplaceTile.CORNER_TABLE = [
    [[-1, 0], [-1, -1], [0, -1]],
    [[0, -1], [1, -1], [1, 0]],
    [[0, 1], [-1, 1], [-1, 0]],
    [[1, 0], [1, 1], [0, 1]]
];
PluginManager.registerCommand = PluginManager.registerCommand ? PluginManager.registerCommand : () => { };
PluginManager.registerCommand(ReplaceTile.pluginName, "Replace", ({ z, tileId1, tileId2 }) => {
    $gameTiles.replace(this._mapId, Number(z), Number(tileId1), Number(tileId2));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "ReplaceAt", ({ z, x, y, tileId }) => {
    $gameTiles.replaceAt(this._mapId, Number(z), Number(x), Number(y), Number(tileId));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "AutoReplaceAt", ({ z, x, y, kind }) => {
    $gameTiles.autoReplaceAt(this._mapId, Number(z), Number(x), Number(y), Number(kind));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "ReplaceIn", ({ regionId, z, tileId }) => {
    $gameMap.getAllRegion(Number(regionId)).forEach(([x, y]) => $gameTiles.replaceAt(this._mapId, Number(z), Number(x), Number(y), Number(tileId)));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "AutoReplaceIn", ({ regionId, z, kind }) => {
    $gameMap.getAllRegion(Number(regionId)).forEach(([x, y]) => $gameTiles.autoReplaceAt(this._mapId, Number(z), Number(x), Number(y), Number(kind)));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "Restore", ({ z, tileId }) => {
    $gameTiles.restore(this._mapId, Number(z), Number(tileId));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "RestoreFrom", ({ z, x, y }) => {
    $gameTiles.restoreFrom(this._mapId, Number(z), Number(x), Number(y));
});
PluginManager.registerCommand(ReplaceTile.pluginName, "Clear", () => {
    $gameTiles.clear(this._mapId);
});
PluginManager.registerCommand(ReplaceTile.pluginName, "ClearAll", () => {
    $gameTiles.clearAll();
});
PluginManager.registerCommand(ReplaceTile.pluginName, "Refresh", () => {
    $gameTiles.needRepaint();
});
PluginManager.registerCommand(ReplaceTile.pluginName, "SetupTileFlow", ({ z, x, y, auto, kind, tileId }) => {
    $gameMap.setFlowType(Number(z), Boolean(auto), Number(kind), Number(tileId));
    $gameMap.setFlowStart(Number(x), Number(y));
    $gameSwitches.setValue(ReplaceTile.flowStopSwitchId, false);
});
PluginManager.registerCommand(ReplaceTile.pluginName, "UpdateTileFlow", () => {
    $gameMap.updateTileFlow();
});

function Game_Tiles() {
    this.initialize.apply(this, arguments);
}

Game_Tiles.prototype.initialize = function () {
    this._needRepaint = false;
    this._data = {};
};

Game_Tiles.prototype.clear = function (mapId) {
    delete this._data[mapId];
};

Game_Tiles.prototype.clearAll = function () {
    this._data = {};
};

Game_Tiles.prototype.replace = function (mapId, z, tileId1, tileId2) {
    this._data[mapId] = this._data[mapId] ? this._data[mapId] : {};
    this._data[mapId][z] = this._data[mapId][z] ? this._data[mapId][z] : {};
    this._data[mapId][z][tileId1] = tileId2;
};

Game_Tiles.prototype.replaceAt = function (mapId, z, x, y, tileId) {
    this.replace(mapId, z, `${x},${y}`, tileId);
};

Game_Tiles.prototype.autoReplaceAt = function (mapId, z, x, y, kind) {
    this.replaceAutotileAt(mapId, z, x, y, kind);
    this.adjustAutotileAt(mapId, z, x, y, kind);
};

Game_Tiles.prototype.replaceAutotileAt = function (mapId, z, x, y, kind) {
    const coordinates = [];
    coordinates.push(this.getAutotileCoord("upperLeft", z, x, y, kind));
    coordinates.push(this.getAutotileCoord("upperRight", z, x, y, kind));
    coordinates.push(this.getAutotileCoord("lowerLeft", z, x, y, kind));
    coordinates.push(this.getAutotileCoord("lowerRight", z, x, y, kind));
    const autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    const shape = autotileTable.findIndex(otherCoords => otherCoords.equals(coordinates));
    const tileId = Tilemap.makeAutotileId(kind, shape);
    this.replaceAt(mapId, z, x, y, tileId);
};

Game_Tiles.prototype.getAutotileCoord = function (direction, z, x, y, kind) {
    const index = ["upperLeft", "upperRight", "lowerLeft", "lowerRight"].indexOf(direction);
    const shapeTable = ReplaceTile.A2_SHAPE_TABLE;
    const cornerTable = ReplaceTile.CORNER_TABLE;
    // 檢查周圍是否已經有相同圖塊
    const exists = cornerTable[index].map(([dx, dy]) => {
        const x2 = x + dx;
        const y2 = y + dy;
        const tileId2 = $gameMap.tileId(x2, y2, z);
        const kind2 = Tilemap.getAutotileKind(tileId2);
        return kind2 === kind ? 1 : 0;
    });
    return shapeTable[index][exists[0]][exists[1]][exists[2]];
};

Game_Tiles.prototype.adjustAutotileAt = function (mapId, z, x, y, kind) {
    $gameMap.jiugongge(x, y).forEach(([x2, y2]) => {
        const tileId2 = $gameMap.tileId(x2, y2, z);
        const kind2 = Tilemap.getAutotileKind(tileId2);
        if (kind2 === kind) {
            this.replaceAutotileAt(mapId, z, x2, y2, kind);
        }
    });
};

Game_Tiles.prototype.restore = function (mapId, z, tileId) {
    if (this._data[mapId] && this._data[mapId][z] && this._data[mapId][z][tileId]) {
        delete this._data[mapId][z][tileId];
        if (Object.keys(this._data[mapId][z]).length === 0) {
            delete this._data[mapId][z];
            if (Object.keys(this._data[mapId]).length === 0) {
                delete this._data[mapId];
            }
        }
    }
};

Game_Tiles.prototype.restoreFrom = function (mapId, z, x, y) {
    this.restore(mapId, z, `${x},${y}`);
};

Game_Tiles.prototype.hasReplaced = function (mapId, z, tileId) {
    if (this._data[mapId] && this._data[mapId][z] && this._data[mapId][z][tileId]) {
        return this._data[mapId][z][tileId];
    }
    return -1;
};

Game_Tiles.prototype.hasReplacedAt = function (mapId, z, x, y) {
    return this.hasReplaced(mapId, z, `${x},${y}`);
};

Game_Tiles.prototype.isNeedRepaint = function () {
    return this._needRepaint;
};

Game_Tiles.prototype.needRepaint = function () {
    this._needRepaint = true;
};

Game_Tiles.prototype.repainted = function () {
    this._needRepaint = false;
};

(function () {
    let _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _DataManager_createGameObjects.call(this);
        $gameTiles = new Game_Tiles();
    };

    let _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        let contents = _DataManager_makeSaveContents.call(this);
        contents.replacedTiles = $gameTiles;
        return contents;
    };

    let _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameTiles = contents.tiles || $gameTiles;
    };

    _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "ReplaceTile") {
            switch (args[0]) {
                case "Replace": {
                    const [z, tileId1, tileId2] = args.slice(1).map(Number);
                    $gameTiles.replace(this._mapId, z, tileId1, tileId2);
                    break;
                }
                case "ReplaceAt": {
                    const [z, x, y, tileId] = args.slice(1).map(Number);
                    $gameTiles.replaceAt(this._mapId, z, x, y, tileId);
                    break;
                }
                case "AutoReplaceAt": {
                    const [z, x, y, kind] = args.slice(1).map(Number);
                    $gameTiles.autoReplaceAt(this._mapId, z, x, y, kind);
                    break;
                }
                case "ReplaceIn": {
                    const [regionId, z, tileId] = args.slice(1).map(Number);
                    $gameMap.getAllRegion(regionId).forEach(([x, y]) => $gameTiles.replaceAt(this._mapId, z, x, y, tileId));
                    break;
                }
                case "AutoReplaceIn": {
                    const [regionId, z, kind] = args.slice(1).map(Number);
                    $gameMap.getAllRegion(regionId).forEach(([x, y]) => $gameTiles.autoReplaceAt(this._mapId, z, x, y, kind));
                    break;
                }
                case "Restore": {
                    const [z, tileId] = args.slice(1).map(Number);
                    $gameTiles.restore(this._mapId, z, tileId);
                    break;
                }
                case "RestoreFrom": {
                    const [z, x, y] = args.slice(1).map(Number);
                    $gameTiles.restoreFrom(this._mapId, z, x, y);
                    break;
                }
                case "Clear": {
                    $gameTiles.clear(this._mapId);
                    break;
                }
                case "ClearAll": {
                    $gameTiles.clearAll();
                    break;
                }
                case "Refresh": {
                    $gameTiles.needRepaint();
                    break;
                }
                case "SetupTileFlow": {
                    const [z, x, y, , kind, tileId] = args.slice(1).map(Number);
                    const auto = Boolean(args[4]);
                    $gameMap.setFlowType(z, auto, kind, tileId);
                    $gameMap.setFlowStart(x, y);
                    $gameSwitches.setValue(ReplaceTile.flowStopSwitchId, false);
                    break;
                }
                case "UpdateTileFlow": {
                    $gameMap.updateTileFlow();
                    break;
                }
            }
        }
    };

    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        _Game_Map_initialize.call(this);
        this._tileFlow = [];
        this._flowEnd = -1;
        this._flowType = {};
    };

    Game_Map.prototype.tileFlow = function () {
        return this._tileFlow;
    };

    Game_Map.prototype.getAllRegion = function (regionId) {
        const coordinates = [];
        const width = this.width();
        const height = this.height();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (this.regionId(x, y) === regionId) {
                    coordinates.push([x, y]);
                }
            }
        }
        return coordinates;
    };

    Game_Map.prototype.getAllKind = function (kind) {
        let nums = 0;
        const width = this.width();
        const height = this.height();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (Tilemap.getAutotileKind(this.tileId(x, y, 0)) === kind) {
                    nums++;
                }
            }
        }
        return nums;
    };

    Game_Map.prototype.setFlowStart = function (x, y) {
        this._tileFlow = [[x, y]];
        this._flowEnd = -1;
    };

    Game_Map.prototype.setFlowType = function (z, auto, kind, tileId) {
        this._flowType = {
            z,
            auto,
            kind,
            tileId
        };
    };

    Game_Map.prototype.updateTileFlow = function () {
        const endFlow = $gameMap.getEndFlow();
        if (endFlow.length > 0 && !this.isFlowExceed()) {
            const { z, auto, kind, tileId } = this._flowType;
            if (auto) {
                endFlow.forEach(([x, y]) => $gameTiles.autoReplaceAt(this.mapId(), z, x, y, kind));
            } else {
                endFlow.forEach(([x, y]) => $gameTiles.replaceAt(this.mapId(), z, x, y, tileId));
            }
        } else {
            $gameSwitches.setValue(ReplaceTile.flowStopSwitchId, true);
        }
    };

    Game_Map.prototype.getEndFlow = function () {
        if (this._flowEnd === -1) {
            this._flowEnd = 0;
            return this._tileFlow;
        }
        const oldFlow = this._tileFlow.slice(this._flowEnd);
        this._flowEnd = this._tileFlow.length;
        const blockFlowRegionId = ReplaceTile.blockFlowRegionId;
        oldFlow.forEach(([x1, y1]) => {
            // [2,4,6,8]對應相反方向[上,右,左,下]
            const coordinates = [[0, -1], [1, 0], [-1, 0], [0, 1]].map(([dx, dy]) => [x1 + dx, y1 + dy])
                .filter(([x2, y2], index) => {
                    return $gameMap.isValid(x2, y2) &&
                        $gameMap.isPassable(x2, y2, 2 * (index + 1)) &&
                        !this.isTileFlow(x2, y2) &&
                        !(blockFlowRegionId > 0 && $gameMap.regionId(x2, y2) === blockFlowRegionId);
                });
            this._tileFlow.push(...coordinates);
        });
        const newFlow = this._tileFlow.slice(this._flowEnd);
        return newFlow;
    };

    Game_Map.prototype.isTileFlow = function (x, y) {
        return !!this._tileFlow.find(([x2, y2]) => x2 === x && y2 === y);
    };

    Game_Map.prototype.isFlowExceed = function () {
        return this._tileFlow.length > this.width() * this.height();
    };

    Game_Map.prototype.jiugongge = function (x, y) {
        return [
            [-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
            .map(([dx, dy]) => [x + dx, y + dy]);
    };

    let _Game_Map_tileId = Game_Map.prototype.tileId;
    Game_Map.prototype.tileId = function (x, y, z) {
        const tileId = _Game_Map_tileId.call(this, x, y, z);
        const id1 = $gameTiles.hasReplacedAt(this._mapId, z, x, y);
        if (id1 >= 0) {
            return id1;
        }
        const id2 = $gameTiles.hasReplaced(this._mapId, z, tileId);
        if (id2 >= 0) {
            return id2;
        }
        return tileId;
    };

    const _Tilemap_initialize = Tilemap.prototype.initialize;
    Tilemap.prototype.initialize = function () {
        _Tilemap_initialize.call(this);
        this._mapId = 0;
    };

    const _Tilemap__readMapData = Tilemap.prototype._readMapData;
    Tilemap.prototype._readMapData = function (x, y, z) {
        const tileId = _Tilemap__readMapData.call(this, x, y, z);
        if (this._mapData) {
            const x2 = this.horizontalWrap ? x.mod(this._mapWidth) : x;
            const y2 = this.verticalWrap ? y.mod(this._mapHeight) : y;
            const id1 = $gameTiles.hasReplacedAt(this._mapId, z, x2, y2);
            if (id1 >= 0) {
                return id1;
            }
            const id2 = $gameTiles.hasReplaced(this._mapId, z, tileId);
            if (id2 >= 0) {
                return id2;
            }
        }
        return tileId;
    };

    Tilemap.prototype.setMapId = function (mapId) {
        this._mapId = mapId;
    };

    let _Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
    Spriteset_Map.prototype.updateTilemap = function () {
        _Spriteset_Map_updateTilemap.call(this);
        if ($gameTiles.isNeedRepaint()) {
            this._tilemap.refresh();
            $gameTiles.repainted();
        }
    };

    const _Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function () {
        _Spriteset_Map_createTilemap.call(this);
        this._tilemap.setMapId($gameMap.mapId());
    };
})();