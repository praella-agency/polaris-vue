<template>
    <div class="Polaris-ResourceList__FiltersWrapper">
        <div class="Polaris-Filters">
            <div class="Polaris-Filters-ConnectedFilterControl__Wrapper">
                <div class="Polaris-Filters-ConnectedFilterControl Polaris-Filters-ConnectedFilterControl--right">
                    <div class="Polaris-Filters-ConnectedFilterControl__CenterContainer">
                        <div class="Polaris-Filters-ConnectedFilterControl__Item">
                            <div class="Polaris-Labelled--hidden">
                                <div class="Polaris-Labelled__LabelWrapper">
                                    <div class="Polaris-Label">
                                        <label id="PolarisTextField2Label" for="PolarisTextField2" class="Polaris-Label__Text">Filter customers</label>
                                    </div>
                                </div>
                                <div class="Polaris-Connected">
                                    <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                        <div class="Polaris-TextField Polaris-TextField--hasValue">
                                            <div class="Polaris-TextField__Prefix" id="PolarisTextField2Prefix">
                                                    <span class="Polaris-Filters__SearchIcon">
                                                        <span class="Polaris-Icon">
                                                            <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                                <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414" fill-rule="evenodd"></path>
                                                            </svg>
                                                        </span>
                                                    </span>
                                            </div>
                                            <input id="PolarisTextField2" placeholder="Filter customers" class="Polaris-TextField__Input Polaris-TextField__Input--hasClearButton" aria-labelledby="PolarisTextField2Label PolarisTextField2Prefix" aria-invalid="false" aria-multiline="false" value="Mae">
                                            <div class="Polaris-TextField__Backdrop"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Polaris-Filters-ConnectedFilterControl__RightContainer Polaris-Filters-ConnectedFilterControl__RightContainerWithoutMoreFilters">
                        <div class="Polaris-Filters-ConnectedFilterControl__Item">
                            <div>
                                <button id="Activator-taggedWith" type="button" class="Polaris-Button" tabindex="0" aria-controls="Polarispopover5" aria-owns="Polarispopover5" aria-expanded="false">
									<span class="Polaris-Button__Content">
										<span class="Polaris-Button__Text">Tagged with</span>
										<span class="Polaris-Button__Icon">
											<div class="Polaris-Button__DisclosureIcon">
												<span class="Polaris-Icon">
													<svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
														<path d="M5 8l5 5 5-5z" fill-rule="evenodd"></path>
													</svg>
												</span>
											</div>
										</span>
									</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="Polaris-Filters-ConnectedFilterControl__MoreFiltersButtonContainer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import {PImage} from '@/components/PImage';

    type Size = 'small' | 'medium' | 'large';
    enum Status {
        Pending = 'PENDING',
        Loaded = 'LOADED',
        Errored = 'ERRORED',
    }

    @Component({
        components: {
            PImage,
        },
    })
    export default class PFilter extends Vue {

        @Prop({type: String, default: 'medium'}) public size!: Size;
        @Prop(Boolean) public customer!: boolean;
        @Prop(String) public name!: string;
        @Prop(String) public initials!: string;
        @Prop(String) public source!: string;

        public status = Status.Pending;
        public hasImage = this.source && this.status !== Status.Errored;
        public nameString = this.name || this.initials;

        public get className() {
            return classNames(
                'Polaris-Avatar',
                this.size && `Polaris-Avatar--${variationName('size', this.size)}`,
                !this.customer && `Polaris-Avatar--${variationName('style', this.styleClass(this.nameString))}`,
                this.hasImage && 'Polaris-Avatar--hasImage',
            );
        }

        public styleClass(name?: string) {
            const finalStyleClasses = ['one', 'two', 'three', 'four', 'five', 'six'];
            return name ? finalStyleClasses[name.charCodeAt(0) % finalStyleClasses.length] : finalStyleClasses[0];
        }
    }
</script>
