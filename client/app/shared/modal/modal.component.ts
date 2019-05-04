import { Component, ElementRef, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { TagService } from "../../tag/services/tag.service";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { of } from "rxjs";

@Component({
  selector: "app-ngbd-modal-content",
  templateUrl: "./modal-component.html"
})
export class NgbdModalContentComponent {
  @Input() addy;
  @Input() perms;
  form: FormGroup;
  orders = [];

  orders2 = [
    { name: "connect" },
    { name: "send" },
    { name: "recieve" },
    { name: "issue" },
    { name: "create" },
    { name: "mine" },
    { name: "admin" },
    { name: "activate" }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
    // async orders
    // of(this.getOrders()).subscribe(orders => {
    //   this.orders = orders;
    //   this.addCheckboxes();
    // });
    // synchronous orders
    this.orders = this.getOrders();
    this.addCheckboxes();

    // Create a new array with a form control for each order
    // const controls = this.orders.map(c => new FormControl(false));
    // controls[0].setValue(true); // Set the first checkbox to true (checked)
    // this.form = this.formBuilder.group({
    //   // orders: new FormArray(controls)
    //   connect: new FormControl("", { updateOn: "blur" }),
    //   send: new FormControl("", { updateOn: "blur" }),
    //   recieve: new FormControl(""),
    //   issue: new FormControl(""),
    //   create: new FormControl(""),
    //   mine: new FormControl(""),
    //   admin: new FormControl(""),
    //   activate: new FormControl("")
    // });
    // if (this.perms) {
    //   this.perms.forEach(element => {
    //     if (element.type === "connect") {
    //       this.form.patchValue({ connect: true });
    //     }
    //   });
    // }
  }
  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => (v ? this.orders[i].id : null))
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }
  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }
  getOrders() {
    return this.perms;
  }
}
