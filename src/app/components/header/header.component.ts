import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NgIf} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  role: string | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  ngAfterViewInit(): void {
    console.log('Role in AfterViewInit:', this.role);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['connexion']).then(() => {
      window.location.reload();
    });; 

  }
  
}
