import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing a dialog box displaying director info
 * @selector: 'app-director-info'
 * @templateUrl: './director-info.component.html'
 * @styleUrls: ['./director-info.component.scss']
 */

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {

  /**
   * Called when creating an instance of the class
   * @constructor
   * @param data pulled from the director object 
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string
    }
  ) { }

  ngOnInit(): void {
  }

}