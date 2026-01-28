import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-to-json',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excel-to-json.component.html',
  styleUrls: ['./excel-to-json.component.css']
})
export class ExcelToJsonComponent {
  jsonOutput: string = '';
  error: string = '';

  // Convert Excel serial number to JS date
  excelDateToJSDate(serial: number): string {
    if (typeof serial !== 'number') return serial;
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    return date_info.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  handleFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Only allow Excel files
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel' // .xls
    ];
    if (!allowedTypes.includes(file.type)) {
      this.error = 'Invalid file type. Please upload an Excel file (.xls or .xlsx).';
      this.jsonOutput = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Take the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet to raw array
        const rawData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Use second row as header
        const headers = rawData[1];
        if (!headers) throw new Error('Cannot find headers in Excel sheet.');

        // Map remaining rows to JSON objects
        const json = rawData.slice(2).map(row => {
          const obj: any = {};
          headers.forEach((header: any, i: number) => {
            if (header) {
              let value = row[i];
              // Convert Excel dates to YYYY-MM-DD
              if (header.toString().toLowerCase().includes('date') && typeof value === 'number') {
                value = this.excelDateToJSDate(value);
              }
              obj[header] = value ?? null;
            }
          });
          return obj;
        });

        this.jsonOutput = JSON.stringify(json, null, 2); // Pretty JSON
        this.error = '';
      } catch (err) {
        console.error(err);
        this.error = 'Failed to read Excel file. Ensure it has a proper header row.';
        this.jsonOutput = '';
      }
    };

    reader.readAsArrayBuffer(file);
  }

  copyToClipboard() {
    if (!this.jsonOutput) return;
    navigator.clipboard.writeText(this.jsonOutput).then(() => alert('JSON copied to clipboard!'));
  }

  clear() {
    this.jsonOutput = '';
    this.error = '';
  }
}
