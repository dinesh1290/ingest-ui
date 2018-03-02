import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {SchemaService} from "./schema.service";

@Injectable()
export class SchemaResolver implements Resolve<object> {

  constructor(private schemaService: SchemaService) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.schemaService.initializeSchemaFields();
    return this.schemaService.getSchemaFields();
  }
}
