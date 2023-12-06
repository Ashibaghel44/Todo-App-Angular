import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todo-App';
  empForm!: FormGroup;
  isSave: boolean = true;
  isUpdate: boolean = false;
  isEditIndex: any;
  storedData: any = [];
  editedIndex: number = -1;


  constructor() { }


  ngOnInit() {
    this.empForm = new FormGroup({
      name: new FormControl('',
        [Validators.required,
        Validators.pattern('^[a-z A-Z ]*$')]),
    });
  }
  get name() {
    return this.empForm.get('name');
  }
  addEmployee() {
    this.storedData.push(this.empForm.value)
    this.empForm.reset()
  }
  onUpdate() {
    this.storedData[this.isEditIndex] = this.empForm.value;
    this.empForm.reset()
    this.isSave = true;
    this.isUpdate = false;
    // console.log(this.storedData);

  }
  editEmployee(employee: any) {
    console.log(employee);
    console.log(this.storedData);
    this.isEditIndex = employee
    this.isSave = false;
    this.isUpdate = true;
    this.empForm.patchValue({
      name: this.storedData[this.isEditIndex].name
    })
  }
  deleteEmployee(employee: any) {
    this.storedData.splice(employee, 1);
  }
}
