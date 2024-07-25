import React from 'react'
import './AddCurrencyForm.scss'

interface AddCurrencyFormProps {
	newFromCurrency: string
	newToCurrency: string
	onFromCurrencyChange: (value: string) => void
	onToCurrencyChange: (value: string) => void
	onAddPair: () => void
}

const AddCurrencyForm: React.FC<AddCurrencyFormProps> = React.memo(
	({
		newFromCurrency,
		newToCurrency,
		onFromCurrencyChange,
		onToCurrencyChange,
		onAddPair,
	}) => {
		return (
			<div className='add-currency-form'>
				<input
					type='text'
					value={newFromCurrency}
					onChange={e =>
						onFromCurrencyChange(e.target.value.toUpperCase())
					}
					placeholder='Из валюты (например EUR)'
				/>
				<input
					type='text'
					value={newToCurrency}
					onChange={e =>
						onToCurrencyChange(e.target.value.toUpperCase())
					}
					placeholder='В валюту (например USD)'
				/>
				<button onClick={onAddPair}>Добавить пару</button>
			</div>
		)
	}
)

export default AddCurrencyForm
