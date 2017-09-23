//
//  SocketIOManager.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/18/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import UIKit
import SocketIO

class SocketIOManager: NSObject {
    static let sharedInstance = SocketIOManager()
    
    
    override init() {
        super.init()
    }
    
    var socket: SocketIOClient = SocketIOClient(socketURL: URL(string: "http://vnx.local:3000")!)
    
    //var socket: SocketIOClient = SocketIOClient(socketURL: URL(string: "http://localhost:3000")!)
    
    
    func establishConnection() {
        print("attempting to connect")
        socket.connect()
    }
    
    func closeConnection() {
        print("attempting to disconnect")
        socket.disconnect()
    }
    
    
    func authenticateUser(user: User, completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {

        socket.emitWithAck("authenticate", user.toJSON()! as! SocketData).timingOut(after: 0, callback: {dataArray in
            
            print("hello")
            if let data = dataArray[0] as? [String: AnyObject] {
                completionHandler(data)
                
            }
            
            self.listenForOtherMessages()
        })

    }
    
    
    
    func leaveMix(mix: Mixtape, completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {
        
        socket.emitWithAck("leave mix", mix.name).timingOut(after: 0, callback: {dataArray in
            
            if let data = dataArray[0] as? [String: AnyObject] {
                print (data)
                CurrentMix.sharedInstance.myMix.removeAll()
                print("nice")

                completionHandler(data)

                
            }
        })
    }
    
    
    
    func joinMix(mix: Mixtape, completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {
        
        
        socket.emitWithAck("join mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: {dataArray in
            
            if let data = dataArray[0] as? [String: AnyObject] {
                print (data)
                completionHandler(data)
                
            }
        })
        
    }
    
    
    func createMix(mix: Mixtape, completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {
        
        socket.emitWithAck("create mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: { dataArray in
            
            if let data = dataArray[0] as? [String: AnyObject] {
                completionHandler(data)
                
            }
        })
    }
    
    func logoutFacebook(completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {
        
        socket.emitWithAck("logout").timingOut(after: 0, callback: {dataArray in
            
            if let data = dataArray[0] as? [String: AnyObject] {
                print (data)
                completionHandler(data)
                
            }
        })

        
    }
    
    func destroyMix(mix: Mixtape, completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {
    }
    
    
    fileprivate func listenForOtherMessages() {
        socket.on("userConnectUpdate") { (dataArray, socketAck) -> Void in
            ChannelUsers.sharedInstance.mixUsers = dataArray
        }
    }
}
