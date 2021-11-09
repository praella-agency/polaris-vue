<template>
    <div class="Polaris-Frame__LoadingBar">
        <div class="Polaris-Frame-Loading" role="progressbar" aria-label="Page loading bar">
            <div class="Polaris-Frame-Loading__Level" :style="style"></div>
        </div>
    </div>
</template>

<script>
    const inBrowser = typeof window !== 'undefined';

    export default {
        name: 'PLoading',
        serverCacheKey: () => 'Loading',
        computed: {
            style() {
                const progress = this.progress;
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
            progress() {
                if (inBrowser) {
                    return window.PLoadingEventBus.RADON_LOADING_BAR;
                } else {
                    return {
                        percent: 0,
                        options: {
                            canSuccess: true,
                            show: false,
                            color: 'rgba(0, 127, 95, 1)',
                            failedColor: 'rgba(191,7,17,0.88)',
                            thickness: '3px',
                            transition: {
                                speed: '0.5s',
                                opacity: '0.6s',
                                termination: 300,
                            },
                            location: 'top',
                            autoRevert: true,
                            inverse: false,
                        },
                    };
                }
            },
        },
    };
</script>

<style scoped>

</style>