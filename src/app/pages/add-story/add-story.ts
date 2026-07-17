import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-story',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-story.html',
  styleUrl: './add-story.css',
})
export class AddStory {
  loading: boolean = false;

  addForm: FormGroup;
  success = "";
  error = "";
  addForm1: FormGroup;
  addForm2: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient,) {
    this.addForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      author: "",
      views: ["", [Validators.min(0)]],
    })
    this.addForm1 = this.fb.group({
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

  submitForm(){
    this.error = "";
    this.success = "";
    this.loading = true;
    const data = this.addForm.value;

    this.http.post("http://localhost:3000/stories",data).subscribe({
      next: () =>{
        this.success = "Thêm truyện thành công";
        this.addForm.reset()
      },
      error: () => {
        this.error = "Thêm thất bại"
      },
        complete: () => {
          this.loading = false; 
        }
    })
  }
  submitForm1(){
    this.error = ""
    this.success = ""
    this.loading = true;
    const data = this.addForm1.value
    this.http.post("http://localhost:3000/stories",data).subscribe({
      next: ()=>{
        this.success = "Thêm thành công"
        this.addForm1.reset()
      },
      error: ()=>{
        this.error = "thêm thất bại"
      },
        complete: () => {
          this.loading = false; 
        }
    })
  }
  submitForm2(){
    console.log(this.addForm2.value)
  }
  
 get title(){
    return this.addForm.get('title')
  }
  get views(){
    return this.addForm.get('views')
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
