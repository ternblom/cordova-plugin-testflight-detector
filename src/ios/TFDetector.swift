@objc(TFDetector)
class TFDetector : CDVPlugin {

    func getInfo(_ command: CDVInvokedUrlCommand) {
        var pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR)
        
        let responseMessages = [
            "manufacturer": "Apple",
            "platform": "iOS",
            "isTestFlight": isRunningInTestFlightEnvironment(),
            "isAppStore": isRunningInAppStoreEnvironment(),
            "isVirtual": isSimulator()
            ] as [String : Any]
        
        pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: responseMessages)
        
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId)
    }
    
    func isRunningInTestFlightEnvironment() -> Bool{
        if isSimulator() {
            return false
        } else {
            if isAppStoreReceiptSandbox() && !hasEmbeddedMobileProvision() {
                return true
            } else {
                return false
            }
        }
    }
    
    func isRunningInAppStoreEnvironment() -> Bool {
        if isSimulator(){
            return false
        } else {
            if isAppStoreReceiptSandbox() || hasEmbeddedMobileProvision() {
                return false
            } else {
                return true
            }
        }
    }
    
    private func hasEmbeddedMobileProvision() -> Bool{
        if let _ = Bundle.main.path(forResource: "embedded", ofType: "mobileprovision") {
            return true
        }
        return false
    }
    
    private func isAppStoreReceiptSandbox() -> Bool {
        if isSimulator() {
            return false
        } else {
            let appStoreReceiptURL = Bundle.main.appStoreReceiptURL
            let appStoreReceiptLastComponent = appStoreReceiptURL?.lastPathComponent
            
            if appStoreReceiptLastComponent == "sandboxReceipt" {
                return true
            }
            return false
        }
    }
    
    private func isSimulator() -> Bool {
        /*#if targetEnvironment(simulator)
            return true
        #else
            return false
        #endif*/
        
        #if arch(i386) || arch(x86_64)
            return true
        #else
            return false
        #endif
    }
}
