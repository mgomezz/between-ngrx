import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from "src/app/shared/helpers/CustomValidators";
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
    this.initializeUserForm();

    if (this.userId) {
      this.getUser();
      return;
    }

    this.setFormTitle();
  }

  initializeUserForm(): void {
    this.userForm = this.formBuilder.group(
      {
        firstname: ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        birthday: [
          null,
          [Validators.required, CustomValidators.minimumAge(18)],
        ],
        username: ["", [Validators.required]],
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
        repeatPassword: ["", [Validators.required]],
      },
      {
        validator: CustomValidators.mustMatch("password", "repeatPassword"),
      },
      
    );
  }

  getUser(): void {
    this.usersService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.userForm.patchValue(user);
        this.setFormTitle(user);
      },
      (error: HttpErrorResponse) => {}
    );
  }

  setFormTitle(user?: User): void {
    if (user) {
      this.title = "Edit user: " + user.firstname + " " + user.lastname;
      return;
    }

    this.title = "Create new user";
  }

  test(): void {
    let test = this.userForm.get("birthday").value;
  }
}
