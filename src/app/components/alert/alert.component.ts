import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input()  title: string;
  @Input()  subTitle: string;
  @Input() closable: boolean;
  @Output() closePopUp = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  closeWarning() {
    this.closePopUp.emit(true);
  }

}
