
var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var utils = require('cordova/utils');
var exec = require('cordova/exec');

channel.createSticky('onTestFlightInfoReady');
channel.waitForInitialization('onTestFlightInfoReady');

function TFDetector () {
    this.available = false;
    this.cordova = null;
              
    this.manufacturer = null;
    this.platform = null;
    this.isTestFlight = null;
    this.isAppStore = null;
    this.isVirtual = null;
                
    var me = this;
              
    channel.onCordovaReady.subscribe(function () {
        me.getInfo(
            function (info) {
                me.available = true;
                me.manufacturer = info.manufacturer || 'unknown';
                me.platform = info.platform;
                me.isTestFlight = info.isTestFlight;
                me.isAppStore = info.isAppStore;
                me.isVirtual = info.isVirtual;
                
                channel.onTestFlightInfoReady.fire();
            },
            function (e) {
                me.available = false;
                utils.alert('[ERROR] Error initializing Cordova: ' + e);
            }
        );
    });
}

TFDetector.prototype.getInfo = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'TFDetector.getInfo', arguments);
    exec(successCallback, errorCallback, 'TFDetector', 'getInfo', []);
};

TFDetector.prototype.isRunningInTestFlightEnvironment = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'TFDetector.isRunningInTestFlightEnvironment', arguments);
    exec(successCallback, errorCallback, 'TFDetector', 'isRunningInTestFlightEnvironment', []);
};

TFDetector.prototype.isRunningInAppStoreEnvironment = function (successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'TFDetector.isRunningInAppStoreEnvironment', arguments);
    exec(successCallback, errorCallback, 'TFDetector', 'isRunningInAppStoreEnvironment', []);
};

module.exports = new TFDetector();
