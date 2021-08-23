<template>
    <li class="Polaris-ResourceList__ItemWrapper">
        <div :class="className" :data-href="url">
            <a v-if="url" :aria-describedby="id" aria-label="View details" class="Polaris-ResourceItem__Link"
               tabindex="0" id="PolarisResourceListItemOverlay3" :href="url" data-polaris-unstyled="true"></a>
            <div class="Polaris-ResourceItem__Container" :id="id">
                <div class="Polaris-ResourceItem__Owned">
                    <div class="Polaris-ResourceItem__Handle" v-if="selectable">
                        <div class="Polaris-ResourceItem__CheckboxWrapper">
                            <PCheckbox label="Select item" :checked="checked" labelHidden :id="checkboxId"
                                       @change="handleChange"></PCheckbox>
                        </div>
                    </div>
                    <div class="Polaris-ResourceItem__Media" v-if="$slots.media">
                        <slot name="media"/>
                    </div>
                </div>

                <div class="Polaris-ResourceItem__Content">
                    <slot/>
                </div>

                <div
                    v-if="shortcutActions && !loading"
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
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';
import {PCheckbox} from '@/components/PCheckbox';
import {PAvatar} from '@/components/PAvatar';
import {PPopover} from '@/components/PPopover';
import {PButton} from '@/components/PButton';
import {PButtonGroup} from '@/components/PButtonGroup';
import {PActionList} from '@/components/PActionList';

import {Action} from '@/types';

@Component({
  components: {
    PCheckbox, PAvatar, PButtonGroup, PButton, PPopover, PActionList,
  },
})
export default class PResourceListItem extends Vue {

  @Prop({type: Number, required: true}) public id!: number;
  @Prop(String) public url!: string;
  @Prop(String) public image!: string;
  @Prop(String) public initials!: string;
  @Prop({type: Boolean, default: false}) public checked!: boolean;
  @Prop({type: Boolean, default: false}) public selectable!: boolean;
  @Prop({type: Boolean, default: false}) public loading!: boolean;
  @Prop({type: Boolean, default: true}) public persistActions!: boolean;
  @Prop({type: [Array, String], default: null}) public shortcutActions!: Action;

  public actionMenuVisible = false;

  public get className() {
    return classNames(
      'Polaris-ResourceItem',
      this.selectable && 'Polaris-ResourceItem--selectable',
      this.persistActions && 'Polaris-ResourceItem--persistActions',
    );
  }

  public get checkboxId() {

    return 'ResourceListCheckBox--' + this.id;
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
