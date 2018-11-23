#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface CTFDetector : CDVPlugin 
{}

+ (NSString*)deviceEnvironment;

- (void)getDeviceEnvironment:(CDVInvokedUrlCommand*)command;

@end
