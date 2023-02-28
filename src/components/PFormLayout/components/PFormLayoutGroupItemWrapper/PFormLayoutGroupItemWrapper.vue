<script setup>
    import { h, useSlots } from 'vue';
    import { PFormLayoutItem } from '../../../../components/PFormLayout/components/PFormLayoutItem';
    import { wrapNodesWithComponent } from '../../../../ComponentHelpers';

    let slots = useSlots();
    let render = function render() {
      return h('div', {
            class: 'Polaris-FormLayout__Items',
          },
          wrapNodesWithComponent(
              h,
              slots.default(), PFormLayoutItem,
          ),
      );
    };
</script>
