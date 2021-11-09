import { PSkeletonPage } from './index';
import { PLayout, PLayoutSection } from '../PLayout'
import { PCard, PCardSection } from '../PCard';
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
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PSkeletonPage, PLayout, PLayoutSection, PCard, PCardSection, PSkeletonBodyText, PSkeletonDisplayText,
        PTextContainer,
    },
    template: `
      <PSkeletonPage v-bind="$props">
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
