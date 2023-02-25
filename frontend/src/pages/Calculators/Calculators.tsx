import { Layout } from '@/Layout';
import { useAppSelector } from "@/app/hooks";
import { ImageCropModal } from '@/components/Gallery/ImageTransformation';
import ErrorBoundary from '@/state/ErrorBoundary';
import { MetalsProvider } from '@/contexts/metals-context';
import {
	InformationModal,
	InputCard,
	MetalPricesRibbon,
	ResultsCard
} from './components';

const Calculators = () => {

	const { settings, isLoading } = useAppSelector(state => state.setting);

	return (
		<Layout
			settings={settings}
			isLoading={isLoading}
		>
			<div className="container-lg py-3 ease-in">
				<MetalsProvider>
					<ErrorBoundary>
						<MetalPricesRibbon />
						<InputCard />
						<ResultsCard />
						<InformationModal />
					</ErrorBoundary>
				</MetalsProvider>
			</div>
			<ErrorBoundary>
				<InformationModal />
				<ImageCropModal />
			</ErrorBoundary>
		</Layout>
	)
}

export default Calculators
