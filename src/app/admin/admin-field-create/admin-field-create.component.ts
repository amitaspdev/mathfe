import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FieldService} from '../../services/field.service';
import { Field } from 'app/models/field';
@Component({
  selector: 'ag-admin-field-create',
  templateUrl: './admin-field-create.component.html',
  styleUrls: ['./admin-field-create.component.css']
})
export class AdminFieldCreateComponent implements OnInit {
  public status: string;
  public message: string; 

  constructor(
    private fieldService: FieldService,
    private router: Router) {
      
    }

  ngOnInit() {}

  public createField(field:Field): void { 

    this.fieldService.addField(field)
      .subscribe(
        field => {
          this.fieldService.updateStatus = field['message'];
          setTimeout(() => this.fieldService.updateStatus = '', 2000);
          this.router.navigate(['/admin/fields']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          console.error(<any>error);
          this.status = 'success';
          this.message = error['message'];
        }
      );
  } 
}
