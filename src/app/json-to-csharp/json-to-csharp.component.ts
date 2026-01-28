import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-to-csharp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './json-to-csharp.component.html',
  styleUrls: ['./json-to-csharp.component.css']
})
export class JsonToCsharpComponent {
  inputJson = '';
  output = '';
  error = '';
  copySuccess = false;

  generate() {
    this.error = '';
    this.output = '';

    try {
      const obj = JSON.parse(this.inputJson);
      this.output = this.generateClass('Root', obj);
    } catch {
      this.error = 'Invalid JSON';
    }
  }
  

  private generateClass(className: string, obj: any): string {
    let result = `public class ${className}\n{\n`;
    let nested = '';

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const propName = this.pascalCase(key);

      if (Array.isArray(value)) {
        const type = value.length
          ? this.getType(value[0], propName)
          : 'object';
        result += `    public List<${type}> ${propName} { get; set; }\n`;
      }
      else if (typeof value === 'object' && value !== null) {
        const nestedClass = this.pascalCase(key);
        result += `    public ${nestedClass} ${propName} { get; set; }\n`;
        nested += '\n' + this.generateClass(nestedClass, value);
      }
      else {
        result += `    public ${this.getType(value)} ${propName} { get; set; }\n`;
      }
    }

    result += '}\n';
    return result + nested;
  }

  private getType(value: any, name?: string): string {
    if (typeof value === 'string') {
      return !isNaN(Date.parse(value)) ? 'DateTime' : 'string';
    }
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'int' : 'double';
    }
    if (typeof value === 'boolean') return 'bool';
    if (typeof value === 'object') return name || 'object';
    return 'string';
  }

  private pascalCase(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

copy() {
  if (!this.output) return;

  navigator.clipboard.writeText(this.output).then(() => {
    this.copySuccess = true;

    // Hide message after 2 seconds
    setTimeout(() => {
      this.copySuccess = false;
    }, 2000);
  });
}


  clear() {
    this.inputJson = '';
    this.output = '';
    this.error = '';
  }
}
