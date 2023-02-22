import { library } from '@fortawesome/fontawesome-svg-core';

import {
	faFacebook,
	faTwitter,
	faInstagramSquare,
	faPinterestSquare,
	faLinkedin,
	faGoogle,
	faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
	faInfo,
	faExclamationCircle,
	faExclamationTriangle,
	faInfoCircle,
	faFilePdf,
	faCog,
	faChartLine,
	faCircleNotch,
	faPencilAlt,
	faPlus,
	faImage,
	faEllipsisV,
	faFilter,
	faEllipsisVertical,
	faTimes,
	faUpload,
	faImages,
	faBars,
	faThLarge,
	faSyncAlt,
	faPrint,
	faCropSimple,
	faAngleDown,
	faAngleUp,
	faQuestionCircle,
	faDownload,
	faMinus,
	faEdit
} from '@fortawesome/free-solid-svg-icons';
import {
	faTrashAlt,
	faEdit as faEditReg,
	faCopyright
} from '@fortawesome/free-regular-svg-icons';

const faIconList = () => {
	library.add(
		faMinus,
		faFacebook,
		faTwitter,
		faAngleDown,
		faAngleUp,
		faQuestionCircle,
		faInstagramSquare,
		faDownload,
		faPinterestSquare,
		faLinkedin,
		faGoogle,
		faGithub,
		faEditReg,
		faInfo,
		faExclamationCircle,
		faExclamationTriangle,
		faInfoCircle,
		faCropSimple,
		faFilePdf,
		faCog,
		faChartLine,
		faCircleNotch,
		faPencilAlt,
		faPlus, 		// active
		faImage,
		faEllipsisV,
		faFilter,
		faEllipsisVertical,
		faTimes,
		faUpload,
		faImages,
		faBars,
		faThLarge,
		faSyncAlt,
		faPrint,
		faTrashAlt,
		faEdit,
		faCopyright
	)
}

export default faIconList;
