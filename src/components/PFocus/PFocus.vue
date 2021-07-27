<template @change="handleChange">
  <slot name="root" />
  <slot />
</template>

<script lang="ts">
  import { Vue, Component, Prop, Ref } from 'vue-property-decorator';

  const FOCUSABLE_SELECTOR =
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';

  @Component({})
  export default class PFocus extends Vue {
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    @Ref() public root!: HTMLElement | null;

    public handleChange() {
      if(this.disabled || !this.root) {
        return;
      }

      const node = this.root;

      if(!node || node.querySelector('[autofocus]')) {
        return;
      }

      this.focusFirstFocusableNode(node, false);
    }

    // public isRef(ref: HTMLElement): ref is HTMLElement {
    //   return ref as HTMLElement !== undefined;
    // }

    public focusFirstFocusableNode(
      element: HTMLElement,
      onlyDescendants = true,
    ) {
      (this.findFirstFocusableNode(element, onlyDescendants) as HTMLElement).focus();
    }

    public findFirstFocusableNode(
      element: HTMLElement,
      onlyDescendants = true,
    ): HTMLElement | null {
      if (!onlyDescendants && this.matches(element, FOCUSABLE_SELECTOR)) {
        return element;
      }

      return element.querySelector(FOCUSABLE_SELECTOR);
    }

    public matches(node: HTMLElement, selector: string) {
      if (node.matches) {
        return node.matches(selector);
      }

      const matches = (node.ownerDocument || document).querySelectorAll(selector);
      let i = matches.length;
      while (--i >= 0 && matches.item(i) !== node) {
        return i > -1;
      }
    }
  }
</script>

<style scoped>

</style>