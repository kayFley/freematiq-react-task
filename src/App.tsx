import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import currencyConverterStore from './stores/CurrencyConverterStore'
import Block from './components/Block/Block'
import CurrencyTable from './components/CurrencyTable/CurrencyTable'
import AddCurrencyForm from './components/AddCurrencyForm/AddCurrencyForm'
import './App.scss'

const App: React.FC = observer(() => {
	const { fromCurrency, toCurrency, fromPrice, toPrice, rates } =
		currencyConverterStore

	const [currencyPairs, setCurrencyPairs] = useState<
		{ from: string; to: string; rate: number }[]
	>([])

	const [newFromCurrency, setNewFromCurrency] = useState<string>('')
	const [newToCurrency, setNewToCurrency] = useState<string>('')

	const onChangeFromPrice = (value: string) => {
		if (fromCurrency === 'RUB') {
			const result = parseFloat(value) / rates[toCurrency]
			currencyConverterStore.setToPrice(
				value !== '' ? result.toFixed(2) : ''
			)
		} else if (toCurrency === 'RUB') {
			const result = parseFloat(value) * rates[fromCurrency]
			currencyConverterStore.setToPrice(
				value !== '' ? result.toFixed(2) : ''
			)
		} else {
			const rubEquivalent = parseFloat(value) * rates[fromCurrency]
			const result = rubEquivalent / rates[toCurrency]
			currencyConverterStore.setToPrice(
				value !== '' ? result.toFixed(2) : ''
			)
		}

		currencyConverterStore.setFromPrice(value)
	}

	const onChangeToPrice = (value: string) => {
		if (toCurrency === 'RUB') {
			const result = parseFloat(value) * rates[fromCurrency]
			currencyConverterStore.setFromPrice(
				value !== '' ? result.toFixed(2) : ''
			)
		} else if (fromCurrency === 'RUB') {
			const result = parseFloat(value) / rates[toCurrency]
			currencyConverterStore.setFromPrice(
				value !== '' ? result.toFixed(2) : ''
			)
		} else {
			const rubEquivalent = parseFloat(value) * rates[fromCurrency]
			const result = rubEquivalent / rates[toCurrency]
			currencyConverterStore.setFromPrice(
				value !== '' ? result.toFixed(2) : ''
			)
		}

		currencyConverterStore.setToPrice(value)
	}

	useEffect(() => {
		onChangeFromPrice(fromPrice)
	}, [fromCurrency, fromCurrency])

	useEffect(() => {
		onChangeToPrice(toPrice)
	}, [toCurrency, toCurrency])

	const addCurrencyPair = (from: string, to: string) => {
		const rate = currencyConverterStore.getRate(from, to)

		if (!isNaN(rate) && isFinite(rate)) {
			const newPairs = [...currencyPairs, { from, to, rate }]
			setCurrencyPairs(newPairs)
			localStorage.setItem('currencyPairs', JSON.stringify(newPairs))
		} else {
			console.error(`err rate from ${from} to ${to}: ${rate}`)
		}
	}

	const handleAddPair = () => {
		if (newFromCurrency && newToCurrency) {
			addCurrencyPair(newFromCurrency, newToCurrency)
			setNewFromCurrency('')
			setNewToCurrency('')
		}
	}

	const handleRemovePair = (index: number) => {
		const newPairs = currencyPairs.filter((_, i) => i !== index)
		setCurrencyPairs(newPairs)
		localStorage.setItem('currencyPairs', JSON.stringify(newPairs))
	}

	//tyt bi zod(
	useEffect(() => {
		const savedPairs = localStorage.getItem('currencyPairs')
		if (savedPairs) {
			try {
				const pairs = JSON.parse(savedPairs)
				const validPairs = pairs.filter(
					(pair: { from: string; to: string; rate: number }) =>
						!isNaN(pair.rate) && isFinite(pair.rate)
				)
				setCurrencyPairs(validPairs)
			} catch (error) {
				console.error('err', error)
			}
		}
	}, [])

	return (
		<div className='App'>
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={currencyConverterStore.setFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>
			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={currencyConverterStore.setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
			<CurrencyTable
				currencyPairs={currencyPairs}
				onRemovePair={handleRemovePair}
			/>
			<AddCurrencyForm
				newFromCurrency={newFromCurrency}
				newToCurrency={newToCurrency}
				onFromCurrencyChange={setNewFromCurrency}
				onToCurrencyChange={setNewToCurrency}
				onAddPair={handleAddPair}
			/>
		</div>
	)
})

export default App
