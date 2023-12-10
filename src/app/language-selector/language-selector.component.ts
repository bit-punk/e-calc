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
  supportedLanguages: string[] = []; // Languages supported by your application
  private locales: string[] = ['en', 'de'];
  private iconBaseDir = "../assets/img/";

  constructor(
    public translateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.setupTranslationService();
    // add icons as trusted assets for each locale
    this.locales.forEach((locale) => this.addTrustedIconSource(locale));
  }

  ngOnInit() {
    // Get the current language from the service
    this.currentLang = this.translateService.currentLang;
    // Get the list of supported languages from the service
    this.supportedLanguages = this.translateService.getLangs();
  }

  onChangeLang(lang: string) {
    console.log("Selected language: ", lang);
    this.currentLang = lang;
    this.translateService.use(lang);
  }

  private setupTranslationService() {
    this.translateService.addLangs(this.locales);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|de/) ? browserLang : 'en');
  }

  private addTrustedIconSource(name: string) {
    const iconURL = `${this.iconBaseDir}${name}.svg`;
    const sanitizedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(iconURL);

    this.matIconRegistry.addSvgIcon(name, sanitizedURL);
  }
}
