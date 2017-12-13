import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BrokerService} from "../../broker.service";
import {Observable} from "rxjs/Observable";
import {UploadResults} from "../../models/uploadResults";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  uploadResults$: Observable<UploadResults>;

  constructor(private brokerService: BrokerService) { }

  ngOnInit() {
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("file", fileBrowser.files[0]);
      this.uploadResults$ = this.brokerService.uploadSpreadsheet(formData);
      this.uploadResults$.subscribe(res => console.log(res));
    }
  }
}
