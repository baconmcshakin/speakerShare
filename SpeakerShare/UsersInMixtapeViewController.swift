//
//  UsersInMixtapeViewController.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/20/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit

class UsersInMixtapeViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        return UITableViewCell()
        
    }

    public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        
        return 2
        
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    @IBAction func leaveChannelButton(_ sender: UIBarButtonItem) {
        
        performSegue(withIdentifier: "usersToHome", sender: nil)
    }
}
