// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /** Input data for user registration. */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor of UserRegistrationFormComponent.
   * @param fetchApiData Service for user registration API calls.
   * @param dialogRef Reference to the dialog opened for user registration.
   * @param snackBar Service for displaying notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // Initialization logic here
  }

  /**
   * Sends the user registration data to the backend.
   * Closes the dialog on successful registration and displays a success message.
   * @returns void
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (errorResponse) => {
      console.error(errorResponse);
      this.snackBar.open(errorResponse.error, 'OK', {
        duration: 2000
      });
    });
  }

}
