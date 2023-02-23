import React from 'react'
import { Card, CardBody } from '@/components/Card';
import { LabelTitle } from '@/components/Text';
import { Col, Row } from '@/components/HTML';
import { SvgIcons } from '@/components/SVGs';
import clsx from 'clsx';
import { Button } from '@/components/Buttons';

import type { ResultsItem, SetResults } from '@components/Tables/ResultsTable/Results.types';

import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import Classes from '../styles/Upload.module.css';

const ResultImage: React.FC<{
	file: ResultsItem<any>;
	setFiles: SetResults<any>;
}> = ({ file, setFiles }) => {

	const image = file?.image;
	const content = file?.content;

	const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFiles(prev => prev.filter(_ => _._id !== file._id));
	};

	return (
		<Col cols="md-6 lg-4">
			<Card className="mb-3 shadow">
				{image?.url ? (
					<img src={image?.url} className="card-img-top" alt={image.name} />
				) : (
					<div
						className={clsx(
							Classes['card-img-top'],
							Classes['image-placeholder'],
							'bg-light py-3'
						)}
						style={{ height: "10rem" }}
					>
						<SvgIcons.PdfFile />
					</div>
				)}
				<CardBody>
					<Row className="text-start small">
						<Col cols="12" className="mb-0 pb-0">
							<span className="h-6 text-truncate py-0">
								<LabelTitle label="File name" value={image?.name} />
							</span>
							<Button
								className="btn btn-link-blue btn-sm p-0 float-end"
								rest={{
									onClick: onDeleteHandler
								}}
							>
								<FaIcon icon="times" className="text-danger" />
							</Button>
						</Col>
						<Col cols="12">
							<LabelTitle label="File size" value={content[1]} />
						</Col>
						<Col cols="12">
							<LabelTitle label="Modified date" value={content[2]} />
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	)
}

export default ResultImage
