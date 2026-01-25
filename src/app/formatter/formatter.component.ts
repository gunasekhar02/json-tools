import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonUtilService } from '../services/json-util.service';

@Component({
  selector: 'app-formatter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formatter.component.html',
})
export class FormatterComponent {
  inputJson: string = '';
  outputJson: string = '';
  error: string = '';
  formattedHtml: string = '';
  copySuccess: boolean = false;

  constructor(private jsonUtil: JsonUtilService) {}


  formatJson() {
    try {
      const formatted = this.jsonUtil.format(this.inputJson);
      this.formattedHtml = this.highlightJson(formatted);
      this.error = '';
    } catch {
      this.error = 'Invalid JSON';
      this.formattedHtml = '';
    }
  }

  copyToClipboard() {
    try {
      const formatted = this.jsonUtil.format(this.inputJson);
      navigator.clipboard.writeText(formatted).then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      });
    } catch {
      this.error = 'Failed to copy';
    }
  }

  minifyJson() {
    try {
      this.outputJson = this.jsonUtil.minify(this.inputJson);
      this.error = '';
    } catch {
      this.error = 'Invalid JSON';
      this.outputJson = '';
    }
  }

  highlightJson(json: string): string {
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
  }

  clear() {
    this.inputJson = '';
    this.outputJson = '';
    this.formattedHtml = '';
    this.error = '';
    this.copySuccess = false;
  }
}
