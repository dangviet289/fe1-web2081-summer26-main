import { Component, OnInit   } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';

interface Story {
  id: number ;
  title: string;
  author: string;
  views: number;
}
@Component({
  selector: 'app-stories',
  standalone: true, 
  imports: [
    CommonModule 
  ], 
  templateUrl: './stories.html',
  styleUrls: ['./stories.css']
})

export class Stories {
  loading: boolean = false;
  stories: Story[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.http.get("http://localhost:3000/stories").subscribe({
      next: (data: any) => {
        this.stories = data
      },
      error: () => {
        console.log("Không thể tải dữ liệu");
      },
    });
  }

  deleteStory(id: number) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa không?");
    this.loading = true;
    if (!confirmDelete) return;

    this.http.delete(`http://localhost:3000/stories/${id}`).subscribe({
      next: () => {
        this.stories = this.stories.filter((story) => story.id !== id);
        alert("Xóa thành công");
      },
      error: () => {
        alert("Xóa thất bại");
      },
        complete: () => {
          this.loading = false; 
        }
    });
  }
}