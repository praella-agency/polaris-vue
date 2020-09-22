<template>

    <div :class="className">
        <div class="Polaris-ResourceList__HeaderContentWrapper">
            <div class="Polaris-ResourceList__HeaderTitleWrapper">Showing {{resourceTitle}}</div>
            <div class="Polaris-ResourceList__CheckableButtonWrapper">
                <div class="Polaris-ResourceList-CheckableButton Polaris-ResourceList-CheckableButton__CheckableButton--plain">
                    <div class="Polaris-ResourceList-CheckableButton__Checkbox">
                        <label class="Polaris-Choice Polaris-Choice--labelHidden" for="PolarisCheckbox7">
                                <span class="Polaris-Choice__Control">
                                    <span class="Polaris-Checkbox">
                                        <input id="PolarisCheckbox7" type="checkbox" class="Polaris-Checkbox__Input" aria-invalid="false" role="checkbox" aria-checked="false" value="">
                                        <span class="Polaris-Checkbox__Backdrop"></span>
                                        <span class="Polaris-Checkbox__Icon">
                                            <span class="Polaris-Icon">
                                                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                    <path d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.437.437 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path>
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            <span class="Polaris-Choice__Label">Select all 2 customers</span>
                        </label>
                    </div>
                    <span class="Polaris-ResourceList-CheckableButton__Label">Showing 2 customers</span>
                </div>
            </div>
            <div class="Polaris-ResourceList__SortWrapper">
                <div class="Polaris-Labelled--hidden">
                    <div class="Polaris-Labelled__LabelWrapper">
                        <div class="Polaris-Label"><label id="PolarisSelect1Label" for="PolarisSelect1" class="Polaris-Label__Text">Sort by</label></div>
                    </div>
                    <div class="Polaris-Select">
                        <select id="PolarisSelect1" class="Polaris-Select__Input" aria-invalid="false">
                            <option value="DATE_MODIFIED_DESC">Newest update</option>
                            <option value="DATE_MODIFIED_ASC">Oldest update</option>
                        </select>
                        <div class="Polaris-Select__Content" aria-hidden="true" aria-disabled="false">
                            <span class="Polaris-Select__InlineLabel">Sort by</span>
                            <span class="Polaris-Select__SelectedOption">Newest update</span>
                            <span class="Polaris-Select__Icon"><span class="Polaris-Icon">
                                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                        <path d="M13 8l-3-3-3 3h6zm-.1 4L10 14.9 7.1 12h5.8z" fill-rule="evenodd"></path>
                                    </svg>
                                </span>
                                </span>
                        </div>
                        <div class="Polaris-Select__Backdrop"></div>
                    </div>
                </div>
            </div>
            <div class="Polaris-ResourceList__SelectButtonWrapper">
                <button type="button" class="Polaris-Button">
                        <span class="Polaris-Button__Content">
                            <span class="Polaris-Button__Icon">
                                <span class="Polaris-Icon">
                                    <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                        <path d="M9 14.41l-3.71-3.7 1.42-1.42L9 11.59l5.29-5.3 1.42 1.42L9 14.41zM17 2H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"></path>
                                    </svg>
                                </span>
                            </span>
                            <span class="Polaris-Button__Text">Select</span>
                        </span>
                </button>
            </div>
        </div>
        <div class="Polaris-ResourceList__BulkActionsWrapper">
            <div>
                <div class="Polaris-ResourceList-BulkActions__Group Polaris-ResourceList-BulkActions__Group--largeScreen Polaris-ResourceList-BulkActions__Group--exited">
                    <div class="Polaris-ResourceList-BulkActions__ButtonGroupWrapper">
                        <div class="Polaris-ButtonGroup Polaris-ButtonGroup--segmented" data-buttongroup-segmented="true">
                            <div class="Polaris-ButtonGroup__Item">
                                <div class="Polaris-ResourceList-CheckableButton">
                                    <div class="Polaris-ResourceList-CheckableButton__Checkbox">
                                        <label class="Polaris-Choice Polaris-Choice--labelHidden" for="PolarisCheckbox8">
                                                <span class="Polaris-Choice__Control">
                                                    <span class="Polaris-Checkbox">
                                                        <input id="PolarisCheckbox8" type="checkbox" class="Polaris-Checkbox__Input" aria-invalid="false" role="checkbox" aria-checked="false" value="">
                                                        <span class="Polaris-Checkbox__Backdrop"></span>
                                                        <span class="Polaris-Checkbox__Icon">
                                                            <span class="Polaris-Icon">
                                                                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                                    <path d="M8.315 13.859l-3.182-3.417a.506.506 0 0 1 0-.684l.643-.683a.437.437 0 0 1 .642 0l2.22 2.393 4.942-5.327a.437.437 0 0 1 .643 0l.643.684a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0"></path>
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            <span class="Polaris-Choice__Label">Select all 2 customers</span>
                                        </label>
                                    </div>
                                    <span class="Polaris-ResourceList-CheckableButton__Label">0 selected</span>
                                </div>
                            </div>
                            <div class="Polaris-ButtonGroup__Item">
                                <div class="Polaris-ResourceList-BulkActions__BulkActionButton">
                                    <button type="button" class="Polaris-Button">
                                            <span class="Polaris-Button__Content">
                                                <span class="Polaris-Button__Text">Edit customers</span>
                                            </span>
                                    </button>
                                </div>
                            </div>
                            <div class="Polaris-ButtonGroup__Item"><div>
                                <div>
                                    <div class="Polaris-ResourceList-BulkActions__BulkActionButton">
                                        <button type="button" class="Polaris-Button" tabindex="0" aria-controls="Polarispopover8" aria-owns="Polarispopover8" aria-expanded="false">
                                                <span class="Polaris-Button__Content">
                                                    <span class="Polaris-Button__Text">More actions</span>
                                                    <span class="Polaris-Button__Icon">
                                                        <div class="Polaris-Button__DisclosureIcon">
                                                            <span class="Polaris-Icon">
                                                                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                                                                    <path d="M5 8l5 5 5-5z" fill-rule="evenodd"></path></svg>
                                                            </span>
                                                        </div>
                                                    </span>
                                                </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';

    interface ResourceNameInterface {
        singular: string,
        plural: string,
    }

    @Component({
        components: {

        },
    })
    export default class PResourceList extends Vue {

        @Prop({required: true,type: Object}) public resourceName!: ResourceNameInterface;
        @Prop(Object) public promotedBulkActions!: object;
        @Prop(Object) public BulkActions!: object;
        @Prop(Number) public totalCount!: number;

        public get className() {
            return classNames(
                'Polaris-ResourceList__HeaderWrapper',
                this.promotedBulkActions && 'Polaris-ResourceList__HeaderWrapper--hasSelect',
                this.promotedBulkActions && 'Polaris-ResourceList__HeaderWrapper--hasSort',
            );
        }

        public get resourceTitle() {

            const resourceName: ResourceNameInterface = this.resourceName;
            const title = this.$slots.hasOwnProperty('default') && (this.$slots.default ?? []).length > 2 ? resourceName.plural : resourceName.singular;


        }
    }
</script>
