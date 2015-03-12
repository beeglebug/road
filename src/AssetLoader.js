var PixiAssetLoader = require('lib/pixi/pixi').AssetLoader;

/**
 * @extends PixiAssetLoader
 * @param assetURLs
 * @param crossorigin
 * @constructor
 */
var AssetLoader = function(assetURLs, crossorigin) {

    assetURLs = assetURLs || [];

    PixiAssetLoader.call(this, assetURLs, crossorigin);
};

AssetLoader.prototype = Object.create(PixiAssetLoader.prototype);

AssetLoader.prototype.load = function() {

    if(this.assetURLs.length == 0) {
        return this.emit('onComplete', { content: this });
    }

    return PixiAssetLoader.prototype.load.call(this);
};

AssetLoader.prototype.add = function(asset) {

    this.assetURLs.push(asset);
};

module.exports = AssetLoader;