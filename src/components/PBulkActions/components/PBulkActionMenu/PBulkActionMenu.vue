<template>
    <PPopover
        :id="this['_uid']"
        :active.sync="isVisible"
        @close="handleItemAction"
        preferInputActivator
    >
        <PBulkActionButton
            slot="activator"
            disclosure
            @action="toggleMenuVisibility"
            :content="title"
            :icon="icon"
            :indicator="isNewBadgeInBadgeActions"
        />
        <PActionList
            slot="content"
            :items="actions"
            @item-action="handleItemAction"
        />
    </PPopover>
</template>

<script>
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
        methods: {
            toggleMenuVisibility() {
                this.isVisible = !this.isVisible;
            },
            handleItemAction() {
                this.isVisible = false;
            }
        },
        beforeDestroy() {
            if (document.getElementById('PolarisPopover' + this['_uid'] + 'Overlay')) {
                document.getElementById('PolarisPopover' + this['_uid'] + 'Overlay').remove();
            }
        },
    }
</script>

<style scoped>

</style>