//
//  UsersInMixtapeViewController.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/20/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit

class UsersInMixtapeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBAction func leaveChannelButton(_ sender: UIBarButtonItem) {
        
        performSegue(withIdentifier: "usersToHome", sender: nil)
    }
}
