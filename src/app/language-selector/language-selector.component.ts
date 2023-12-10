import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatOptionModule, MatSelectModule, NgForOf, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements OnInit {
  currentLang: string = "";      // Language currently in use
  supportedLangs: string[] = []; // Languages supported by your application

  constructor(public translateService: TranslateService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    const locales: string[] = ['en', 'de'];

    translateService.addLangs(locales);
    translateService.setDefaultLang('en');

    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang?.match(/en|de/) ? browserLang : 'en');

    // add icons as trusted assets for each locale
    locales.forEach((currentLocale) => {
      this.addTrustedResource(currentLocale);
    });
  }

  ngOnInit() {
    // Get the current language from the service
    this.currentLang = this.translateService.currentLang;
    // Get the list of supported languages from the service
    this.supportedLangs = this.translateService.getLangs();
  }

  private addTrustedResource(name: string) {
    const iconBaseDir = "../assets/img/";
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(iconBaseDir + name + ".svg"));
  }

  onChangeLang(lang: string) {
    console.log("Selected language: ", lang);
    this.currentLang = lang;
    this.translateService.use(lang);
  }

}
