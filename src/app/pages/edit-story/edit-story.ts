import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";

interface Story {
  id: number;
  titel: string;
}

@Component({
  selector: "app-edit-story",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./edit-story.html",
  styleUrl: "./edit-story.css",
})
export class EditStory {
  editForm: FormGroup;

  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.editForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      author: "",
      views: ["", [Validators.min(0)]],
    });
  }

  get title(){
    return this.editForm.get('title')
  }
  get views(){
    return this.editForm.get('views')
  }

  ngOnInit() {
    // 1. Lấy id từ URL
    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id) {
      // 2. Gọi API lấy dữ liệu
      this.http.get<Story>(`http://localhost:3000/stories/${this.id}`).subscribe({
        next: (data) => {
          // 3. Set dữ liệu vào form
          this.editForm.patchValue(data);
          
          
        },
        error: () => {
          alert("Không load được dữ liệu");
          
          
        },
      });
    }
  }
successMessage: string = '';
  submitForm() {
    if (!this.id) return;

    const data = this.editForm.value;
   
    
    // 4. Gọi API update
    this.http.patch(`http://localhost:3000/stories/${this.id}`, data).subscribe({
      next: () => {
        this.successMessage = 'Cập nhật thành công!';
        
        // (Tùy chọn) Ẩn thông báo sau 3 giây
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        // this.router.navigateByUrl("/stories");
      },
      error: () => {
        alert("Có lỗi xảy ra");
        
      },
    });
  }
}