import { Injectable } from '@angular/core';
import * as jsondiffpatch from 'jsondiffpatch';


@Injectable({
  providedIn: 'root'
})

export class JsonUtilService {

  constructor() { }
  private diffpatcher = jsondiffpatch.create({
    objectHash: (obj: any) => JSON.stringify(obj),
    arrays: { detectMove: false },
    textDiff: { 
      minLength: 1, 
      diffMatchPatch: typeof window !== 'undefined' ? (window as any).diff_match_patch : undefined 
    }
  });

  compare(json1: any, json2: any) {
    return this.diffpatcher.diff(json1, json2);
  }

  countMismatches(delta: any): number {
    if (!delta) return 0;

    let count = 0;

    const walk = (obj: any) => {
      if (Array.isArray(obj)) {
        // change detected
        count++;
        return;
      }
      if (typeof obj === 'object') {
        for (const key in obj) {
          if (key !== '_t') {
            walk(obj[key]);
          }
        }
      }
    };

    walk(delta);
    return count;
  }
  format(json: string): string {
    return JSON.stringify(JSON.parse(json), null, 2);
  }

  minify(json: string): string {
    return JSON.stringify(JSON.parse(json));
  }

  isValid(json: string): boolean {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  }
}
