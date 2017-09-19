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
    
    /* var s : SocketIOClient = SocketIOClient(socketURL: URL(string: "http://vnx.local:3000"), config: ["nsp": "swift"]) */
    
    
    func establishConnection() {
        print("attempting to connect")
        
        //socket.joinNamespace("/mix")
        //print(socket.nsp)
        
        /*
        socket.on("connect") {data, ack in
            print("socket connected")
        }*/

    
       socket.connect()

    }
    
    
    func closeConnection() {
        socket.disconnect()
    }
    
    func joinMix(mix: Mixtape) {
        socket.emitWithAck("join mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: { data in
            print(data)
        })
    }
    
    func createMix(mix: Mixtape) {
        
        socket.emitWithAck("create mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: { data in
            print(data)
    })
        
        
        // newMix: true/false
        // name: String
        // password
        // description
    }
    
    
    /*
     socket?.on("connect") {data, ack in
     self.socket?.emit("arbitrary", "ethans")
     
     
     socket?.emit("join mix", channelName!)
     
     //socket?.emitWithAck("view room", channelName!)
     
     socket?.emitWithAck("view mix users", channelName!).timingOut(after: 0, callback: { data in
     print(data)
     })
     
     
     //let channelName = mixgroupName.text
     
     }*/
    
    
    
    
    
    
    /*
     print("button pressed")
     
     socket?.emit("join mix", channelName!)
     
     //socket?.emitWithAck("view room", channelName!)
     
     socket?.emitWithAck("view mix users", channelName!).timingOut(after: 0, callback: { data in
     print(data)
     })
     */
    
    
    

}
