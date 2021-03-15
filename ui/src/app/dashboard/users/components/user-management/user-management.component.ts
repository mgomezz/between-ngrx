import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from "src/app/shared/helpers/CustomValidators";
import { Guid } from "src/app/shared/helpers/Guid";
import { User } from "src/app/shared/models/user";
import { LoaderService } from "src/app/shared/services/loader.service";
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
    private usersService: UsersService,
    public loaderService: LoaderService
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
        email: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        repeatPassword: ["", [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [
          CustomValidators.mustMatch("password", "repeatPassword"),
          CustomValidators.mustMatch("repeatPassword", "password"),
        ],
      }
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
    let user: User = {
      id: Guid.newGuid(),
      firstname: this.userForm.get("firstname").value,
      lastname: this.userForm.get("lastname").value,
      username: this.userForm.get("username").value,
      email: this.userForm.get("email").value,
      password: this.userForm.get("password").value,
      birthday: this.userForm.get("birthday").value,
      role: "admin",
      skills: [],
    };

    this.usersService.create(user).subscribe((user: User) => {
      this.router.navigate(["dashboard/users"], { replaceUrl: true });
    });
  }
}
