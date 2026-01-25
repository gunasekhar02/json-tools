import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comparer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comparer.component.html'
})
export class ComparerComponent {

  json1 = '';
  json2 = '';

  leftHtml = '';
  rightHtml = '';

  mismatchCount = 0;
  error = '';

  compare() {
    try {
      const obj1 = JSON.parse(this.json1);
      const obj2 = JSON.parse(this.json2);

      this.mismatchCount = 0;

      this.leftHtml = this.renderCompare(obj1, obj2, true);
      this.rightHtml = this.renderCompare(obj2, obj1, false);

      this.error = '';
    } catch {
      this.error = 'Invalid JSON in one of the inputs';
      this.leftHtml = '';
      this.rightHtml = '';
      this.mismatchCount = 0;
    }
  }

  renderCompare(source: any, target: any, countMismatch: boolean): string {
    const recurse = (a: any, b: any, indent = 0): string => {
      let result = '';
      const pad = ' '.repeat(indent * 2);

      for (const key of Object.keys(a)) {
        const keyHtml = `<span class="json-key">"${key}"</span>: `;

        if (!(key in b)) {
          if (countMismatch) this.mismatchCount++;
          result += `${pad}${keyHtml}<span class="diff-removed">${this.stringify(a[key])}</span>\n`;
        } else if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
          if (countMismatch) this.mismatchCount++;

          if (typeof a[key] === 'object' && a[key] !== null) {
            result += `${pad}${keyHtml}{\n`;
            result += recurse(a[key], b[key], indent + 1);
            result += `${pad}}\n`;
          } else {
            result += `${pad}${keyHtml}<span class="diff-changed">${this.stringify(a[key])}</span>\n`;
          }
        } else {
          result += `${pad}${keyHtml}${this.stringify(a[key])}\n`;
        }
      }

      return result;
    };

    return recurse(source, target);
  }

  stringify(value: any): string {
    if (typeof value === 'string') {
      return `<span class="json-string">"${value}"</span>`;
    }
    if (typeof value === 'number') {
      return `<span class="json-number">${value}</span>`;
    }
    if (typeof value === 'boolean') {
      return `<span class="json-boolean">${value}</span>`;
    }
    if (value === null) {
      return `<span class="json-null">null</span>`;
    }
    return `<span class="json-string">${JSON.stringify(value)}</span>`;
  }
}
