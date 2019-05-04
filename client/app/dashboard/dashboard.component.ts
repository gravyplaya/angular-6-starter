import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ToastComponent } from "../shared/toast/toast.component";
import { PostService } from "../post/services/post.service";
import { ErrFmt } from "../util/helpers/err.helper";
import { TagService } from "../tag/services/tag.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import * as moment from "moment";

import * as _ from "lodash";

import { PagerService } from "../services/pager/index";
import { NgbdModalContentComponent } from "../shared/modal";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  @ViewChild("editAddressPerms") editAddressPermsEle: ElementRef;
  tags = [];
  perms = [];
  addys = [];
  posts = [];
  isLoading = true;
  display = "none";
  logedInForm;
  emailId;
  password;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private postService: PostService,
    private tagService: TagService,
    public toast: ToastComponent,
    private pagerService: PagerService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAddys();
    // this.logedInForm = new FormGroup({
    //   emailId: new FormControl("youremail@gmail.com",
    //     Validators.compose([
    //       Validators.required,
    //       Validators.pattern("[^ @]*@[^ @]*")
    //   ])),
    //   password: new FormControl('YourPassword', [
    //        Validators.minLength(8),
    //        Validators.required]),
    //   address: new FormControl('', [
    //        Validators.minLength(8),
    //        Validators.required])
    // });
  }

  getPosts(page: number = null) {
    this.postService
      .getPosts(page)
      .subscribe(
        data => (this.posts = data),
        error => this.toast.setMessage(ErrFmt(error), "danger"),
        () => (this.isLoading = false)
      );
  }

  getAddys() {
    this.tagService.getAddys().subscribe(
      data => {
        this.addys = data.result;
        this.setPager(1);
      },
      error => this.toast.setMessage(ErrFmt(error), "danger"),
      () => (this.isLoading = false)
    );
  }

  createAddy() {
    this.tagService.createAddy().subscribe(
      data => {
        this.addys.push(data.result);
        this.setPager(1);
      },
      error => this.toast.setMessage(ErrFmt(error), "danger"),
      () => (this.isLoading = false)
    );
  }

  editAddressPerms(addy: string) {
    console.log(addy);
    // this.editAddressPermsEle.show();
    // .on('show.bs.modal', function (event) {

    //   const button = $(event.relatedTarget); // Button that triggered the modal
    //   const recipient = button.data('addy'); // Extract info from data-* attributes
    //   this.tagService.getPermsByAddy(recipient).subscribe(
    //     (        data: { result: any; }) => this.perms = data.result,
    //     error => this.toast.setMessage(ErrFmt(error), 'danger'),
    //     () => this.isLoading = false,
    //   );
    //   const modal = $(this);
    //   modal.find('.modal-title').text('New message to ' + recipient);
    //   modal.find('.modal-body input').val(recipient);
    // });
  }

  timeAgo(created_at: string) {
    return moment(parseInt(created_at, 10)).fromNow();
  }

  setPage(page: number) {
    // get pager object from service
    this.getPosts(page);
  }

  setPager(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.addys.length, page);

    // get current page of items
    this.pagedItems = this.addys.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  open(addy) {
    this.tagService.getPermsByAddy(addy).subscribe(
      data => {
        this.perms = data.result;
        modalRef.componentInstance.perms = this.perms;
      },
      error => this.toast.setMessage(ErrFmt(error), "danger"),
      () => (this.isLoading = false)
    );
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.addy = addy;
  }

  getRange(lastPage: number) {
    return _.range(1, lastPage + 1);
  }
}
