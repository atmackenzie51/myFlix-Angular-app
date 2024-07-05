// src/app/user-profile/user-profile.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user profile.
 * @selector 'app-user-profile'
 * @templateUrl './user-profile.component.html'
 * @styleUrls ['./user-profile.component.scss']
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  /** Input data for user profile. */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };

  /** Array to hold favorite movies of the user. */
  FavoriteMovies: any[] = [];

  /** Array to hold all movies. */
  movies: any[] = [];

  /** Object to store user profile data. */
  user: any = {};

  /**
   * Constructor of UserProfileComponent.
   * @param fetchProfile Service for fetching user profile data.
   * @param snackBar Service for displaying notifications.
   * @param router Angular router for navigation.
   */
  constructor(
    public fetchProfile: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook called after component initialization.
   * Calls userProfile() and getFavMovies() methods to populate user profile data.
   */
  ngOnInit(): void {
    this.userProfile();
    this.getFavMovies();
  }

  /**
   * Retrieves user profile data from the backend.
   * Populates userData with user profile information and formats the birthday.
   */
  userProfile(): void {
    this.user = this.fetchProfile.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Password = this.user.Password;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.formatDate(this.user.Birthday);
    this.fetchProfile.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Formats a given date string to YYYY-MM-DD format.
   * @param dateString The date string to format.
   * @returns Formatted date string (YYYY-MM-DD).
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Updates user profile information.
   * Displays success or error notifications using snackBar.
   */
  updateProfile(): void {
    this.fetchProfile.editUser(this.userData).subscribe({
      next: (response) => {
        console.log('Profile Updated to:', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.snackBar.open('Profile updated successfully', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Failed to update profile', 'OK', {
          duration: 2000
        });
      }
    });
  }

  /**
   * Deletes user account.
   * Prompts user for confirmation and handles success or error cases.
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Attempting to delete user:', this.userData.Username);
      this.fetchProfile.deleteUser().subscribe({
        next: () => {
          console.log('Deleted user:', this.userData.Username);
          localStorage.clear();
          console.log('Local storage cleared');
          this.navigateToWelcomeScreen();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Failed to delete user. Please try again later.', 'OK', {
            duration: 3000
          });
        }
      });
    }
  }

  /**
   * Navigates to the welcome screen.
   * Logs navigation success or failure to console.
   */
  private navigateToWelcomeScreen(): void {
    console.log('Attempting to navigate to welcome screen');
    this.router.navigate(['welcome']).then(() => {
      console.log('Navigation to welcome screen successful');
    }).catch((err) => {
      console.error('Navigation to welcome screen failed', err);
    });
  }

  /**
   * Retrieves favorite movies of the user from the backend.
   * Populates userData with favorite movie data.
   */
  getFavMovies(): void {
    this.user = this.fetchProfile.getOneUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
  }

}
