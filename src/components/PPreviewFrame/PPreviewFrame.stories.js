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
        PCard, PConnected, PActionList, PHeading, POptionList,
    },
    data() {
        return {
            searchActive: false,
            leftSideOptions: [],
        };
    },
    template: `
        <PPreviewFrame
            left-sidebar-title="Left Sidebar Title"
            right-sidebar-title="Right Sidebar Title"
        >
            <template slot="leftTopBar">
                <PIcon source="LogOutMinor"/>
                <PVerticalDivider/>
                <PTextStyle>Debut</PTextStyle>
                <PBadge status="success" progress="complete" size="small">Live</PBadge>
            </template>
            <template slot="centerTopBar">
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
            <template slot="rightTopBar">
                <PButton icon="DesktopMajor"/>
                <PVerticalDivider/>
                <PButton icon="UndoMajor"/>
                <PButton icon="RedoMajor"/>
                <PVerticalDivider/>
            </template>
            <template slot="rightCorner">
                <PButton primary>Save</PButton>    
            </template>
            <template slot="leftSidebarTitle">
                <PHeading>Home Page</PHeading>
            </template>
            <template slot="leftSidebarContent">
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
            <template slot="leftSidebarFooter">
                
            </template>
        </PPreviewFrame>
    `,
    methods: {
        handleSearchClick() {
            this.searchActive = !this.searchActive;
        },
        updateLeftOptions(selected) {
            this.leftSideOptions = selected;
        },
    },
});

export const PreviewFrame = Template.bind({});
