<template>
  <div role="group"
       :class="className"
       :aria-labelledBy="title ? id+'Title' : null"
       :aria-describedby="helpText ? id+'HelpText' : null">
    <div v-if="title"
         :id="id"
         class="Polaris-FormLayout__Title">
      {{ title }}
    </div>
    <PFormLayoutGroupItemWrapper v-for="(slot,name) in $slots" :key="name">
      <!-- @slot The content to display inside the group layout -->
      <slot/>
    </PFormLayoutGroupItemWrapper>
    <div v-if="helpText || $slots.helpText"
         :id="id+'helpText'"
         class="Polaris-FormLayout__HelpText">
      <!-- @slot Form group helpText -->
      <slot name="helpText">
        {{ helpText }}
      </slot>
    </div>
  </div>
</template>

<script>
import { classNames } from '@/utilities/css';
import { PFormLayoutItem } from '@/components/PFormLayout/components/PFormLayoutItem';
import { PFormLayoutGroupItemWrapper } from '@/components/PFormLayout/components/PFormLayoutGroupItemWrapper';
export default {
  name: 'PFormLayoutGroup',
  components: {
    PFormLayoutItem, PFormLayoutGroupItemWrapper,
  },
  props: {
    /**
     * Form group Id
     */
    id: {
      type: [String, Number],
      default: `PolarisFormLayout${new Date().getUTCMilliseconds()}`,
    },
    /**
     * Form group title
     */
    title: {
      type: String,
      default: null,
    },
    /**
     * Form group helpText
     */
    helpText: {
      type: String,
      default: null,
    },
    /**
     * For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.
     *  @values true | false
     */
    condensed: {
      type: Boolean,
      default: false,
    },
    /**
     * Use field groups to arrange multiple fields in a row.
     *  @values true | false
     */
    grouped: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    className() {
      return classNames(
          this.condensed && 'Polaris-FormLayout--condensed',
          !this.condensed && 'Polaris-FormLayout--grouped',
      );
    },
  },
};
</script>