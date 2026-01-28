import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  developers = [
    {
      name: 'Guna Sekhar Reddy Peddireddygari',
      role: 'Full Stack Developer in GEP Worldwide',
      email: 'guna.devcodes@gmail.com',
      github: 'https://github.com/gunasekhar02'
    }
  ];
}
