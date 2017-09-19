//
//  CreateMixtape.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/13/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit
import SocketIO


class CreateMixtape: UIViewController, UITextFieldDelegate{
    
    @IBOutlet weak var mixNameField: UITextField!
    @IBOutlet weak var passwordTextfield: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    
    
    @IBAction func createMixtapeButton(_ sender: UIButton) {
        
        let mixName = mixNameField.text
        let password = passwordTextfield.text
        let description = descriptionTextField.text
        
        
        let mix = Mixtape(name: mixName!, password: password!, description: description)
        
        print(mix.name)
        print(mix.password!)
        print(mix.description!)
        
        SocketIOManager.sharedInstance.createMix(mix: mix)
        
    }
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
        
        
        self.mixNameField.delegate = self
        self.passwordTextfield.delegate = self
        self.descriptionTextField.delegate = self

        NotificationCenter.default.addObserver(self, selector: #selector(ViewController.keyboardWillShow), name: NSNotification.Name.UIKeyboardWillShow, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(ViewController.keyboardWillHide), name: NSNotification.Name.UIKeyboardWillHide, object: nil)
        
        passwordTextfield.keyboardType = UIKeyboardType.numberPad

        
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
        if (descriptionTextField.isFirstResponder) {
            
            if let keyboardSize = (notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
                if self.view.frame.origin.y == 0{
                    self.view.frame.origin.y -= keyboardSize.height
                }
            }
        }
        
    }
    
    func keyboardWillHide(notification: NSNotification) {
        if (descriptionTextField.isFirstResponder) {
            
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
