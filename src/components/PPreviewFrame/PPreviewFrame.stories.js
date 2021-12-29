import { PPreviewFrame } from './index';
import { PVerticalDivider } from '../PVerticalDivider';
import { PIcon } from '../PIcon';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PTextStyle } from '../PTextStyle';
import { PBadge } from '../PBadge';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { PTextField } from '../PTextField';
import { PCard } from '../PCard';
import { PConnected } from '../PConnected';
import { PActionList } from '../PActionList';
import { PHeading } from '../PHeading';
import { POptionList } from '../POptionList';
import { PTextContainer } from '../PTextContainer';
import { PHorizontalDivider } from '../PHorizontalDivider';
import { PImage } from '../PImage';

export default {
    title: 'Preview Frame',
    component: PPreviewFrame,
    parameters: {
        layout: 'fullscreen',
        docs: {
            inlineStories: false,
            iframeHeight: 600,
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PPreviewFrame, PVerticalDivider, PIcon, PStack, PStackItem, PTextStyle, PBadge, PPopover, PButton, PTextField,
        PCard, PConnected, PActionList, PHeading, POptionList, PTextContainer, PHorizontalDivider, PImage,
    },
    data() {
        return {
            searchActive: false,
            leftSideOptions: [],
            openSidebar: false,
            rightTitle: null,
        };
    },
    template: `
        <PPreviewFrame
            v-bind="$props"
            :openRightSidebar.sync="openSidebar"
            :rightSidebarTitle="rightTitle || 'Side bar'"
        >
            <template slot="header.left">
                <PButton plainAction icon="ExitMajor"/>
                <PVerticalDivider/>
                <PTextStyle>Debut</PTextStyle>
                <PBadge status="success" progress="complete" size="small">Live</PBadge>
            </template>
            <template slot="header.center">
                <PPopover
                    id="PreviewFrameSearch"
                    :active="searchActive"
                    @close="() => {this.searchActive = false}"
                >
                    <PButton 
                        slot="activator"
                        full-width 
                        :disclosure="searchActive ? 'up' : 'down'"
                        @click="handleSearchClick"
                    >
                        Home Page
                    </PButton>
                    <template slot="content">
                        <div>
                            <div style="padding: 1.2rem 1.1rem;">
                                <PConnected>
                                    <PTextField placeholder="Search online store">
                                        <PIcon source="SearchMinor" slot="prefix"/>
                                    </PTextField>
                                </PConnected>
                            </div>
                            <div>
                                <PActionList
                                    :sections="[
                                        {
                                            title: 'Templates',
                                            items: [
                                                {
                                                    content: 'Home page',
                                                    icon: 'HomeMajor'
                                                },
                                                {
                                                    content: 'Products',
                                                    icon: 'ProductsMajor'
                                                },
                                            ]
                                        }
                                    ]"
                                />
                            </div>
                        </div>
                    </template>
                </PPopover>
            </template>
            <template slot="header.right">
                <PButton primary>Save</PButton>    
            </template>
            <template slot="sidebar.left.content">
                <POptionList 
                    :options="[{
                        value: 'header',
                        label: 'Header'
                    }]"
                    :sections="[{
                        title: '',
                        options: [
                            {
                                value: 'image-with-text-overlay',
                                label: 'Image with text overlay',
                            },
                        ]
                    }]"
                    :selected="leftSideOptions"
                    @change="updateLeftOptions"
                />
            </template>
            <template slot="sidebar.left.footer">
                <div style="padding-top: 0.8rem; padding-bottom: 0.8rem;">
                    <PButton plainAction>
                        <PTextStyle variation="strong">Theme settings</PTextStyle>
                    </PButton>
                </div>
            </template>
            <template slot="sidebar.right.content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" 
                     style="display: flex; justify-content: center; align-items: center; flex: 0 0 auto; width: 4.5rem; height: 4.5rem; fill: #5c5f62"
                >
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 18h4v3h-3v3h-3v-4a2 2 0 012-2zm7 3h5v-3h-5v3zm-3 18v1a1 1 0 01-1 1h-3a2 2 0 01-2-2v-4h3v3h2a1 1 0 011 1zm-6-7h3v-5h-3v5zm14.841.766c-.358.124-.655.38-.832.714l-1.426 2.695-1.607-7.369 6.533 3.029-2.668.931zm7.29-2.096l-12.634-5.858a1.5 1.5 0 00-2.096 1.681l3.126 14.326a1.5 1.5 0 002.791.382l3.067-5.797 5.609-1.957a1.502 1.502 0 00.137-2.777zM41 20v3a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2h-3v-3h4a2 2 0 012 2zM14 8h24V5H14v3zM7 8h4V5H7v3zm34-3a3 3 0 00-3-3H7a3 3 0 00-3 3v31a3 3 0 003 3h6a1 1 0 001-1v-1a1 1 0 00-1-1H7V11h31v2a1 1 0 001 1h1a1 1 0 001-1V8h-.021c.01-1.235.021-3 .021-3z"></path>
                </svg>
                <PTextContainer spacing="tight">
                    <PHeading>Customize your templates</PHeading>
                    <PTextStyle>Select a section or block in the sidebar to start.</PTextStyle>
                </PTextContainer>
            </template>
            <template>
                <PImage
                    source="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                    style="height: 100%; width: 100%"
                />
            </template>
        </PPreviewFrame>
    `,
    methods: {
        handleSearchClick() {
            this.searchActive = !this.searchActive;
        },
        updateLeftOptions(selected) {
            this.leftSideOptions = selected;
            this.openSidebar = !this.openSidebar;
            this.rightTitle = selected[0];
        },
    },
});

export const PreviewFrame = Template.bind({});

PreviewFrame.args = {
    leftSidebarTitle: 'Home page',
    showUndoRedo: true,
    showPreviewOptions: true,
    undoActions: {
        onAction: () => {
            console.log('Undo Actions');
        },
    },
    redoActions: {
        disabled: true,
        onAction: () => {
            console.log('Redo Actions');
        },
    },
}
