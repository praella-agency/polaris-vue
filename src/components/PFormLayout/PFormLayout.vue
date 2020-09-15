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
        return (<div class='Polaris-FormLayout'> {
            (this.$slots.default || []).map((item: any) =>
                (item.componentOptions.tag === 'PFormLayoutGroup') ?
                    (item) : (<PFormLayoutItem>{item}</PFormLayoutItem>))
        }
        </div>);
    }
}
</script>
