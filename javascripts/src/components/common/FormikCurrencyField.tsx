// License: LGPL-3.0-or-later
import * as React from 'react';
import { FieldProps } from 'formik';
import _ = require('lodash');
import FormikLabeledFieldComponent from './FormikLabeledFieldComponent';
import { FormikCurrencyInput } from './form/FormikCurrencyInput';



export interface FCFieldProps<T> extends FieldProps<T> {
  label?:string
  className?:string
  inputClassNames?:string
  inputId?:string
  disabled?:boolean
  prefix?: string

}


type FormikCurrencyFieldProps<T> = FCFieldProps<T> & RequireProps

type RequireProps = {requireNegative?:boolean} & { requirePositive?:boolean }

export default class FormikCurrencyField<T> extends React.Component<FormikCurrencyFieldProps<T>, {}> {
  render() {
    
    return <FormikLabeledFieldComponent
        form={this.props.form}
        field={this.props.field}
        inputId={this.props.inputId}
        labelText={this.props.label}
        className={this.props.className} >
        <FormikCurrencyInput form={this.props.form} field={this.props.field} className={`form-control ${this.props.inputClassNames || ''}`} id={this.props.inputId} disabled={this.props.disabled} requireNegative={this.props.requireNegative} requirePositive={this.props.requirePositive}
        />
    </FormikLabeledFieldComponent>
  }

}

