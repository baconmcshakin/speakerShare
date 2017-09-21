//
//  JoinMixtapeAuth.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/18/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit



protocol typingScreenAnimations {
    func highlightPassButtons(index: Int, pass: String)
    func deleteHighlight(index: Int)
}

class PinInput: UIControl, UIKeyInput, UITextInputTraits {
    
    var password: String = ""
    
    // let vc = SecondVC()
    // vc.delegate = selfvar delegate: typingScreenAnimations?
    
    var delegate:typingScreenAnimations!
    
    
    
    public var hasText: Bool = false
    
    public func insertText(_ digit: String){
        
        if (password.characters.count < 4) {
            password.append(digit)
            
            delegate.highlightPassButtons(index: password.characters.count - 1, pass: password)
        }
        
    }
    
    public func deleteBackward(){
        if (!password.isEmpty) {
            let index = password.index(password.endIndex, offsetBy: -1)
            password = password.substring(to: index)
            
            delegate.deleteHighlight(index: password.characters.count)
            
            
        }
    }
    
    override var canBecomeFirstResponder: Bool { return true }
    
    var keyboardType: UIKeyboardType {
        get {
            return UIKeyboardType.numberPad
        }
        set {
            
        }
    }
    
    
    var keyboardAppearance: UIKeyboardAppearance {
        get {
            return UIKeyboardAppearance.dark
            
        }
        set {
            
        }
    }
    
}

class JoinMixtapeAuth: UIViewController, typingScreenAnimations {
    
    @IBOutlet var passcodeBubble: [UIImageView]!
    @IBOutlet weak var channelNameLabel: UILabel!
    @IBOutlet weak var pinKeyboard: PinInput!
    
    var channelName: String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        channelNameLabel.text = channelName
        self.pinKeyboard.becomeFirstResponder()
        self.pinKeyboard.keyboardType = UIKeyboardType.numberPad
        self.pinKeyboard.keyboardAppearance = UIKeyboardAppearance.dark;
        self.pinKeyboard.delegate = self
        
        
    }
    
    func highlightPassButtons(index: Int, pass: String) {
        passcodeBubble[index].image = passcodeBubble[index].highlightedImage
        
        if index == 3 {
            let mix = Mixtape(name: channelName, pass: pass, description: "")
            
            
            
            SocketIOManager.sharedInstance.joinMix(mix: mix, completionHandler: { (res) -> Void in
                DispatchQueue.main.async(execute: { () -> Void in
                    
                    if res != nil {
                        if res!["status"]?.integerValue == 1 {
                            self.performSegue(withIdentifier: "segueToChannelScreen", sender: nil)
                            
                        }
                    }
                })
            })

        }
    }
    
    func test() {
        print("workng")
        performSegue(withIdentifier: "segueToChannelScreen", sender: nil)
    }
    
    func deleteHighlight(index: Int) {
        passcodeBubble[index].image = UIImage(named: "unfilledPassDot")
    }
    
}
