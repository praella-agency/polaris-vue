<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Example extends Vue {
  @Prop(Number) public first!: number;

  public render(h: any) {
    return (
      <div>
        <p>{this.first}helzlo</p>
        <p>{this.first}helzlo</p>
        {(this.$slots.default || []).map((item: any) => (
          <div>{item}</div>
        ))}
      </div>
    );
  }
}
</script>
