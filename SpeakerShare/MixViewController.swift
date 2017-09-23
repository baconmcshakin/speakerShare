//
//  MixViewController.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/19/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit

class MixViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBAction func leaveMixButton(_ sender: Any) {
        
        let mix = CurrentMix.sharedInstance.myMix[0]
        
        
        SocketIOManager.sharedInstance.leaveMix(mix: mix, completionHandler: { (res) -> Void in
            DispatchQueue.main.async(execute: { () -> Void in
                
                if res != nil {
                    if res!["status"]?.integerValue == 1 {
                        self.performSegue(withIdentifier: "leaveMixtapeFromMix", sender: nil)
                        
                    }
                }
            })
        })
    }
}
