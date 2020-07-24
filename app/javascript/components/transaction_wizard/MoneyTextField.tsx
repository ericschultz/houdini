
// License: LGPL-3.0-or-later
import * as React from "react";

import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import { Money } from "../../common/money";
import { useCustomIntl } from "../intl/CustomIntl";
import { FormikBag } from "formik";
import { fromPairs } from "lodash";
import { useState } from "react";


export interface ISerializeMoney {
		inputAmount:Money,
		setOutputAmount: (amount:Money) => unknown
}

export interface ISerializeMoneyOutput {
		serializedAmount:string,
		handleChange: (i:string) => void
}

/**
 * Hook for serializing a Money object to a string and back again. Particularly
 * useful for text fields.
 *
 * Example:
 * let money = new Money(100, 'usd')
 * let { serializedAmount, handleChange} = useSerializeMoney(money, (amount) => {money = amount})
 *
 * // serializedAmount gets $1.00 as a string. handleChange receives the new serializedvalue after a change
 * @param inputAmount a Money object
 * @param setOutputAmount used for passing up output of the Hook
 */
export function useSerializeMoney(inputAmount:Money,
	setOutputAmount: (amount:Money) => unknown): ISerializeMoneyOutput {
	const intl = useCustomIntl();
	const serializedAmount = intl.formatMoney(inputAmount);
	const handleChange = React.useCallback((i:string) => {
		let output:Money = Money.fromCents(0, inputAmount.currency);
		if (i != "" && !isNaN(parseFloat(i)))
			output = Money.fromCents(parseFloat(i), inputAmount.currency);
		setOutputAmount(output);
	}, [setOutputAmount, inputAmount]);
	return {serializedAmount, handleChange};
}



function MoneyTextField({ children, currency, ...props }: TextFieldProps & {currency: string}) : JSX.Element {
	const currencyState = useState(currency);
	const {form, field} = props;
	const {name:fieldName} =  field;
	const setFieldCallback = React.useCallback((i:Money) => {
		if (i instanceof Money && !isNaN(i.amount)) {
			form.setFieldValue(fieldName, i);
		}
	}, [form, fieldName]);

	const { serializedAmount: amount, handleChange } = useSerializeMoney(props.field.value, setFieldCallback);

	return <MuiTextField {...fieldToTextField(props)} value={amount}
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleChange(e.target.value as string); }}>
		{children}
	</MuiTextField>;

}

export default MoneyTextField;