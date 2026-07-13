import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-story',
  imports: [ReactiveFormsModule],
  templateUrl: './add-story.html',
  styleUrl: './add-story.css',
})
export class AddStory {
  addForm1: FormGroup;
  addForm2: FormGroup;
  constructor(private fb: FormBuilder) {
    this.addForm1 = this.fb.group({
      // title: ["", [Validators.required, Validators.minLength(3)]],
      // author: "",
      // views: ["", [Validators.min(0)]],

      name: ["", [Validators.required]],
      price: ["", [Validators.min(1)]],
      category:[""],
    })

    this.addForm2 = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  submitForm1(){
    console.log(this.addForm1.value)
  }
  submitForm2(){
    console.log(this.addForm2.value)
  }
 get title(){
    return this.addForm1.get('title')
  }
  get views(){
    return this.addForm1.get('views')
  }
  get name(){
    return this.addForm1.get('name')
  }
  get price(){
    return this.addForm1.get('price')
  }
  get username(){
    return this.addForm2.get('username')
  }
  get email(){
    return this.addForm2.get('email')
  }
  get password(){
    return this.addForm2.get('password')
  }
}
