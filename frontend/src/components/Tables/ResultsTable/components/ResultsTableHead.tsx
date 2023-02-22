import React from 'react'
import type { ColTuple, HeadTuple } from '@/contexts/metals-context.types'

const ResultsTableHead: React.FC<{
	headItems: HeadTuple
	colClasses: ColTuple
}> = ({ headItems, colClasses }) => {
	return (
		<thead>
			<tr>
				{['', ...headItems].map((item, idx) => (
					<th
						key={idx}
						scope="col"
						{...colClasses?.length
							? { className: colClasses[idx] }
							: {}
						}
					>
						{idx !== 0 && item}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default ResultsTableHead
