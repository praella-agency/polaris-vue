<template>
    <li class="Polaris-ResourceList__ItemWrapper">
        <div :class="className" :data-href="url">
            <a v-if="url" :aria-describedby="id" :aria-label="`View details for ${itemName}`"
               class="Polaris-ResourceItem__Link" :tabindex="tabIndex" id="PolarisResourceListItemOverlay3" :href="url"
               data-polaris-unstyled="true" />
            <button v-else class="Polaris-ResourceItem__Button" ref="buttonOverlay"
                    :aria-label="`View details for ${itemName}`" :aria-controls="ariaControls"
                    :aria-expanded="ariaExpanded" :tabIndex="tabIndex"/>
            <div class="Polaris-ResourceItem__Container" :id="id">
                <div :class="ownedClassName">
                    <div class="Polaris-ResourceItem__Handle" v-if="selectable">
                        <div class="Polaris-ResourceItem__CheckboxWrapper" @click="stopPropagation">
                            <PCheckbox label="Select item" :checked="checked" labelHidden :id="checkboxId"
                                       @change="handleChange" :disabled="loading"></PCheckbox>
                        </div>
                    </div>
                    <div class="Polaris-ResourceItem__Media" v-if="$slots.media">
                    <!-- @slot Content for the media area at the left of the item, usually an Avatar or Thumbnail -->
                        <slot name="media"/>
                    </div>
                </div>

                <div class="Polaris-ResourceItem__Content" v-if="$slots.default">
                    <!-- @slot Content for the details area -->
                    <slot/>
                </div>

                <div
                    v-if="shortcutActions.length > 0 && !loading"
                >
                    <div
                        v-if="persistActions"
                        class="Polaris-ResourceItem__Actions"
                        @click="stopPropagation"
                    >
                        <PButtonGroup>
                            <PButton
                                plain
                                v-for="(shortcutAction, key) in shortcutActions"
                                :key="key"
                                @click="shortcutAction.onAction()"
                            >
                                {{ shortcutAction.content }}
                            </PButton>
                        </PButtonGroup>

                    </div>
                    <div v-else
                         class="Polaris-ResourceItem__Actions"
                         @click="stopPropagation"
                    >
                        <PButtonGroup segmented id="ShortcutActions">
                            <PButton
                                size="slim"
                                v-for="(shortcutAction, key) in shortcutActions"
                                :key="key"
                                @click="shortcutAction.onAction()"
                            >
                                {{ shortcutAction.content }}
                            </PButton>
                        </PButtonGroup>
                    </div>
                </div>
                <div
                    class="Polaris-ResourceItem__Disclosure"
                    @click="stopPropagation"
                >
                    <PPopover
                        :id="`popover${id}`"
                        :active="actionMenuVisible"
                        preferredAlignment="right"
                        @close="handlePopoverClick"
                    >
                        <PButton
                            slot="activator"
                            accessibilityLabel="Actions"
                            @click.stop="handlePopoverClick"
                            plain
                            icon="HorizontalDotsMinor"
                        />
                        <PActionList slot="content" :items="shortcutActions"/>
                    </PPopover>
                </div>
            </div>
        </div>
    </li>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { DisableableAction } from '@/types';
import { PCheckbox } from '@/components/PCheckbox';
import { PAvatar } from '@/components/PAvatar/index.js';
import { PPopover } from '@/components/PPopover/index.js';
import { PButton } from '@/components/PButton/index.js';
import { PButtonGroup } from '@/components/PButtonGroup';
import { PActionList } from '@/components/PActionList/index.js';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

@Component({
  components: {
    PCheckbox, PAvatar, PButtonGroup, PButton, PPopover, PActionList,
  },
})
export default class PResourceListItem extends Vue {

    // Deprecated Start
    @Prop({type: Boolean, default: false}) public checked!: boolean;
    // Deprecated End

    /**
     * Name of the resource, such as customers or products
     */
    @Prop({type: Object, default: () => ({})}) public resourceName!: {
        singular: string;
        plural: string;
    };

    /**
     * Visually hidden text for screen readers used for item link
     */
    @Prop({type: String, default: null}) public accessibilityLabel!: string;

    /**
     * Individual item name used by various text labels
     */
    @Prop({type: String, default: null}) public name!: string;

    /**
     * Renders a Select All button at the top of the list and checkboxes in front of each list item.
     * For use when bulkActions aren't provided.
     */
    @Prop({type: Boolean, default: false}) public selectable!: boolean;

    /**
     * Overlays item list with a spinner while a background action is being performed
     */
    @Prop({type: Boolean, default: false}) public loading!: boolean;

    /**
     * Set to activate the selectable items for small screen
     */
    @Prop({type: Boolean, default: false}) public selectMode!: boolean;

    /**
     * Id of the element the item onClick controls
     */
    @Prop({type: String, default: null}) public ariaControls!: string;

    /**
     * Tells screen reader the controlled element is expanded
     */
    @Prop({type: Boolean, default: false}) public ariaExpanded!: boolean;

    /**
     * Unique identifier for the item
     */
    @Prop({type: [String, Number], required: true}) public id!: string | number;

    /**
     * Makes the shortcut actions always visible
     */
    @Prop({type: Boolean, default: false}) public persistActions!: boolean;

    /**
     * 1 or 2 shortcut actions; must be available on the page linked to by url
     */
    @Prop({type: Array, default: () => ([])}) public shortcutActions!: DisableableAction[];

    /**
     * The order the item is rendered
     */
    @Prop({type: Number, default: null}) public sortOrder!: number;

    /**
     * URL for the resource’s details page (required unless onClick is provided)
     */
    @Prop({type: String, default: null}) public url!: string;

    /**
     * Allows url to open in a new tab
     */
    @Prop({type: Boolean, default: false}) public external!: boolean;

    /** Adjust vertical alignment of elements */
    @Prop({type: String, default: null}) public verticalAlignment!: Alignment;

    /**
     * Prefetched url attribute to bind to the main element being returned
     */
    @Prop({type: String, default: null}) public dataHref!: string;

  public actionMenuVisible = false;

  public get className() {
    return classNames(
      'Polaris-ResourceItem',
      this.selectable && 'Polaris-ResourceItem--selectable',
      this.selectMode && 'Polaris-ResourceItem--selectMode',
      this.persistActions && 'Polaris-ResourceItem--persistActions',
    );
  }

  public get ownedClassName() {
      return classNames(
          'Polaris-ResourceItem__Owned',
          !this.$slots.media && 'Polaris-ResourceItem__OwnedNoMedia',
      );
  }

  public get checkboxId() {

    return 'ResourceListCheckBox--' + this.id;
  }

  public get tabIndex() {

      return this.loading ? -1 : 0;
  }

  public get itemName() {

      return this.accessibilityLabel || (this.name ||
          (Object.keys(this.resourceName).length > 0 ? this.resourceName.singular : '') || '');
  }

  public handleChange(event) {

    this.$emit('change', this.id, event.checked);
  }

  public stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  public handlePopoverClick() {
    this.actionMenuVisible = !this.actionMenuVisible;
  }
}
</script>
