//
//  ViewController.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/12/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import UIKit
import SocketIO
import FBSDKCoreKit

class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, UITextFieldDelegate{
    
    @IBOutlet weak var mixgroupLabel: UITextField!
    var socket : SocketIOClient?
    var channelName: String = ""
    
    
    @IBAction func joinChannelButton(_ sender: UIButton) {
        //FBSDKAccessToken.current().userID
        
        
        channelName = mixgroupLabel.text!
        if (!channelName.isEmpty) {
            performSegue(withIdentifier: "segueToJoin", sender: nil)
        }
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "segueToJoin" {
            
            let secondViewController = segue.destination as! JoinMixtapeAuth
            secondViewController.channelName = channelName
            
        }
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        print(CurrentUser.sharedInstance.member[0])
        
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
        
        
        self.mixgroupLabel.delegate = self
        
        
        NotificationCenter.default.addObserver(self, selector: #selector(ViewController.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(ViewController.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        
        
        
    }
    
    internal func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        return cell
    }
    
    internal func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10
    }

    
    func dismissKeyboard() {
        //Causes the view (or one of its embedded text fields) to resign the first responder status.
        view.endEditing(true)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        self.view.endEditing(true)
        return false
    }
    
    func keyboardWillShow(notification: NSNotification) {
        print(notification)
        if (mixgroupLabel.isFirstResponder) {
            
            if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
                if self.view.frame.origin.y == 0{
                    self.view.frame.origin.y -= keyboardSize.height
                }
            }
        }
    }
    
    func keyboardWillHide(notification: NSNotification) {
        if (mixgroupLabel.isFirstResponder) {
            
            if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
                if self.view.frame.origin.y != 0{
                    self.view.frame.origin.y += keyboardSize.height
                }
            }
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
}

