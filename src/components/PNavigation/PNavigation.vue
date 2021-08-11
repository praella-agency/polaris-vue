<template>
  <NavigationContext>
    <Provider :value="context">
      <WithinContentContext>
        <Provider value>
          <nav class="Polaris-Navigation" :aria-labelledby="ariaLabelledBy">
            <template v-if="$slots.hasOwnProperty('contextControl')">
              <div class="Polaris-Navigation__ContextControl">
                <slot name="contextControl"/>
              </div>
            </template>
<!--            <template v-else>-->
<!--              <div class="Polaris-Navigation__LogoContainer">-->
<!--                <PUnstyledLink-->
<!--                    -->
<!--                >-->

<!--                </PUnstyledLink>-->
<!--              </div>-->
<!--            </template>-->
          </nav>
        </Provider>
      </WithinContentContext>
    </Provider>
  </NavigationContext>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Provider } from './context';
  import NavigationContext from './context';
  import { WithinContentContext } from './context';
  import { PUnstyledLink } from '../PUnstyledLink';

  @Component({
    components: {
      NavigationContext, Provider, WithinContentContext, PUnstyledLink,
    },
  })
  export default class PNavigation extends Vue {
    @Prop({type: String, default: null}) public location!: string;

    @Prop({type: Function}) public onDismiss!: void;

    /**
     * id of the element used as aria-labelledby
     */
    @Prop({type: String}) public ariaLabelledBy!: string;


    public context = {
      location: this.location,
      onNavigationDismiss: this.onDismiss,
    }
  }
</script>

<style scoped>

</style>