import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/shared/models/user";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  userId: string = "";
  title: string = "";
  loading: boolean = true;
  userForm: FormGroup = new FormGroup({});

  public roles = [
    { label: "Admin", value: "admin" },
    { label: "Writer", value: "writer" },
    { label: "Reader", value: "reader" },
  ];

  public categories = [
    { label: "Programming language", value: "language" },
    { label: "Design", value: "design" },
    { label: "Engineering", value: "engineering" },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"];
    console.log(this.userId);
    this.initializeUserForm();
    this.getUser();
    this.loading = false;
  }

  initializeUserForm(): void {
    this.userForm = this.formBuilder.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  getUser(): void {
    this.usersService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
        console.log(user);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
