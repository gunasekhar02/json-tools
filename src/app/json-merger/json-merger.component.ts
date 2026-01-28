import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-merger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-merger.component.html',
  styleUrls: ['./json-merger.component.css']
})
export class JsonMergerComponent {
  newJson: string = '';
  jsonList: any[] = [];
  mergedJson: string = '';
  error: string = '';

  addJson() {
    if (!this.newJson.trim()) return;

    try {
      const parsed = JSON.parse(this.newJson);
      this.jsonList.push(parsed);
      this.newJson = '';
      this.error = '';
    } catch (err) {
      this.error = 'Invalid JSON. Please correct it before adding.';
    }
  }

  removeJson(index: number) {
    this.jsonList.splice(index, 1);
  }

  mergeJsons() {
    try {
      if (!this.jsonList.length) return;
      // Merge logic: combine arrays or objects
      let result: any;
      if (Array.isArray(this.jsonList[0])) {
        result = this.jsonList.flat(); // flatten all arrays
      } else if (typeof this.jsonList[0] === 'object') {
        result = Object.assign({}, ...this.jsonList); // merge objects (later overrides earlier)
      } else {
        this.error = 'Unsupported JSON type.';
        return;
      }
      this.mergedJson = JSON.stringify(result, null, 2);
      this.error = '';
    } catch (err) {
      this.error = 'Failed to merge JSONs.';
    }
  }

  copyMergedJson() {
    if (!this.mergedJson) return;
    navigator.clipboard.writeText(this.mergedJson).then(() => alert('Merged JSON copied!'));
  }

  clearAll() {
    this.newJson = '';
    this.jsonList = [];
    this.mergedJson = '';
    this.error = '';
  }
}
