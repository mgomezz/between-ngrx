import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from "src/app/shared/helpers/CustomValidators";
import { Guid } from "src/app/shared/helpers/Guid";
import { Skill } from "src/app/shared/models/skill";
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
  userForm: FormGroup;
  editing: boolean = false;
  skills: FormArray;

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
      this.editing = true;
      this.getUser();
      this.removePasswordValidators();
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
        role: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        repeatPassword: ["", [Validators.required, Validators.minLength(6)]],
        skills: this.formBuilder.array([]),
      },
      {
        validators: [
          CustomValidators.mustMatch("password", "repeatPassword"),
          CustomValidators.mustMatch("repeatPassword", "password"),
        ],
      }
    );
  }

  createSkill(skill?: Skill): FormGroup {
    return this.formBuilder.group({
      name: [skill ? skill.name : "", [Validators.required]],
      description: [skill ? skill.description : ""],
      category: [skill ? skill.category : ""],
    });
  }

  addSkill(skill?: Skill): void {
    this.skills = this.userForm.get("skills") as FormArray;
    this.skills.push(this.createSkill(skill));
  }

  deleteSkill(index: number): void {
    this.skills.removeAt(index);
  }

  mapSkills(skills: Skill[]): void {
    this.skills = this.userForm.get("skills") as FormArray;
    skills.forEach((skill) => {
      this.addSkill(skill);
    });
  }

  getUser(): void {
    this.usersService.getUserById(this.userId).subscribe((user: User) => {
      this.userForm.setValue({
        firstname: user.firstname,
        lastname: user.lastname,
        birthday: user.birthday,
        username: user.username,
        email: user.email,
        password: user.password,
        repeatPassword: user.password,
        role: user.role,
        skills: [],
      });
      this.mapSkills(user.skills);
      this.setFormTitle(user);
    });
  }

  removePasswordValidators(): void {
    this.userForm.setValidators([]);
    this.userForm.controls["password"].setErrors(null);
    this.userForm.controls["password"].clearValidators();
    this.userForm.controls["repeatPassword"].setErrors(null);
    this.userForm.controls["repeatPassword"].clearValidators();
    this.userForm.controls["repeatPassword"].updateValueAndValidity();
  }

  setFormTitle(user?: User): void {
    if (user) {
      this.title = "Edit user: " + user.firstname + " " + user.lastname;
      return;
    }

    this.title = "Create new user";
  }

  save(): void {
    let user: User = {
      id: this.userId ? this.userId : Guid.newGuid(),
      firstname: this.userForm.get("firstname").value,
      lastname: this.userForm.get("lastname").value,
      username: this.userForm.get("username").value,
      email: this.userForm.get("email").value,
      password: this.userForm.get("password").value,
      birthday: this.userForm.get("birthday").value,
      role: this.userForm.get("role").value,
      skills: this.userForm.get("skills").value,
    };

    if (this.userId) {
      this.updateUser(user);
      return;
    }

    this.createUser(user);
  }

  updateUser(user: User): void {
    this.usersService.update(user).subscribe((user: User) => {
      this.router.navigate(["dashboard/users"], { replaceUrl: true });
    });
  }

  createUser(user: User): void {
    this.usersService.create(user).subscribe((user: User) => {
      this.router.navigate(["dashboard/users"], { replaceUrl: true });
    });
  }
}
