import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  public roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Writer', value: 'writer' },
    { label: 'Reader', value: 'reader' }
  ];

  public categories = [
    { label: 'Programming language', value: 'language' },
    { label: 'Design', value: 'design' },
    { label: 'Engineering', value: 'engineering' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

  }

  //Function to generate guid
  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
