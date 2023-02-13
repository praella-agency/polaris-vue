<script>
    import { vue } from '../../../../ComponentHelpers';
    import { PFormLayoutItem } from '../../../../components/PFormLayout/components/PFormLayoutItem';
    import { wrapNodesWithComponent } from '../../../../ComponentHelpers';

    let render = function render() {
      return vue.h('div', {
            class: 'Polaris-FormLayout__Items',
          },
          wrapNodesWithComponent(
              vue.h,
              this.$slots.default(), PFormLayoutItem,
          ),
      );
    };

    export default {
        name: 'PFormLayoutGroupItemWrapper',
        components: {
            PFormLayoutItem,
        },
        render,
    }
</script>
