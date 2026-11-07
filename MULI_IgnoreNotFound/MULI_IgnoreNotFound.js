// =============================================================================
// MULI_IgnoreNotFound.js
// =============================================================================
/*:
 *
 * @target MV
 * @plugindesc v0.1.1 缺失的素材會自動以空白檔代替
 * @author moonyoulove
 * @url https://github.com/moonyoulove/RPGMakerPlugins
 *
 * @help
 *
 * @base MULI_PluginBase
 * @orderAfter MULI_PluginBase
 */

var MULI = MULI || {};
MULI.IgnoreNotFound = class {};
MULI.IgnoreNotFound.pluginName = "MULI_IgnoreNotFound";
MULI.IgnoreNotFound.alias = {};
MULI.IgnoreNotFound.parameters = PluginManager.parameters(MULI.IgnoreNotFound.pluginName);

if (Utils.isNwjs()) {
    const fs = nw.require("fs");
    if (fs.existsSync("fonts/mplus-1m-regular.ttf")) {
        const font = new FontFace("GameFont", "url('fonts/mplus-1m-regular.ttf')");
        font.load().then(() => document.fonts.add(font));
    } else {
        const font = new FontFace("GameFont", "local(Arial)");
        font.load().then(() => document.fonts.add(font));
    }

    MULI.IgnoreNotFound.alias["Bitmap.prototype._requestImage"] = PluginManager.alias(Bitmap.prototype, "_requestImage");
    Bitmap.prototype._requestImage = function(url) {
        if (!Decrypter.hasEncryptedImages) {
            if (!fs.existsSync(url)) {
                url = "img/Empty.png";
            }
        }
        MULI.IgnoreNotFound.alias["Bitmap.prototype._requestImage"].call(this, url);
    };

    MULI.IgnoreNotFound.alias["WebAudio.prototype._load"] = PluginManager.alias(WebAudio.prototype, "_load");
    WebAudio.prototype._load = function(url) {
        if (!Decrypter.hasEncryptedAudio) {
            if (!fs.existsSync(url)) {
                url = "audio/Empty.ogg";
            }
        }
        MULI.IgnoreNotFound.alias["WebAudio.prototype._load"].call(this, url);
    };
}
