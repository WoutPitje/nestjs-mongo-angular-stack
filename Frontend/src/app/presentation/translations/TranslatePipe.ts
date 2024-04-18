import { Pipe, PipeTransform } from '@angular/core';
import { TRANSLATIONS } from './translations';
@Pipe({
  name: 'translateWordByWord',
})
export class TranslateWordByWordPipe implements PipeTransform {

  private currentLang = 'nl'; // Default language

  transform(value: string, lang: string = this.currentLang): string {
    // Split the input string into words
    const words = value.split(/\s+/);
    // Translate each word, and join them back together
    return words
      .map(word => TRANSLATIONS[lang][word] || word)
      .join(' ');
  }
}
