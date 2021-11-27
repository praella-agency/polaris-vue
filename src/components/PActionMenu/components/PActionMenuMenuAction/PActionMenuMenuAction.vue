<template>
    <PUnstyledLink :ref="id" v-if="url" :class="menuActionClassNames" :url="url" :external="external">
        <span v-if="icon || disclosure" class="Polaris-ActionMenu-MenuAction__ContentWrapper">
            <span v-if="icon" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon :source="icon" />
            </span>
            <span class="Polaris-ActionMenu-MenuAction__Content">{{content}}</span>
            <span v-if="disclosure" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon source="CaretDownMinor" />
            </span>
        </span>
        <template v-else>{{content}}</template>
    </PUnstyledLink>
    <button :ref="id" v-else type="button" :class="menuActionClassNames" :disabled="disabled" @click.stop="onAction()">
        <span v-if="icon || disclosure" class="Polaris-ActionMenu-MenuAction__ContentWrapper">
            <span v-if="icon" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon :source="icon" />
            </span>
            <span class="Polaris-ActionMenu-MenuAction__Content">{{content}}</span>
            <span v-if="disclosure" class="Polaris-ActionMenu-MenuAction__IconWrapper">
                <PIcon source="CaretDownMinor" />
            </span>
        </span>
        <template v-else>{{content}}</template>
    </button>
</template>

<script>
    import {classNames} from '../../../../utilities/css';
    import {ComplexAction, MenuActionDescriptor} from '../../../../types';
    import {PIcon} from '../../../../components/PIcon';
    import {PUnstyledLink} from '../../../../components/PUnstyledLink';

    export const MenuActionProps = {
      ...ComplexAction,
        disclosure: Boolean,
    }

    export default {
      name: 'PActionMenuMenuAction',
      components: {
        PUnstyledLink, PIcon,
      },
      props: {
        id: {
          type: [String, Number],
          default: `ActionMenuMenuAction${new Date().getUTCMilliseconds()}`,
        },
        content: {
          type: String,
        },
        url: {
          type: String,
        },
        external: {
          type: Boolean,
        },
        icon: {
          type: String,
        },
        disclosure: {
          type: Boolean,
        },
        disabled: {
          type: Boolean,
        },
        onAction: {
          type: Function,
          default: () => {
            return 0
          },
        },
        getOffsetWidth: {
          type: Function,
          default: () => {
            return 0
          },
        },
      },
      computed: {
        menuActionClassNames() {
          return classNames(
              'Polaris-ActionMenu-MenuAction',
              this.disabled && 'Polaris-ActionMenu-MenuAction--disabled',
          );
        }
      },
      mounted() {
          const actionsLayoutRef = this.$refs[this.id];
          if (typeof this.getOffsetWidth === 'function' && actionsLayoutRef) {
            if(actionsLayoutRef.offsetWidth) {
              this.getOffsetWidth(actionsLayoutRef.offsetWidth);
            }
          }
        }
    }
</script>
