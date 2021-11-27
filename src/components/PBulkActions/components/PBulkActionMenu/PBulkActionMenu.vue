<template>
    <PPopover
        :id="this['_uid']"
        :active="isVisible"
        @close="toggleMenuVisibility"
        preferInputActivator
    >
        <PBulkActionButton
            slot="activator"
            disclosure
            @action="toggleMenuVisibility"
            :content="title"
            :indicator="isNewBadgeInBadgeActions"
        />
        <PActionList
            slot="content"
            :items="actions"
            @item-action="toggleMenuVisibility"
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
        },
    }
</script>

<style scoped>

</style>