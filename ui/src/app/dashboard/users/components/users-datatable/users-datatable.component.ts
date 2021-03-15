import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { User } from "src/app/shared/models/user";
import { UsersService } from "src/app/shared/services/users.service";
import { ConfirmModalComponent } from "src/app/shared/ui-components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-users-datatable",
  templateUrl: "./users-datatable.component.html",
  styleUrls: ["./users-datatable.component.scss"],
})
export class UsersDatatableComponent implements OnInit, OnChanges {
  @Input() searchValue: string;

  rows: User[] = [];
  temp: User[] = [];

  modalRef: BsModalRef;
  ColumnMode = ColumnMode;

  columns = [
    { name: "First name" },
    { name: "Last name" },
    { name: "Username" },
    { name: "Email" },
    { name: "Role" },
    { name: "Birthday" },
  ];

  @ViewChild(DatatableComponent, null) table: DatatableComponent;

  constructor(
    private usersService: UsersService,
    private modalService: BsModalService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["searchValue"].currentValue != undefined) {
      this.updateFilter(changes["searchValue"].currentValue);
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.temp = users;
      this.rows = users;
    });
  }

  updateFilter(searchValue: string) {
    let val = searchValue.toLowerCase();
    // get the amount of columns in the table
    let colsAmount = this.columns.length;
    // get the key names of each column in the dataset
    if (this.temp.length > 0) {
      let keys = Object.keys(this.temp[0]);
      // assign filtered matches to the active datatable
      this.rows = this.temp.filter(function (item) {
        // iterate through each row's column data
        for (let i = 0; i < colsAmount; i++) {
          // check for a match
          if (
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
            !val
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      });
      // whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }
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
      let users = this.rows.filter((usr) => usr.id !== user.id);
      this.rows = users;
      this.temp = users;
    });
  }
}
