import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users-datatable",
  templateUrl: "./users-datatable.component.html",
  styleUrls: ["./users-datatable.component.scss"],
})
export class UsersDatatableComponent implements OnInit {
  rows = [
    {
      firstName: "Austin",
      lastName: "Male",
      username: "Swimlane",
      email: "test@test.com",
      role: "admin",
      birthday: "05/05/97",
    },
  ];

  columns = [
    { name: "First name" },
    { name: "Last name" },
    { name: "Username" },
    { name: "Email" },
    { name: "Role" },
    { name: "Birthday" },
  ];

  constructor() {}

  ngOnInit() {}

  edit(value) {
    console.log(value);
  }

  delete(value) {
    console.log(value);
  }
}
