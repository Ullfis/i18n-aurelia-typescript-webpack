//import {computedFrom} from 'aurelia-framework';

import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { I18N } from 'aurelia-i18n';

@autoinject
export class Welcome {
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  constructor(private i18n: I18N, private element: Element, private ea: EventAggregator) {
    ea.subscribe('i18n:locale:changed', payload => {
      this.i18n.updateTranslations(this.element);
    });
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate(): boolean {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }

  async setLocale(locale: string) {
    await this.i18n.setLocale(locale);
  }

}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}
