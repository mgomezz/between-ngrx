import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  filterValue: string = "";

  constructor() {}

  ngOnInit() {}

  updateFilter(event: any) {
    this.filterValue = event.target.value.toLowerCase();
  }
}
