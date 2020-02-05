import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  Address?: string;
  phoneNumber?: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService {
  user: Observable<User>;
  userData: User ;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning

  ) {
    // Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData.uid));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })




  }



 


 // Sign in with email/password
   SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('account created successfully!');
        return result.user
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
    }



  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
  
  

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


   // Sign in with Google
   GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }


  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }


  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

 // Sets user data to firestore on sigin
 private SetUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const data: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.name,
    Address: user.Address,
    phoneNumber: user.phoneNumber,

  };
  return userRef.set(data, { merge: true });
}


// // signup a new user(by email/password ) to our firebase
// emailSignUp(email: string, password: string, name: string) {
//   return this.afAuth.auth
//     .createUserWithEmailAndPassword(email, password)
//     .then((credential) => {
//       console.log('Signup successfully!');
//       this.router.navigate(['/login']);
//       return this.updateUserData(credential.user, name);
//     })
//     .catch(error => this.handleError(error));
// }
//   updateUserData(user: import("firebase").User, name: string): any {
//     throw new Error("Method not implemented.");
//   }
//   handleError(error: any): any {
//     throw new Error("Method not implemented.");
//   }

//   // login an existing user with email/password
// loginUser(email: string, password: string) {
//     return this.afAuth.auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(credential => {
//         console.log('account created successfully!');
//         return credential.user;
//       })
//       .catch(error => this.handleError(error));
//   }


  

  // Sends email allowing user to reset password
  // resetPassword(email: string) {
  //   const fbAuth = auth();
  //   return fbAuth
  //     .sendPasswordResetEmail(email)
  //     .then(() => console.error('Password update email sent'))
  //     .catch(error => this.handleError(error));
  // }


  //  // logout a user
  //  signOut() {
  //   this.afAuth.auth.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //   });
  // }


}
