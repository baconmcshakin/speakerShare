//
//  LoginScreen.swift
//  SpeakerShare
//
//  Created by Ethan Horing on 9/21/17.
//  Copyright © 2017 Ethan and Kyle. All rights reserved.
//

import Foundation
import UIKit

import FBSDKCoreKit
import FBSDKLoginKit


class  LoginScreen: UIViewController, FBSDKLoginButtonDelegate{
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginButton = FBSDKLoginButton()
        loginButton.center = view.center
        loginButton.readPermissions = ["public_profile", "email"]
        loginButton.delegate = self
        view.addSubview(loginButton)
    }
    
    
    func loginButton(_ loginButton: FBSDKLoginButton!, didCompleteWith result: FBSDKLoginManagerLoginResult!, error: Error!) {
        
        if error != nil {
            print (error)
        }
        else if result.isCancelled {
            print("user has cancelled login")
        }
        // logged in
        else {
            if result.grantedPermissions.contains("public_profile") &&  result.grantedPermissions.contains("email"){
                if let graphRequest = FBSDKGraphRequest(graphPath: "me", parameters: ["fields": "id,email,name"]) {
                    graphRequest.start(completionHandler: {(connection, result, error) in
                        if error != nil {
                            print(error!)
                        }
                        else {
                            if let data:NSDictionary = result as? NSDictionary{
                                //print(data)
                                
                                let id = data["id"] as! String
                                let email = data["email"] as! String
                                let name = data["name"] as! String
                                let accessToken = FBSDKAccessToken.current().tokenString as String
             
                            
                                let user = User(name: name, email: email, id: id, token: accessToken)
                                

                                let singleton = CurrentUser.sharedInstance
                                singleton.member.append(user)
                                
                                SocketIOManager.sharedInstance.authenticateUser(user: user, completionHandler: { (res) -> Void in
                                    DispatchQueue.main.async(execute: { () -> Void in
                                        print("authing")
                                        if res != nil {
                                            if res!["status"]?.integerValue == 1 {
                                               self.performSegue(withIdentifier: "facebookLoginSegue", sender: nil)
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    })
                }
            }
        }
    }
    
    
    func loginButtonDidLogOut(_ loginButton: FBSDKLoginButton!) {
        
        
        SocketIOManager.sharedInstance.logoutFacebook(completionHandler: { (res) -> Void in
            DispatchQueue.main.async(execute: { () -> Void in
                
                if res != nil {
                    if res!["status"]?.integerValue == 1 {
                       print("nice")
                        
                    }
                }
            })
        })
    
    }
}
