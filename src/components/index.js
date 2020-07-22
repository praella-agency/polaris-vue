import Vue from 'vue';
import { PBadge } from './PBadge';
import { PBanner } from './PBanner';
import { PButton } from './PButton';
import { PButtonGroup } from './PButtonGroup';
import { PCard, PCardHeader, PCardSection, PCardSubsection } from './PCard';
import { PCheckbox } from './PCheckbox';
import { PDataTable } from './PDataTable';
import { PDisplayText } from './PDisplayText';
import { PFormLayout, PFormLayoutItem } from './PFormLayout';
import { PHeading } from './PHeading';
import { PIcon } from './PIcon';
import { PLayout, PLayoutAnnotatedSection, PLayoutSection } from './PLayout';
import { PPage } from './PPage';
import { PSelect } from './PSelect';
import { PSkeletonBodyText } from './PSkeletonBodyText';
import { PSkeletonDisplayText } from './PSkeletonDisplayText';
import { PSkeletonThumbnail } from './PSkeletonThumbnail';
import { PSpinner } from './PSpinner';
import { PStack, PStackItem } from './PStack';
import { PSubheading } from './PSubheading';
import { PTextContainer } from './PTextContainer';
import { PTextField } from './PTextField';
import { PTextStyle } from './PTextStyle';
import '@/scss/main.scss';

const Components = {
  PBadge,
  PBanner,
  PButton,
  PButtonGroup,
  PCard, PCardHeader, PCardSection, PCardSubsection,
  PCheckbox,
  PDataTable,
  PDisplayText,
  PFormLayout, PFormLayoutItem,
  PHeading,
  PIcon,
  PLayout, PLayoutAnnotatedSection, PLayoutSection,
  PPage,
  PSelect,
  PSkeletonBodyText,
  PSkeletonDisplayText,
  PSkeletonThumbnail,
  PSpinner,
  PStack, PStackItem,
  PSubheading,
  PTextContainer,
  PTextField,
  PTextStyle,
};

const PolarisVue = {
  install(Vue, options = {}) {
    for (let componentKey in Components) {
      Vue.component(componentKey, Components[componentKey]);
    }
  },
};

export default PolarisVue;
