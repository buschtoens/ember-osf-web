import { attribute } from '@ember-decorators/component';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import Component from '@ember/component';
import { layout } from 'ember-osf-web/decorators/component';
import Registration from 'ember-osf-web/models/registration';
import Analytics from 'ember-osf-web/services/analytics';
import defaultTo from 'ember-osf-web/utils/default-to';
import styles from './styles';
import template from './template';

interface TagsManager {
    tags: string[];
    removeTag: (index: number) => void;
    addTag: (tag: string) => void;
    clickTag: (tag: string) => void;
    readOnly: boolean;
}

@layout(template, styles)
export default class RegistriesTagsWidget extends Component.extend({ styles }) {
    // Required
    manager!: TagsManager;
    registration!: Registration;

    // Optional
    readOnly?: boolean = defaultTo(this.readOnly, false);

    // Private
    @service analytics!: Analytics;

    @attribute('data-analytics-scope')
    analyticsScope: string = defaultTo(this.analyticsScope, 'Tags');

    @action
    addTag(tag: string) {
        this.analytics.trackFromElement(this.element, {
            name: 'Add tag',
            category: 'tag',
            action: 'add',
        });
        this.manager.addTag(tag);
    }

    @action
    removeTag(index: number) {
        this.analytics.trackFromElement(this.element, {
            name: 'Remove tag',
            category: 'tag',
            action: 'remove',
        });
        this.manager.removeTag(index);
    }
}
