import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-users-datatable",
  templateUrl: "./users-datatable.component.html",
  styleUrls: ["./users-datatable.component.scss"],
})
export class UsersDatatableComponent implements OnInit {
  rows: User[] = [];

  columns = [
    { name: "First name" },
    { name: "Last name" },
    { name: "Username" },
    { name: "Email" },
    { name: "Role" },
    { name: "Birthday" },
  ];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      (users: User[]) => {
        this.rows = users;
      },
      (error: HttpErrorResponse) => {}
    );
  }

  edit(value) {
    console.log(value);
  }

  delete(value) {
    console.log(value);
  }
}