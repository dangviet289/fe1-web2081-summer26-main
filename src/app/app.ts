import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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
