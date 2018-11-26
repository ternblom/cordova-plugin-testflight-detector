#import "TFDetector.h"
#import <Cordova/CDVPluginResult.h>

@implementation TFDetector

- (void)getInfo : (CDVInvokedUrlCommand *)command
{
    NSString * callbackId = command.callbackId;
    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    NSString *receiptURLString = [receiptURL path];
    BOOL isRunningTestFlightBeta = ([receiptURLString rangeOfString:@"sandboxReceipt"].location != NSNotFound);
    
    if (isRunningTestFlightBeta) {
        NSString * isTestFlight = @"YES";
        CDVPluginResult * pluginResult =[CDVPluginResult resultWithStatus : CDVCommandStatus_OK messageAsString : isTestFlight];
        [self.commandDelegate sendPluginResult : pluginResult callbackId : callbackId];   
    } else {
        NSString * isTestFlight = @"NO";
        CDVPluginResult * pluginResult =[CDVPluginResult resultWithStatus : CDVCommandStatus_OK messageAsString : isTestFlight];
        [self.commandDelegate sendPluginResult : pluginResult callbackId : callbackId];
    }
}

@end
