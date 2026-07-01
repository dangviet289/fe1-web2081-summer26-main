import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  id: number = 123;
  title = 'my-app';//property
  name = 'Bùi Đăng Việt';
  age = 22;

  //method
  sayHello(){
    
    console.log("Hello from App Component");
    
  }
  handleClick() {
  alert("Bạn đã click button");
}
}
