<!--<template>
    <div class='Polaris-FormLayout'>
        <slot/>
    </div>
</template>-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {PFormLayoutItem} from '@/components/PFormLayout/index';

@Component({

    components: {
        PFormLayoutItem,
    },
})
export default class PFormLayout extends Vue {

    public render(h: any) {

        (this.$slots.default || []).forEach((item: any) =>
            console.log(item));

        return (<div class='Polaris-FormLayout'> {
            (this.$slots.default || []).filter((item: any) => item.tag || item.text.trim().length).map((item: any) =>
                (item.componentOptions && item.componentOptions.tag === 'PFormLayoutGroup') ?
                    (item) : (<PFormLayoutItem>{item}</PFormLayoutItem>))
        }
        </div>);
    }
}
</script>
