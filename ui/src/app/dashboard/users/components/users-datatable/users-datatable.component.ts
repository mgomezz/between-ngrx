import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/shared/models/user";
import { UsersService } from "src/app/shared/services/users.service";
import { ConfirmModalComponent } from "src/app/shared/ui-components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-users-datatable",
  templateUrl: "./users-datatable.component.html",
  styleUrls: ["./users-datatable.component.scss"],
})
export class UsersDatatableComponent implements OnInit {
  rows: User[] = [];
  modalRef: BsModalRef;

  columns = [
    { name: "First name" },
    { name: "Last name" },
    { name: "Username" },
    { name: "Email" },
    { name: "Role" },
    { name: "Birthday" },
  ];

  constructor(
    private usersService: UsersService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(
      (users: User[]) => {
        this.rows = users;
      },
      (error: HttpErrorResponse) => {}
    );
  }

  openConfirmationDialog(userId: string): void {
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      class: "modal-sm",
      initialState: {
        title: "Delete user",
        message: "Are you sure to want to delete this user?",
        callback: (result: boolean) => {
          if (result) {
            this.deleteUser(userId);
          }
        },
      },
    });
  }

  deleteUser(userId: string): void {
    this.usersService.delete(userId).subscribe((user: User) => {
      this.rows = this.rows.filter((usr) => usr.id !== user.id);
    });
  }
}
