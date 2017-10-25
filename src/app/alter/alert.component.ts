import {Component, OnInit} from "@angular/core";
import {AlertService} from "./alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: string;
  ngOnInit(): void {
    if (this.alertService != null) {
      this.message = this.alertService.message;
    }
  }

  constructor(private alertService: AlertService) {
  }


}
