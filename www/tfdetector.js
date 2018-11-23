
var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var utils = require('cordova/utils');
var exec = require('cordova/exec');
var cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function TFDetector () {
    this.available = false;
    this.platform = null;
    this.cordova = null;
    this.manufacturer = null;
    this.isTestFlight = null;

    var me = this;

    channel.onCordovaReady.subscribe(function () {
        me.getInfo(function (info) {
            // ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
            // TODO: CB-5105 native implementations should not return info.cordova
            var buildLabel = cordova.version;
            me.available = true;
            me.platform = info.platform;
            me.cordova = buildLabel;
            me.isTestFlight = info.isTestFlight;
            me.manufacturer = info.manufacturer || 'unknown';
            channel.onCordovaInfoReady.fire();
        }, function (e) {
            me.available = false;
            utils.alert('[ERROR] Error initializing Cordova: ' + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
TFDetector.prototype.getInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'TFDetector.getInfo', arguments);
    exec(successCallback, errorCallback, 'TFDetector', 'getTFDetectorInfo', []);
};

module.exports = new TFDetector();
