import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SchemaService} from "../shared/services/schema.service";

@Component({
  selector: 'app-metadata-field',
  templateUrl: './metadata-field.component.html',
  styleUrls: ['./metadata-field.component.css']
})
export class MetadataFieldComponent implements OnInit {

  @Input() value;
  @Input() metadataType;
  @Input() columnName;
  @Output() onValueChange = new EventEmitter();

  editMode: boolean = false;

  columnDefinition: object;

  constructor(private schemaService: SchemaService) {
    this.columnDefinition = {type:'string'};
  }

  ngOnInit() {
    let searchKey = this.metadataType + '.' + this.columnName;
    // this.columnDefinition = this.schemaService.getSchemaFieldDefinition(searchKey);
  }

  updateValue(event){
    this.editMode = false;

    let newValue;
    let type = this.columnDefinition['type'];

    console.log('columnDefinition', this.columnDefinition)

    if(type === 'string'){
      newValue = event.target.value;
    } else if(type === 'boolean'){
      newValue = event.target.checked;
    } else if(type === 'number'){
      newValue = Number(event.target.value);
    } else if(type === 'integer'){
      newValue = parseInt(event.target.value);
    }
    else {
      newValue = event.target.value;
    }

    console.log('event', event);
    this.value = newValue;

    this.onValueChange.emit(newValue);

  }



}
