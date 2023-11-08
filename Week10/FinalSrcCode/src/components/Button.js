// @flow
import * as React from 'react'
import cx from 'classnames'
import {twMerge} from 'tailwind-merge'

export type ButtonProps = {
  /** Text and or Icon to display within the Button */
  children: React.Node,
  /** Optional Boolean to apple Primary button background border and text color styles */
  primary?: boolean,
  /** Optional Boolean to apple Secondary button background border and text color styles */
  secondary?: boolean,
  /** Optional Boolean to apple Success button background border and text color styles */
  success?: boolean,
  /** Optional Boolean to apple Warning button background border and text color styles */
  warning?: boolean,
  /** Optional Boolean to apple Danger button background border and text color styles */
  danger?: boolean,
  /** Optional Boolean to apple Outline button background border and text color styles */
  outline?: boolean,
  /** Optional Boolean to apple Rounded button border radius styles */
  rounded?: boolean,
  /** Optional className for adding additional styles */
  className?: string,
  /** Click handler */
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
}

export default function Button(props: ButtonProps): React.MixedElement {
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    className,
    onClick,
  } = props
  const classes = twMerge(
    cx(className, 'flex items-center px-8 py-3 border', {
      'border-blue-500 bg-blue-600 text-white': primary,
      'border-gray-900 bg-gray-800 text-white': secondary,
      'border-green-500 bg-green-600 text-white': success,
      'bg-orange-400 bg-orange-500 text-white': warning,
      'border-red-600 bg-red-700 text-white': danger,
      // rounded
      'rounded-full': rounded,
      'bg-white': outline,
      // outline variation
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-orange-400': outline && warning,
      'text-red-600': outline && danger,
    })
  )

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

Button.propTypes = {
  // $FlowIgnore
  checkVariationValue: ({primary, secondary, success, warning, danger}) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger)

    if (count > 1) {
      return new Error(
        ' Only one of primary,secondary, success, warning or danger can be true'
      )
    }
  },
}
