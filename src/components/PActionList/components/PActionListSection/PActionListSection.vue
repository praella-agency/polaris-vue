<template>
    <POptionalTag tag="li" :active="hasMultipleSections" class="Polaris-ActionList__Section">
        <div :class="className">
            <p v-if="section.title" class="Polaris-ActionList__Title">
                {{ section.title }}
            </p>
            <ul class="Polaris-ActionList__Actions">
                <PActionListItem
                    v-for="(item, key) in section.items"
                    :key="key"
                    :content="item.content"
                    :icon="item.icon"
                    :helpText="item.helpText"
                    :action="wrapAction(item)"
                >
                    <template v-slot:media="slotProps">
                        <slot name="media" :item="slotProps ? slotProps.item : {}"/>
                    </template>
                </PActionListItem>
            </ul>
        </div>
    </POptionalTag>
</template>

<script>
    import { defineComponent, computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { POptionalTag } from '../../../../components/POptionalTag';
    import { PActionListItem } from '../../../../components/PActionList/components/PActionListItem';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    const SectionInterface = {
        title: String,
        items: Array,
    }

    export default defineComponent({
        name: 'PActionListSection',
        components: {
            PActionListItem, POptionalTag,
        },
        props: {
            section: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('actions', SectionInterface),
            },
            hasMultipleSections: {
                type: Boolean,
            },
        },
        emits: ['item-action'],
        setup(props) {
            const className = computed(() => {
                return classNames(
                    !props.section.title && 'Polaris-ActionList__Section--withoutTitle',
                );
            });

            function wrapAction(action) {
                const old = action.onAction;
                const newAction = Object.assign({}, action);
                if (old) {
                    newAction.onAction = () => {
                      old();
                      emit('item-action', action);
                    };
                }
                return newAction;
            }

            return { className, wrapAction };
        },
    })
</script>
