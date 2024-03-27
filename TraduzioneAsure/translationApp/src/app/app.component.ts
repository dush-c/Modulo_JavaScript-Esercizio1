import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { TanslationString } from '../../translationObject.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'translationApp';

  inputText: string = '';
  translatedText: TanslationString | null = null;
  languageValue: string = '';

  constructor(protected http: HttpClient) {}

  onEnter(value: string) {
    this.inputText = value;
    console.log(this.inputText);
  }

  onSelected(value: string) {
    this.languageValue = value;
    console.log(this.languageValue);
  }

  translateText() {
    //on click i need to make an api call to the azure server and recieve the translated string

    console.log(
      this.getTranslatedText().subscribe((response: any) => {
        console.log(response); // Output the stringified response
        this.translatedText = response;
        console.log(this.translatedText?.translations.text);
      })
    );
  }

  getTranslatedText() {
    let apiUrl = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=it&to=${this.languageValue}`;
    const body = { text: this.inputText };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'a7cafa4feb5942549c773a30788ea294',
      'Ocp-Apim-Subscription-Region': 'switzerlandnorth',
    });

    // console.log(body);
    return this.http
      .post(apiUrl, [body], {
        headers: headers,
      })
      .pipe(map((response: any) => JSON.stringify(response)));
  }
}
