import React from 'react'
import type { ColTuple, FooterTuple } from '@/contexts/metals-context.types'

const ResultsTableFooter: React.FC<{
	content: FooterTuple;
	colClasses: ColTuple;
}> = ({ content, colClasses }) => {
	return (
		<tfoot>
			<tr>
				{content.map((item, idx: number) => (
					<td
						key={idx}
						{...colClasses?.length
							? { className: colClasses[idx] }
							: {}
						}
					>
						{item || ''}
					</td>
				))}
			</tr>
		</tfoot>
	)
}

export default ResultsTableFooter
