//
//  AddSongViewController.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/20/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit

class AddSongViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBAction func leaveChannelButton(_ sender: UIBarButtonItem) {
        
        performSegue(withIdentifier: "addSongsToHome", sender: nil)
    }
}
