import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface StoryForm{
  title: string
}
@Injectable({
  providedIn: 'root',
})

export class Story {
  private api = "http://localhost:3000/stories"
  constructor(private http: HttpClient){}

  getStories(){
    return this.http.get(this.api)
  }

  addStory(data: StoryForm){
    return this.http.post(this.api, data)
  }
}
