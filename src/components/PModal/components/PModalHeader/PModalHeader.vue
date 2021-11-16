<template>
    <div class="Polaris-Modal-Header">
        <div :id="id" class="Polaris-Modal-Header__Title">
            <PDisplayText element="h2" size="small">
                <slot/>
            </PDisplayText>
        </div>
        <PModalCloseButton @click="$emit('close', $event)" />
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PDisplayText } from '@/components/PDisplayText';
  import { PModalCloseButton } from '@/components/PModal/components/PModalCloseButton';

  @Component({
    components: {
        PDisplayText, PModalCloseButton,
    },
  })
  export default class PModelHeader extends Vue {
    @Prop([String, Number]) public id!: string | number;
  }
</script>
