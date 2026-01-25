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

  constructor(private jsonUtil: JsonUtilService) {}

  loadJson() {
    this.error = '';
    try {
      this.json = JSON.parse(this.inputJson);
    } catch (e: any) {
      this.error = 'Invalid JSON';
      this.json = null;
    }
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => !key.startsWith('_'));
  }

  toggle(node: any) {
    if (!node.hasOwnProperty('_expanded')) {
      node._expanded = false;
    }
    node._expanded = !node._expanded;
  }

  clear() {
    this.inputJson = '';
    this.json = null;
    this.error = '';
  }
}