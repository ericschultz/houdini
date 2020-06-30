// License: LGPL-3.0-or-later
import React from 'react';
import { action } from '@storybook/addon-actions';
import AmountPane from '../components/payment_wizard/AmountPane';
import { Money } from '../common/money';

export default { title: 'AmountPane' };

export const withAmounts:() => JSX.Element = () => <AmountPane currentAmount={Money.fromCents( 1000, 'usd')}
	amountOptions={[500, 1000, 2500, 5000, 10000, 25000, 50000].map((i) => Money.fromCents(i, 'usd'))}
	setAmount={action('set-amount')} setValid={(i) => i}
/>;