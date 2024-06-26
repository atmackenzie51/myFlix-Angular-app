import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing a dialog box displaying info about a genre
 * @selector: 'app-genre-info'
 * @templateUrl: './genre-info.component.html'
 * @styleUrls: ['./genre-info.component.scss']
 */

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})

export class GenreInfoComponent implements OnInit {

  /**
   * Called when creating an instance of the class
   * @constructor
   * @param data pulled from the genre object 
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string
    }
  ) { }

  ngOnInit(): void {
  }

}