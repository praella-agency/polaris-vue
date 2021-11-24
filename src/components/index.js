import { PBadge } from './PBadge';
import { PBanner } from './PBanner';
import { PButton } from './PButton/index.js';
import { PButtonGroup } from './PButtonGroup/index.js';
import { PCard } from './PCard';
import { PCardHeader } from './PCard/components/PCardHeader';
import { PCardSection } from './PCard/components/PCardSection';
import { PCardSubsection } from './PCard/components/PCardSubsection';
import { PCheckbox } from './PCheckbox/index.js';
import { PDataTable } from './PDataTable';
import { PDisplayText } from './PDisplayText';
import { PFormLayout } from './PFormLayout/index.js';
import { PFormLayoutItem } from './PFormLayout/components/PFormLayoutItem/index.js';
import { PFormLayoutGroup } from './PFormLayout/components/PFormLayoutGroup/index.js';
import { PHeading } from './PHeading';
import { PIcon } from './PIcon';
import { PLayout } from './PLayout';
import { PLayoutSection } from './PLayout/components/PLayoutSection';
import { PLayoutAnnotatedSection } from './PLayout/components/PLayoutAnnotatedSection';
import { PPage } from './PPage';
import { PSelect } from './PSelect';
import { PSkeletonBodyText } from './PSkeletonBodyText';
import { PSkeletonDisplayText } from './PSkeletonDisplayText';
import { PSkeletonThumbnail } from './PSkeletonThumbnail';
import { PSpinner } from './PSpinner';
import { PStack } from './PStack';
import { PStackItem } from './PStack/components/PStackItem';
import { PSubheading } from './PSubheading';
import { PTextContainer } from './PTextContainer';
import { PTextField } from './PTextField';
import { PTextStyle } from './PTextStyle';
import { PToggle } from './PToggle';
import { PSettingToggle } from './PSettingToggle/index.js';
import { PColorPicker } from './PColorPicker/index.js';
import { PTabs } from './PTabs';
import { PRadioButton } from './PRadioButton';
import { PConnected } from './PConnected';
import { PUnstyledLink } from './PUnstyledLink/index.js';
import { PLink } from './PLink/index.js';
import { PList } from './PList';
import { PListItem } from './PList/components/PListItem';
import { PImage } from './PImage';
import { PThumbnail } from './PThumbnail';
import { PAvatar } from './PAvatar/index.js';
import { PModal } from './PModal/index.js';
import { PInlineError } from './PInlineError';
import { PPagination } from './PPagination/index.js';
import { PCaption } from './PCaption';
import { PProgressBar } from './PProgressBar';
import { PResourceList } from './PResourceList';
import { PResourceListItem } from './PResourceList/components/PResourceListItem';
import { PActionList } from './PActionList/index.js';
import { PPopover } from './PPopover/index.js';
import { PTag } from './PTag';
import { PFilter } from './PFilter';
import { PFilterItem } from './PFilter/components/PFilterItem';
import { POptionList } from './POptionList';
import { PBreadcrumbs } from './PBreadcrumbs';
import { PActionMenu } from './PActionMenu';
import { PPageActions } from './PPageActions';
import { PMultiSelect } from './PMultiSelect';
import { PDatePicker } from './PDatePicker/index.js';
import { PMediaCard } from './PMediaCard';
import { PChart } from './PChart/index.js';
import { PEmptyState } from './PEmptyState';
import { PFooterHelp } from './PFooterHelp/index.js';
import { PDropZone } from './PDropZone/index.js';
import PToast from './PToast/index';
import { PChoiceList } from './PChoiceList/index.js';
import PLoading from './PLoading';
import { PFrame } from './PFrame';
import { PTopBar } from './PTopBar';
import { PContextualSaveBar } from './PFrame/components/PContextualSaveBar/index.js';
import { PSkeletonPage } from './PSkeletonPage';
import { PNavigation } from './PNavigation';
import { PVisuallyHidden } from './PVisuallyHidden';
import { PUserMenu } from './PTopBar/components/PUserMenu';
import { PMenu } from './PTopBar/components/PMenu';
import { PSearchField } from './PTopBar/components/PSearchField';
import { PCollapsible } from './PCollapsible';
import { PDataTableRow } from './PDataTable/components/PDataTableRow';
import { PDataTableCol } from './PDataTable/components/PDataTableCol';
import { PIndexTable } from './PIndexTable';
import { PScrollable } from './PScrollable';
import { PTooltip } from './PTooltip';
import { PVerticalTabs } from './PVerticalTabs';

import '@/scss/main.scss';

const Components = {
  PBadge,
  PBanner,
  PButton,
  PButtonGroup,
  PCard, PCardHeader, PCardSubsection, PCardSection,
  PCheckbox,
  PDataTable,
  PDisplayText,
  PFormLayout, PFormLayoutItem, PFormLayoutGroup,
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
  PCaption,
  PProgressBar,
  PResourceList, PResourceListItem,
  PActionList,
  PPopover,
  PTag,
  PFilter, PFilterItem,
  POptionList,
  PBreadcrumbs,
  PActionMenu,
  PPageActions,
  PMultiSelect,
  PDatePicker,
  PMediaCard,
  PChart,
  PEmptyState,
  PFooterHelp,
  PDropZone,
  PChoiceList,
  PLoading,
  PFrame,
  PTopBar,
  PContextualSaveBar,
  PSkeletonPage,
  PNavigation,
  PVisuallyHidden,
  PUserMenu,
  PMenu,
  PSearchField,
  PCollapsible,
  PDataTableRow, PDataTableCol,
  PIndexTable,
  PScrollable,
  PTooltip,
  PVerticalTabs,
};

const PolarisVue = {
  install(Vue, options = {}) {
    for (let componentKey in Components) {
      Vue.component(componentKey, Components[componentKey]);
    }

    Vue.use(PToast);
    Vue.use(PLoading);
    Vue.use(PTooltip);
  },
};

export default PolarisVue;
