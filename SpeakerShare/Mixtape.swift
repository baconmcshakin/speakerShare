//
//  Mixtape.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/18/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation

struct Mixtape {
    var name: String
    var pass: String?
    var description: String?
    

    init(name: String, pass: String? = nil, description: String? = nil) {
        self.name = name
        self.pass = pass
        self.description = description
    }
    
    func toJSON() -> Any? {
        let props = ["name": self.name, "pass": self.pass, "description": self.description]
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
