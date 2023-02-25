import { useMemo } from 'react'
import { SiteData } from '@/data'
import { ModalWrapper } from '@/components/Modals';
import { SpreadInfoTip } from '.';

const InformationModal = () => {

	const message = useMemo(() => <SpreadInfoTip />, []);

	return (
		<ModalWrapper
			modalID={SiteData.modalIDs.spreadInfo}
			modalTitle="Spread Information"
		>
			<div className="d-flex justify-content-start align-items-center">
				<div
					className="container rounded-3 bg-dark text-slate-300 shadow p-3 text-sm"
				>
					{message}
				</div>
			</div>
		</ModalWrapper>
	)
}

export default InformationModal
