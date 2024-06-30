import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component representing the welcome page of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Constructor of WelcomePageComponent.
   * @param dialog MatDialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // Initialization logic here
  }

  /**
   * Opens a dialog for user registration.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens a dialog for user login.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
