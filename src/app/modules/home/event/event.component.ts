import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  closeResult: string;
  bookingList = [];
  eventList = [];

  eventForm = new FormGroup({
    publicName: new FormControl('')
  });

  bookingForm = new FormGroup({
    publicName: new FormControl(''),
    internalLabel: new FormControl(''),
    publicLink: new FormControl(''),
    owner: new FormControl(''),
    eventType: new FormControl(''),
  });

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.initalize();
  }

  initalize() {
    this.eventList.push({ publicName: '15-Minute-Meeting' });
    this.eventList.push({ publicName: '30-Minute-Meeting' });
    this.eventList.push({ publicName: '60-Minute-Meeting' });

    this.bookingList.push({
      publicName: 'First Booking',
      internalLabel: 'First Label',
      publicLink: 'https://scheduler/firstBooking',
      owner: 'Ammar',
      eventType: '15-Minute'
    });

  }


  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveEvent() {
    this.eventList.push({ publicName: this.eventForm.get('publicName').value });
  }

  saveBooking() {
    this.bookingList.push({
      publicName: this.bookingForm.get('publicName').value,
      internalLabel: this.bookingForm.get('internalLabel').value,
      publicLink: this.bookingForm.get('publicLink').value,
      owner: this.bookingForm.get('owner').value,
      eventType: this.bookingForm.get('eventType').value
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
