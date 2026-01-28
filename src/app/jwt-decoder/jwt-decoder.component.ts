import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jwt-decoder',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ JsonPipe comes from CommonModule
  templateUrl: './jwt-decoder.component.html',
  styleUrls: ['./jwt-decoder.component.css']
})
export class JwtDecoderComponent {
  jwtToken = '';
  header: any = null;
  payload: any = null;
  error = '';
  copySuccess = false;      // To show success message
  copyMessage = '';         // To show which part was copied


  decodeToken() {
    this.error = '';
    this.header = null;
    this.payload = null;

    if (!this.jwtToken || !this.jwtToken.includes('.')) {
      this.error = 'Invalid JWT token format';
      return;
    }

    try {
      const parts = this.jwtToken.split('.');
      if (parts.length !== 3) {
        this.error = 'JWT must have Header.Payload.Signature';
        return;
      }

      this.header = this.decodeBase64(parts[0]);
      this.payload = this.decodeBase64(parts[1]);
    } catch {
      this.error = 'Failed to decode JWT';
    }
  }

copy(data: any, type: string = '') {
  if (!data) return;

  navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
    this.copySuccess = true;
    this.copyMessage = type ? `${type} copied!` : 'Copied!';

    setTimeout(() => {
      this.copySuccess = false;
      this.copyMessage = '';
    }, 2000);
  });
}


  clear() {
  this.jwtToken = '';
  this.header = null;
  this.payload = null;
  this.error = '';
}

  private decodeBase64(value: string) {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}
