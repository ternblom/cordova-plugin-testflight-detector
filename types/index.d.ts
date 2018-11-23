/**
 * This plugin defines a global device object, which describes the device's hardware and software.
 * Although the object is in the global scope, it is not available until after the deviceready event.
 */
interface TFDetector {
    /** Get the version of Cordova running on the device. */
    cordova: string;
    /** Indicates that Cordova initialize successfully. */
    available: boolean;
    /** Get the device's operating system name. */
    platform: string;
	/** Get the device's manufacturer. */
	manufacturer: string;
	/** Whether the device is running on TestFlight. */
    isTestFlight: boolean;
    /** Whether the device is running on a simulator. */
	isVirtual: boolean;}

declare var device: TFDetector;