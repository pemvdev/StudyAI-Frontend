import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {

  constructor(private router: Router){}

  hovered = false;
  hasFooter = false;
  @Input() route?: string;
  @Input() clickable = false;  

  ngAfterContentInit(){
    this.hasFooter = true;
  }

handleClick() {
  if (this.clickable && this.route) {
    this.router.navigate([this.route])
  }
}

showFooter(){

}


}
