import { PBadge } from './../components/PBadge/index.js';
import { PBanner } from './../components/PBanner/index.js';
import { PButton } from './PButton';
import { PButtonGroup } from './PButtonGroup';
import { PCard } from './PCard';
import { PCardHeader } from './PCard/components/PCardHeader';
import { PCardSection } from './PCard/components/PCardSection';
import { PCardSubsection } from './PCard/components/PCardSubsection';
import { PCheckbox } from './PCheckbox';
import { PDataTable } from './PDataTable';
import { PDisplayText } from './../components/PDisplayText/index.js';
import { PFormLayout } from './PFormLayout';
import { PFormLayoutItem } from './PFormLayout/components/PFormLayoutItem';
import { PFormLayoutGroup } from './PFormLayout/components/PFormLayoutGroup';
import { PHeading } from './../components/PHeading/index.js';
import { PIcon } from './../components/PIcon/index.js';
import { PLayout } from './PLayout';
import { PLayoutSection } from './PLayout/components/PLayoutSection';
import { PLayoutAnnotatedSection } from './PLayout/components/PLayoutAnnotatedSection';
import { PPage } from './PPage';
import { PSelect } from './PSelect';
import { PSkeletonBodyText } from './../components/PSkeletonBodyText/index.js';
import { PSkeletonDisplayText } from './../components/PSkeletonDisplayText/index.js';
import { PSkeletonThumbnail } from './../components/PSkeletonThumbnail/index.js';
import { PSpinner } from './../components/PSpinner/index.js';
import { PStack } from './PStack';
import { PStackItem } from './PStack/components/PStackItem';
import { PSubheading } from './../components/PSubheading/index.js';
import { PTextContainer } from './../components/PTextContainer/index.js';
import { PTextField } from './PTextField';
import { PTextStyle } from './../components/PTextStyle/index.js';
import { PToggle } from './PToggle';
import { PSettingToggle } from './PSettingToggle';
import { PColorPicker } from './PColorPicker';
import { PTabs } from './PTabs';
import { PRadioButton } from './PRadioButton';
import { PConnected } from './PConnected';
import { PUnstyledLink } from './PUnstyledLink';
import { PLink } from './PLink';
import { PList } from './PList';
import { PListItem } from './PList/components/PListItem';
import { PImage } from './PImage';
import { PThumbnail } from './../components/PThumbnail/index.js';
import { PAvatar } from './PAvatar';
import { PModal } from './PModal';
import { PInlineError } from './PInlineError';
import { PPagination } from './PPagination';
import { PCaption } from './../components/PCaption/index.js';
import { PProgressBar } from './../components/PProgressBar/index.js';
import { PResourceList } from './PResourceList';
import { PResourceListItem } from './PResourceList/components/PResourceListItem';
import { PActionList } from './PActionList';
import { PPopover } from './PPopover';
import { PTag } from './PTag';
import { PFilter } from './PFilter';
import { PFilterItem } from './PFilter/components/PFilterItem';
import { POptionList } from './POptionList';
import { PBreadcrumbs } from './PBreadcrumbs';
import { PActionMenu } from './PActionMenu';
import { PPageActions } from './PPageActions';
import { PMultiSelect } from './PMultiSelect';
import { PDatePicker } from './PDatePicker';
import { PMediaCard } from './PMediaCard';
import { PChart } from './PChart';
import { PEmptyState } from './PEmptyState';
import { PFooterHelp } from './PFooterHelp';
import { PDropZone } from './PDropZone';
import PToast from './PToast/index';
import { PChoiceList } from './PChoiceList';
import PLoading from './PLoading';
import { PFrame } from './PFrame';
import { PTopBar } from './PTopBar';
import { PContextualSaveBar } from './PFrame/components/PContextualSaveBar';
import { PSkeletonPage } from './../components/PSkeletonPage/index.js';
import { PNavigation } from './PNavigation';
import { PVisuallyHidden } from './../components/PVisuallyHidden/index.js';
import { PUserMenu } from './PTopBar/components/PUserMenu';
import { PMenu } from './PTopBar/components/PMenu';
import { PSearchField } from './PTopBar/components/PSearchField';
import { PCollapsible } from './../components/PCollapsible/index.js';
import { PDataTableRow } from './PDataTable/components/PDataTableRow';
import { PDataTableCol } from './PDataTable/components/PDataTableCol';
import { PIndexTable } from './PIndexTable';
import { PScrollable } from './../components/PScrollable/index.js';
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
