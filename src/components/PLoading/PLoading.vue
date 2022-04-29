<template>
    <div class="Polaris-Frame__LoadingBar">
        <div class="Polaris-Frame-Loading" role="progressbar" aria-label="Page loading bar">
            <div class="Polaris-Frame-Loading__Level" :style="style"></div>
        </div>
    </div>
</template>

<script>
    import utils from "../../utilities";
    export default {
        name: 'PLoading',
        props: ['RADON_LOADING_BAR', 'eventBus'],
        data() {
            return {
                loadingStyles: {...this.RADON_LOADING_BAR}
            }
        },
        computed: {
            style() {
                const progress = this.loadingStyles;
                const options = progress.options;
                const isShow = !!options.show;
                const location = options.location;
                const style = {
                    'background-color': options.canSuccess ? options.color : options.failedColor,
                    'opacity': options.show ? 1 : 0,
                    'position': options.position,
                };
                if (location === 'top' || location === 'bottom') {
                    location === 'top' ? style.top = '0px' : style.bottom = '0px';
                    if (!options.inverse) {
                        style.left = '0px';
                    } else {
                        style.right = '0px';
                    }
                    style.width = progress.percent + '%';
                    style.height = '3px';
                    style.transition = isShow ? 'width ' + options.transition.speed + ' linear ' : '';
                } else if (location === 'left' || location === 'right') {
                    location === 'left' ? style.left = '0px' : style.right = '0px';
                    if (!options.inverse) {
                        style.bottom = '0px';
                    } else {
                        style.top = '0px';
                    }
                    style.height = progress.percent + '%';
                    style.width = options.thickness;
                    style.transition = (isShow ? 'height ' + options.transition.speed + ', ' : '') + 'opacity ' +
                        options.transition.opacity;
                }
                return style;
            },
        },
        methods: {
            handleStyle(data) {
                this.loadingStyles = {...data};
            }
        },
        mounted() {
            this.eventBus.on('PLoading-update-data', this.handleStyle);
        },
        [utils.beforeDestroy]() {
            this.eventBus.off('PLoading-update-data', this.handleStyle);
        },
    };
</script>

<style scoped>

</style>
