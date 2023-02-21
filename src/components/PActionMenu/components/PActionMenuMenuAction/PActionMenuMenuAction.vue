<template>
    <PUnstyledLink :ref="refId" v-if="url" :class="menuActionClassNames" :url="url" :external="external">
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
    import { defineComponent, computed, onMounted, ref } from 'vue';
    import { uuid } from '../../../../ComponentHelpers';
    import {classNames} from '../../../../utilities/css';
    import {ComplexAction, MenuActionDescriptor} from '../../../../types';
    import {PIcon} from '../../../../components/PIcon';
    import {PUnstyledLink} from '../../../../components/PUnstyledLink';

    export const MenuActionProps = {
      ...ComplexAction,
        disclosure: Boolean,
    }

    export default defineComponent({
      name: 'PActionMenuMenuAction',
      components: {
        PUnstyledLink, PIcon,
      },
      props: {
        id: {
          type: [String, Number],
          default: `ActionMenuMenuAction${uuid()}`,
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
      setup(props) {
        const refId = ref(props.id);
        const menuActionClassNames = computed(() => {
          return classNames(
              'Polaris-ActionMenu-MenuAction',
              props.disabled && 'Polaris-ActionMenu-MenuAction--disabled',
          );
        });
        onMounted(() => {
          const actionsLayoutRef = refId.value[props.id];
          if (typeof props.getOffsetWidth === 'function' && actionsLayoutRef) {
            if(actionsLayoutRef.offsetWidth) {
              props.getOffsetWidth(actionsLayoutRef.offsetWidth);
            }
          }
        });

        return { menuActionClassNames, refId };
      }
    })
</script>
