import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonUtilService } from '../services/json-util.service';

@Component({
  selector: 'app-dom-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domview.component.html',
  styleUrls: ['./domview.component.css']
})


export class DomViewComponent {
  inputJson: string = '';
  json: any = null;
  error: string = '';
  copySuccess = false;
  copyMessage = '';

  loadJson() {
    this.error = '';
    try {
      this.json = JSON.parse(this.inputJson);
      this.addPath(this.json, 'root'); // attach paths to nodes
    } catch (e: any) {
      this.error = 'Invalid JSON';
      this.json = null;
    }
  }

  clear() {
    this.inputJson = '';
    this.json = null;
    this.error = '';
  }

  // Recursively attach a _path to each node
  private addPath(node: any, path: string) {
    if (node && typeof node === 'object') {
      node._path = path;
      if (Array.isArray(node)) {
        node.forEach((item, i) => this.addPath(item, `${path}[${i}]`));
      } else {
        Object.keys(node).forEach(key => {
          if (!key.startsWith('_')) {
            this.addPath(node[key], `${path}.${key}`);
          }
        });
      }
    }
  }

  // Copy the node path to clipboard
 copyPath(path: string) {
  navigator.clipboard.writeText(path).then(() => {
    this.copySuccess = true;
    this.copyMessage = `Copied path: ${path}`;
    setTimeout(() => {
      this.copySuccess = false;
      this.copyMessage = '';
    }, 2000);
  });
}


  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).filter(k => !k.startsWith('_'));
  }

  toggle(node: any) {
    if (!node.hasOwnProperty('_expanded')) {
      node._expanded = false;
    }
    node._expanded = !node._expanded;
  }
}
