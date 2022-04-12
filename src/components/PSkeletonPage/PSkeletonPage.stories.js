import { PSkeletonPage } from './index';
import { PLayout } from '../PLayout'
import { PLayoutSection } from '../PLayout/components/PLayoutSection'
import { PCard } from '../PCard';
import { PCardSection } from '../PCard/components/PCardSection';
import { PSkeletonBodyText } from '../PSkeletonBodyText';
import { PSkeletonDisplayText } from '../PSkeletonDisplayText';
import { PTextContainer } from '../PTextContainer';

export default {
    title: 'Feedback indicators / Skeleton Page',
    component: PSkeletonPage,
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PSkeletonPage, PLayout, PLayoutSection, PCard, PCardSection, PSkeletonBodyText, PSkeletonDisplayText,
        PTextContainer,
    },
    template: `
        <PSkeletonPage v-bind="args">
            <PLayout>
                <PLayoutSection>
                    <PCard sectioned>
                        <PSkeletonBodyText/>
                    </PCard>
                    <PCard sectioned>
                        <PTextContainer>
                            <PSkeletonDisplayText size="small"/>
                            <PSkeletonBodyText/>
                        </PTextContainer>
                    </PCard>
                    <PCard sectioned>
                        <PTextContainer>
                            <PSkeletonDisplayText size="small"/>
                            <PSkeletonBodyText/>
                        </PTextContainer>
                    </PCard>
                </PLayoutSection>
                <PLayoutSection secondary>
                    <PCard>
                        <PCardSection>
                            <PTextContainer>
                                <PSkeletonDisplayText size="small"/>
                                <PSkeletonBodyText :lines="2"/>
                            </PTextContainer>
                        </PCardSection>
                        <PCardSection>
                            <PSkeletonBodyText :lines="1"/>
                        </PCardSection>
                    </PCard>
                    <PCard subdued>
                        <PCardSection>
                            <PTextContainer>
                                <PSkeletonDisplayText size="small"/>
                                <PSkeletonBodyText :lines="2"/>
                            </PTextContainer>
                        </PCardSection>
                        <PCardSection>
                            <PSkeletonBodyText :lines="2"/>
                        </PCardSection>
                    </PCard>
                </PLayoutSection>
            </PLayout>
        </PSkeletonPage>`,
});

export const SkeletonPage = Template.bind({});

SkeletonPage.args = {
    title: 'Skeleton Page',
    primaryAction: true,
    secondaryActions: 2,
}
