import {Component, OnInit} from '@angular/core';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * The LanguageSelectorComponent is responsible for providing language selection functionality in the application.
 *
 * @class LanguageSelectorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatIconModule, MatOptionModule, MatSelectModule, NgForOf],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements OnInit {
  currentLang: string = "";      // Language currently in use
  supportedLanguages: string[] = []; // Languages supported by your application
  private locales: string[] = ['en', 'de'];
  private iconBaseDir = "assets/img/";

  constructor(
    public translateService: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.setupTranslationService();
    // add icons as trusted assets for each locale
    this.locales.forEach((locale) => this.addTrustedIconSource(locale));
  }

  /**
   * Initializes the component and retrieves the current language and supported languages from the service.
   *
   * @returns {void}
   */
  ngOnInit() {
    // Get the current language from the service
    this.currentLang = this.translateService.currentLang;
    // Get the list of supported languages from the service
    this.supportedLanguages = this.translateService.getLangs();
  }

  /**
   * Update the selected language and apply it to the translation service.
   *
   * @param {string} lang - The new language to be set.
   * @return {void}
   */
  onChangeLang(lang: string) {
    console.log("Selected language: ", lang);
    this.currentLang = lang;
    this.translateService.use(lang);
  }

  /**
   * Sets up the Translation Service.
   *
   * The Translation Service is responsible for managing the translations and language settings
   * for the application.
   *
   * This method performs the following actions:
   * - Adds the supported languages to the Translation Service.
   * - Sets the default language to English ('en').
   * - Determines the browser language and sets it as the active language, if supported.
   *   Otherwise, it defaults to English.
   *
   * @private
   * @returns {void}
   */
  private setupTranslationService() {
    this.translateService.addLangs(this.locales);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|de/) ? browserLang : 'en');
  }

  /**
   * Adds a trusted icon source to the material icon registry.
   * This method needs to be invoked for all custom-icon-svgs that are stored in 'assets/img' in order to make them
   * usable.
   * @param {string} name - The name of the icon source.
   * @return {void}
   */
  private addTrustedIconSource(name: string) {
    const iconURL = `${this.iconBaseDir}${name}.svg`;
    const sanitizedURL = this.domSanitizer.bypassSecurityTrustResourceUrl(iconURL);

    this.matIconRegistry.addSvgIcon(name, sanitizedURL);
  }
}
