#include "TargetConditionals.h"

#import <Cordova/CDV.h>
#import "CTFDetector.h"

@implementation CTFDetector

- (void)getDeviceEnvironment:(CDVInvokedUrlCommand*)command
{
    NSDictionary* deviceProperties = [self deviceProperties];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:deviceProperties];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSDictionary*)deviceProperties
{
    UIDevice* device = [UIDevice currentDevice];

    return @{
             @"manufacturer": @"Apple",
             @"platform": @"iOS",
             @"isTestFlight": @([self isTestFlight])
             @"isVirtual": @([self isVirtual])
             };
}

- (BOOL)isTestFlight
{
    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    NSString *receiptURLString = [receiptURL path];
    BOOL isRunningTestFlightBeta = ([receiptURLString rangeOfString:@"sandboxReceipt"].location != NSNotFound);
    
    if (isRunningTestFlightBeta) {
        /*NSString *thingToReturn = @"TESTFLIGHT";
        NSLog(@"Value of string is %@", thingToReturn);*/
        return true;
        
    } else {
        NSString *thingToReturn = @"PRODUCTION";
        /*NSLog(@"Value of string is %@", thingToReturn);
        NSLog(@"%@", receiptURLString);*/
        return false;
    }
}

- (BOOL)isVirtual
{
    #if TARGET_OS_SIMULATOR
        return true;
    #elif TARGET_IPHONE_SIMULATOR
        return true;
    #else
        return false;
    #endif
}

@end
