import { FormikHandlers, FieldProps } from "formik";
import React = require("react");
import _ = require("lodash");
import IntlCurrencyInput, { IntlCurrencyInputProps } from "./IntlCurrencyInput";
import { boundMethod } from "autobind-decorator";
import I18nCurrencyInput from "@houdiniproject/react-i18n-currency-input";
import { Money } from "../../../lib/money";
import { Omit } from "../../../lib/types";


declare type NumberFormatHelperOptions = {
  /**
   * Do we want to require positive numbers? If true, we strip negative signs.
   * @type boolean
   */
  requirePositive: boolean;
} | {
  /**
   * Should numbers always be negative (other than 0)? If so, we make all non-zero numbers negative.
   * @type boolean
   */
  requireNegative: boolean;
};


type FormikCurrencyInputProps = FieldProps<any> & Omit<React.InputHTMLAttributes<HTMLInputElement>,'form'|'value'> &
Omit<IntlCurrencyInputProps, 'value'> & 
Partial<NumberFormatHelperOptions>

export class FormikCurrencyInput extends React.Component<FormikCurrencyInputProps> {


  @boundMethod
  onChangeEvent(instance: I18nCurrencyInput, value:Money){
    //if we're in an initial mount and there was a change, this change wouldn't be recognized
    // from: https://github.com/jaredpalmer/formik/issues/930#issuecomment-479461676
    setTimeout(() => {
      this.props.form.setFieldValue(this.props.field.name, value)
    },0)
  }

  @boundMethod
  onBlurEvent(_instance: I18nCurrencyInput, _value:Money){
    this.props.form.setFieldTouched(this.props.field.name, true)
  }

  render() {
    const {field, form, ...props}  = this.props
    const {onBlur, onChange, ...restOfField} = field
    return <IntlCurrencyInput {...props} {...restOfField} onChange={this.onChangeEvent} onBlur={this.onBlurEvent}/>
  }
}

