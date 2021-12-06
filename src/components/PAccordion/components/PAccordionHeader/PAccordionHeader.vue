<template>
    <h2 class="Polaris-Accordion-Header" :id="`heading${index}`">
        <button
            :class="className(index)"
            @click="handleToggle(index)"
            type="button"
        >
            <PHeading>{{ title }}</PHeading>
            <PIcon
                v-if="showIcon"
                class="Polaris-Accordion-Icon"
                :source="setIcon(index)"
            />
        </button>
    </h2>
</template>

<script>
    export default {
        name: 'PAccordionTitle',
        props: {
            title: '',
        }
    }
</script>

<style scoped>

</style>