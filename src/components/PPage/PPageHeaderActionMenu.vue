<template>
    <div class="Polaris-Page-Header__ActionMenuWrapper">
        <div class="Polaris-ActionMenu">
            <div class="Polaris-ActionMenu-Actions__ActionsLayout">
                <PButton v-for="secondaryAction in secondaryActions"
                         class="Polaris-ActionMenu-MenuAction"
                         :value="secondaryAction.content"
                         :aria-label="secondaryAction.label"
                         @click="secondaryAction.onAction">{{ secondaryAction.content }}</PButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';

  import { PButton } from '@/components/PButton';
  @Component({
    components: { PButton },
  })
  export default class PPageHeaderActionMenu extends Vue {
    @Prop(Array) public secondaryActions!: [];
  }
</script>
