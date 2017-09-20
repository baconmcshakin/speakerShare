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
        socket.disconnect()
    }
    
    func joinMix(mix: Mixtape) {
        
        socket.emitWithAck("join mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: { data in
            print("this happened ")
            
            let dataArray = data as NSArray
            let dataString = dataArray[0] as! String
            
            let dataNewNow = dataString.data(using: String.Encoding.utf8, allowLossyConversion: false)!
            
            do {
                let json = try JSONSerialization.jsonObject(with: dataNewNow, options: []) as! [String: AnyObject]
                
                let str = json["status"] as! Int
               // let str2 = str[0] as! NSDictionary
                
                print(str)
                
            } catch let error as NSError {
                print("Failed to load: \(error.localizedDescription)")
            }

            
        })
    }
    
    func createMix(mix: Mixtape) {
        
        socket.emitWithAck("create mix", mix.toJSON()! as! SocketData).timingOut(after: 0, callback: { data in
            
            
            /*
            if (((data[0] as AnyObject).status as! Int) == 1) {
                JoinMixtapeAuth().performSegue(withIdentifier: "segueToChannelScreen", sender: nil)
            }*/

        })
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
