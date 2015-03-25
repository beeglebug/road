var PixiAssetLoader = require('lib/pixi/pixi').AssetLoader;

/**
 * An extension of Pixi AssetLoader which works if no assets are added
 * and allows adding extra assets after construction
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

/**
 * Start the loading
 */
AssetLoader.prototype.load = function() {

    if(this.assetURLs.length == 0) {

        this.emit('onComplete', { content: this });

        return false;
    }

    PixiAssetLoader.prototype.load.call(this);

    return true;
};

/**
 * Add an asset to the loader
 * @param {String} asset url of asset to add
 */
AssetLoader.prototype.add = function(assets) {

    if(!Array.isArray(assets)) {
        assets = [assets];
    }

    this.assetURLs = this.assetURLs.concat(assets);
};

module.exports = AssetLoader;