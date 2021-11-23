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
                    :action="wrapAction(item)"/>
            </ul>
        </div>
    </POptionalTag>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { POptionalTag } from '../../../../components/POptionalTag';
    import { PActionListItem } from '../../../../components/PActionList/components/PActionListItem/index.js';

    const SectionInterface = {
        title: String,
        items: [],
    }

    export default {
        name: 'PActionListSection',
        components: {
            PActionListItem, POptionalTag,
        },
        props: {
            section: {
                type: Object,
                default: () => ({}),
                // Validator
            },
            hasMultipleSections: {
                type: Boolean,
            },
        },
        computed: {
            className() {
                return classNames(
                    !this.section.title && 'Polaris-ActionList__Section--withoutTitle',
                );
            },
        },
        methods: {
            wrapAction(action) {
                const old = action.onAction;
                const newAction = Object.assign({}, action);
                if (old) {
                    newAction.onAction = () => {
                        old();
                        this.$emit('item-action', action);
                    };
                }
                return newAction;
            },
        }
    }
</script>
