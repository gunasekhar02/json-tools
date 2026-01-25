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
      name: 'Development Team',
      role: 'Full Stack Developer',
      email: 'info@jsontoolsapp.com',
      github: 'https://github.com/yourrepo'
    }
  ];

  features = [
    'Format JSON with syntax highlighting',
    'Compare two JSON objects and visualize differences',
    'Minify JSON for optimization',
    'DOM Tree View for exploring JSON structure',
    'Copy formatted JSON to clipboard',
    'Real-time JSON validation'
  ];
}