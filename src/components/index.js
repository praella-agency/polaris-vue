import Vue from 'vue';
import { PBadge } from './PBadge';
import { PBanner } from './PBanner';
import { PButton } from './PButton';
import { PButtonGroup } from './PButtonGroup';
import { PCard, PCardHeader, PCardSection, PCardSubsection } from './PCard';
import { PCheckbox } from './PCheckbox';
import { PDataTable } from './PDataTable';
import { PDisplayText } from './PDisplayText';
import { PFormLayout, PFormLayoutItem, PFormLayoutGroup } from './PFormLayout';
import { PHeading } from './PHeading';
import { PIcon } from './PIcon';
import { PLayout, PLayoutAnnotatedSection, PLayoutSection } from './PLayout';
import { PPage, PPageActions } from './PPage';
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
import { PToggle } from './PToggle';
import { PSettingToggle } from './PSettingToggle';
import { PColorPicker } from './PColorPicker';
import { PTabs } from './PTabs';
import { PRadioButton } from './PRadioButton';
import { PConnected } from './PConnected';
import { PUnstyledLink } from './PUnstyledLink';
import { PLink } from './PLink';
import { PList, PListItem } from './PList';
import { PImage } from './PImage';
import { PThumbnail } from './PThumbnail';
import { PAvatar } from './PAvatar';
import { PModal } from './PModal';
import { PInlineError } from './PInlineError';
import { PPagination } from './PPagination';

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
  PFormLayout, PFormLayoutItem, PFormLayoutGroup,
  PHeading,
  PIcon,
  PLayout, PLayoutAnnotatedSection, PLayoutSection,
  PPage, PPageActions,
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
  PToggle,
  PSettingToggle,
  PColorPicker,
  PTabs,
  PRadioButton,
  PConnected,
  PUnstyledLink,
  PLink,
  PList, PListItem,
  PImage,
  PThumbnail,
  PAvatar,
  PModal,
  PInlineError,
  PPagination,
};

const PolarisVue = {
  install(Vue, options = {}) {
    for (let componentKey in Components) {
      Vue.component(componentKey, Components[componentKey]);
    }
  },
};

export default PolarisVue;
