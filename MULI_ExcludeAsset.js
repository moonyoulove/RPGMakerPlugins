// =============================================================================
// MULI_ExcludeAsset.js
// =============================================================================

/*:
 * @target MV
 * @plugindesc v0.1.0
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins
 *
 * @help
 * 只在測試模式生效，發布前要先執行一次遊戲來生成排除聲明
 *
 * @param enabled
 * @text 是否啟用
 * @desc 啟用的話每次測試遊戲都會進行分析
 * @type boolean
 * @default false
 *
 * @param requiredAssets
 * @text 保留素材
 * @desc 要保留的檔案或資料夾
 * @type text[]
 *
 * ===========GENERATE START===========
 * ============GENERATE END============
 */

var MULI = MULI || {};
MULI.ExcludeAsset = class {};
MULI.ExcludeAsset.pluginName = "MULI_ExcludeAsset";
MULI.ExcludeAsset.alias = {};
MULI.ExcludeAsset.parameters = PluginManager.parameters(MULI.ExcludeAsset.pluginName);
MULI.ExcludeAsset.enabled = MULI.ExcludeAsset.parameters["enabled"] === "true";
MULI.ExcludeAsset.requiredAssets = JSON.parse(MULI.ExcludeAsset.parameters["requiredAssets"] || "[]");
if (PluginManager.hasPlugin("PH_QuestBook.js")) {
    if (PHPlugins.Params.PHQuestBackgroundImage) {
        MULI.ExcludeAsset.requiredAssets.push("img/picture/" + PHPlugins.Params.PHQuestBackgroundImage);
    }
}
MULI.ExcludeAsset.readAllFile = function(path) {
    const fs = require("fs");
    const pathlib = require("path");
    const files = [];
    read(path, files);
    return files;

    function read(path, files) {
        const isFile = path.match(/\.[^\.]+$/);
        if (isFile) {
            const { dir, name } = pathlib.parse(path);
            files.push(pathlib.join(dir, name).replace(/\\/g, "/"));
        } else {
            fs.readdirSync(path).forEach((dirent) => {
                read(pathlib.join(path, dirent), files);
            });
        }
    }
};
MULI.ExcludeAsset.makeRequiredAssets = function() {
    const fs = require("fs");
    const files = [];
    MULI.ExcludeAsset.requiredAssets.forEach((path) => {
        files.push(...MULI.ExcludeAsset.readAllFile(path));
    });
    const path = `js/plugins/${MULI.ExcludeAsset.pluginName}.js`;
    let text = fs.readFileSync(path, "utf-8");
    const start = text.match(/ \* ===========GENERATE START===========\r?\n/);
    const end = text.match(/ \* ============GENERATE END============\r?\n/);
    text = text.slice(0, start.index + start[0].length)
        + files.map((file) => {
            return ` \* @requiredAssets ${file}\n`;
        }).join("")
        + text.slice(end.index);
    fs.writeFileSync(path, text);
};

if (Utils.isOptionValid("test") && Utils.isNwjs()) {
    if (MULI.ExcludeAsset.enabled) {
        MULI.ExcludeAsset.makeRequiredAssets();
    }
}
