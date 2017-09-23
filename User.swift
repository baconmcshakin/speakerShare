//
//  User.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/21/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation

struct User {
    // No need for these properties to be Implicitly Unwrapped Optionals since you initialize all of them
    var name: String
    var email: String?
    var id: String
    var token: String
    
    init (name: String, email: String?, id: String, token: String) {
        self.name = name
        self.email = email
        self.id = id
        self.token = token
        
    }
    
    func toJSON() -> Any? {
        let props = ["name": self.name, "email": self.email, "id": self.id, "token": self.token]
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: props,
                                                      options: .prettyPrinted)
            
            let json = try? JSONSerialization.jsonObject(with: jsonData, options: [])
            return json
            
            
        } catch let error {
            print("error converting to json: \(error)")
            return nil
        }
    }

}

class CurrentUser {
    
    // Now Global.sharedGlobal is your singleton, no need to use nested or other classes
    static let sharedInstance = CurrentUser()
    var member:[User] = []
    
}

class ChannelUsers {
    
    // Now Global.sharedGlobal is your singleton, no need to use nested or other classes
    static let sharedInstance = ChannelUsers()
    var mixUsers:[Any] = []
    
}



