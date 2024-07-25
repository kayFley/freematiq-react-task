import React, { useState } from 'react'
import currencyConverterStore from '../../stores/CurrencyConverterStore'
import './Block.scss'

interface BlockProps {
	value: string
	currency: string
	onChangeValue: (value: string) => void
	onChangeCurrency: (currency: string) => void
}

const defaultCurrencies: string[] = ['RUB', 'USD', 'EUR']

const Block: React.FC<BlockProps> = ({
	value,
	currency,
	onChangeValue,
	onChangeCurrency,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
	const [currencies, setCurrencies] = useState<string[]>(defaultCurrencies)

	const toggleDropdown = async () => {
		setDropdownOpen(prev => !prev)
		if (!dropdownOpen) {
			await fetchCurrencies()
		}
	}

	const fetchCurrencies = async () => {
		await currencyConverterStore.fetchRates()
		const newCurrencies = Object.keys(currencyConverterStore.rates)
		setCurrencies(newCurrencies)
	}

	const selectCurrency = (cur: string) => {
		onChangeCurrency(cur)
		setDropdownOpen(false)
	}

	return (
		<div className='block'>
			<ul className='currencies'>
				{defaultCurrencies.map(cur => (
					<li
						key={cur}
						onClick={() => selectCurrency(cur)}
						className={currency === cur ? 'active' : ''}
					>
						{cur}
					</li>
				))}
				<li className='dropdown-trigger' onClick={toggleDropdown}>
					<svg height='20px' viewBox='0 0 50 50' width='20px'>
						<rect fill='none' height='50' width='50' />
						<polygon points='47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 ' />
					</svg>
					{dropdownOpen && (
						<ul className='dropdown-content'>
							{currencies.map(cur => (
								<li
									key={cur}
									onClick={() => selectCurrency(cur)}
									className={currency === cur ? 'active' : ''}
								>
									{cur}
								</li>
							))}
						</ul>
					)}
				</li>
			</ul>
			<input
				onChange={e => onChangeValue(e.target.value)}
				value={value}
				type='number'
				placeholder='0'
			/>
		</div>
	)
}

export default Block
