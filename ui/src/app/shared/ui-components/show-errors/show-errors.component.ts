import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-show-errors",
  templateUrl: "./show-errors.component.html",
  styleUrls: ["./show-errors.component.scss"],
})
export class ShowErrorsComponent implements OnInit {
  @Input() ctrl: FormControl;
  @Input() nameToShow: string;
  @Input() fieldToMatch: string;

  ERROR_MESSAGE = {
    required: () => `${this.nameToShow} is required`,
    minlength: (par) => `Min ${par.requiredLength} chars is required`,
    underAge: () => `Age must be 18 years old or above`,
    mustMatch: () => `Doesn´t match with ${this.fieldToMatch} `,
  };

  constructor() {}

  ngOnInit() {}

  shouldShowErrors(): boolean {
    return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  }

  listOfErrors(): string[] {
    return Object.keys(this.ctrl.errors).map((err) =>
      this.ERROR_MESSAGE[err](this.ctrl.getError(err))
    );
  }
}
