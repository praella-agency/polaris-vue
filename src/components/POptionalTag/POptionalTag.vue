<script lang="tsx">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component
    export default class POptionalTag extends Vue {
        @Prop({type: String, required: true}) public tag!: string;
        @Prop({type: Boolean, required: true}) public active!: boolean;

        public render(createElement) {
            const validSlot = this.$slots.default;
            const child = validSlot ? validSlot[0] : createElement('div');
            if (this.active) {
                return createElement(this.tag, {}, [child]);
            }
            return child;
        }
    }
</script>
