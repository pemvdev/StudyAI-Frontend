import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardComponent } from "../../components/card/card.component";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  userName = '';
  firstName = '';

  constructor() { }

  ngOnInit(): void {
    const fullName = sessionStorage.getItem('username');

    if(fullName){
      this.userName = fullName;
      this.firstName = fullName.split(' ')[0];
    }
    
  }
}
