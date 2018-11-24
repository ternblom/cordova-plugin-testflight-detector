/**
 * This plugin defines a global device object, which describes the device's hardware and software.
 * Although the object is in the global scope, it is not available until after the deviceready event.
 */
interface TFDetector {
    /** Indicates that Cordova initialize successfully. */
    available: boolean;
    /** Get the device's manufacturer. */
	manufacturer: string;
    /** Get the device's operating system name. */
    platform: string;
	/** Whether the device is running on TestFlight. */
    isTestFlight: boolean;
    /** Whether the device is running on AppStore environment. */
    isAppStore: boolean;
    /** Whether the device is running on a simulator. */
    isVirtual: boolean;
}

declare var tfdetector: TFDetector;