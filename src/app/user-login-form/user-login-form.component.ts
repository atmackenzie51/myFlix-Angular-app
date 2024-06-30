// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/** Interface representing user login data. */
interface UserData {
  Username: string;
  Password: string;
}

/**
 * Component for user login form.
 * @selector 'app-user-login-form'
 * @templateUrl './user-login-form.component.html'
 * @styleUrls ['./user-login-form.component.scss']
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /** Input data for user login. */
  @Input() userData: UserData = { Username: "", Password: "" };

  /**
   * Constructor of UserLoginFormComponent.
   * @param fetchApiData Service for fetching API data.
   * @param dialogRef Reference to the MatDialog instance for the login form.
   * @param snackBar Service for displaying notifications.
   * @param router Angular router for navigation.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   * Logs the userData object to the console.
   */
  ngOnInit(): void {
    console.log(this.userData);
  }

  /**
   * Attempts to log in the user.
   * Sends the user login data to the backend and handles success or failure responses.
   */
  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      console.log(result.user);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(`Login successful.`, "OK", {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open("Login unsuccessful", "OK", {
        duration: 2000
      });
    });
  }

}
