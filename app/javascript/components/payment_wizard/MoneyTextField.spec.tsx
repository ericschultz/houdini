
// License: LGPL-3.0-or-later

import React from 'react'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MoneyTextField from './MoneyTextField'
import { Field, Formik } from 'formik'
import { Money } from '../../common/money'
import { useState } from 'react'

function FormikHandler(props:{input:Money}) {
	const [money, setMoney] = useState(props.input)
	return <>
		<div><span aria-label="amount">{money.amount}</span><span aria-label="currency">{money.currency}</span></div>
		<Formik initialValues={{value: money }} onSubmit={(props) => setMoney(props.value)}>
			<Field component={MoneyTextField} name="value" aria-label="field"/>
		</Formik>
	</>
}

describe('MoneyTextField', () => {
	it('displays the $8.00 when Money of {800, usd} is passed in', async () => {
		const result = render(<FormikHandler input={Money.fromCents({amount:800, currency:'usd'})}/>)
		const field = result.container.querySelector("input[name=value]")
		expect(field).toHaveValue("$8")
		const amount = await result.findByLabelText('amount')
		const currency = await result.findByLabelText('currency')

		expect(amount).toHaveTextContent("800")
		expect(currency).toHaveTextContent("usd")
	})
})


