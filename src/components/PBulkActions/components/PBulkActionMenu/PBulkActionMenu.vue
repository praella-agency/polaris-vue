<template>
    <PPopover
        :id="uuid"
        :active.sync="isVisible"
        @close="handleItemAction"
        preferInputActivator
    >
        <template #activator>
            <PBulkActionButton
                disclosure
                @action="toggleMenuVisibility"
                :content="title"
                :icon="icon"
                :indicator="isNewBadgeInBadgeActions"
            />
        </template>
        <template #content>
            <PActionList
                :items="actions"
                @item-action="handleItemAction"
            />
        </template>
    </PPopover>
</template>

<script>
    import { uuid } from '../../../../ComponentHelpers';
    import { PPopover } from '../../../../components/PPopover';
    import { PActionList } from '../../../../components/PActionList';
    import { PBulkActionButton } from '../../../../components/PBulkActions/components/PBulkActionButton';

    export default {
        name: 'PBulkActionMenu',
        components: {
            PBulkActionButton, PPopover, PActionList,
        },
        props: {
            title: {
                type: String,
                default: null,
            },
            icon: {
                type: Object,
                default: () => ({}),
            },
            actions: {
                type: Array,
                default: () => ([]),
            },
            isNewBadgeInBadgeActions: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isVisible: false,
            };
        },
        computed: {
            uuid() {
                return uuid();
            },
        },
        methods: {
            toggleMenuVisibility() {
                this.isVisible = !this.isVisible;
            },
            handleItemAction() {
                this.isVisible = false;
            }
        },
        beforeDestroy() {
            if (document.getElementById('PolarisPopover' + this.uuid + 'Overlay')) {
                document.getElementById('PolarisPopover' + this.uuid + 'Overlay').remove();
            }
        },
    }
</script>

<style scoped>

</style>