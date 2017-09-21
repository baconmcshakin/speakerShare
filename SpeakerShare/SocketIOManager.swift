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
    
    func establishConnection() {
        print("attempting to connect")
        socket.connect()
    }
    
    
    func closeConnection() {
        print("attempting to disconnect")
        socket.disconnect()
    }
    
    
    func joinMix(mix: Mixtape, completionHandler: @escaping (_ mixModel: [String: AnyObject]?) -> Void) {
        
        
        socket.emitWithAck("join mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: {dataArray in
            
            if let data = dataArray[0] as? [String: AnyObject] {
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
    
    
    
    
    fileprivate func listenForOtherMessages() {
        
    }

}
