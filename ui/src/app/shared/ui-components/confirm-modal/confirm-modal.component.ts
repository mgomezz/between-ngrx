import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  confirm() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback(true);
      this.bsModalRef.hide();
    }
  }

  decline() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback(false);
      this.bsModalRef.hide();
    }
  }
}
