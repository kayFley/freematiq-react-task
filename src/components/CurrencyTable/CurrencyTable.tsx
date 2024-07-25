import React from 'react'
import './CurrencyTable.scss'

interface CurrencyPair {
	from: string
	to: string
	rate: number
}

interface CurrencyTableProps {
	currencyPairs: CurrencyPair[]
	onRemovePair: (index: number) => void
}

const CurrencyTable: React.FC<CurrencyTableProps> = React.memo(
	({ currencyPairs, onRemovePair }) => {
		return (
			<div className='currency-table'>
				<table>
					<thead>
						<tr>
							<th>ИЗ</th>
							<th>В</th>
							<th>КУРС</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{currencyPairs.map((pair, index) => (
							<tr key={index}>
								<td>{pair.from}</td>
								<td>{pair.to}</td>
								<td>{pair.rate.toFixed(2)}</td>
								<td>
									<button onClick={() => onRemovePair(index)}>
										Удалить
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
)

export default CurrencyTable
