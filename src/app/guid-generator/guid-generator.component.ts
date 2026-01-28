import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guid-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guid-generator.component.html',
  styleUrls: ['./guid-generator.component.css']
})
export class GuidGeneratorComponent {
  guids: string[] = [];
  count = 1; // number of GUIDs to generate
  copySuccess = false;

  // Generate one or multiple GUIDs
  generate() {
    this.guids = [];
    for (let i = 0; i < this.count; i++) {
      this.guids.push(this.generateGuid());
    }
    this.copySuccess = false;
  }

  // Single GUID generator (v4)
  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Copy all GUIDs to clipboard
  copy() {
    if (!this.guids.length) return;
    navigator.clipboard.writeText(this.guids.join('\n')).then(() => {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    });
  }

  clear() {
    this.guids = [];
    this.copySuccess = false;
  }
}
