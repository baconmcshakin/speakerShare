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
        
          performSegue(withIdentifier: "leaveMixtapeFromMix", sender: nil)
    }
}
