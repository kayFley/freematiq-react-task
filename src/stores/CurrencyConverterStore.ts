import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

interface Rates {
	[key: string]: number
}

class CurrencyConverterStore {
	fromCurrency = localStorage.getItem('fromCurrency') || 'RUB'
	toCurrency = localStorage.getItem('toCurrency') || 'USD'
	fromPrice = localStorage.getItem('fromPrice') || ''
	toPrice = localStorage.getItem('toPrice') || ''
	rates: Rates = {}

	constructor() {
		makeAutoObservable(this)
		this.fetchRates()
	}

	fetchRates = () => {
		axios
			.get('https://www.cbr-xml-daily.ru/latest.js')
			.then(response => {
				const json = response.data
				json.rates['RUB'] = 1
				runInAction(() => {
					this.rates = json.rates
				})
			})
			.catch(error => {
				console.warn(error)
				alert('err')
			})
	}

	setFromCurrency = (currency: string) => {
		this.fromCurrency = currency
		localStorage.setItem('fromCurrency', currency)
	}

	setToCurrency = (currency: string) => {
		this.toCurrency = currency
		localStorage.setItem('toCurrency', currency)
	}

	setFromPrice = (price: string) => {
		this.fromPrice = price
		localStorage.setItem('fromPrice', price)
	}

	setToPrice = (price: string) => {
		this.toPrice = price
		localStorage.setItem('toPrice', price)
	}

	getRate(from: string, to: string): number {
		if (from === 'RUB') return this.rates[to]
		if (to === 'RUB') return 1 / this.rates[from]
		return this.rates[to] / this.rates[from]
	}
}

export default new CurrencyConverterStore()
