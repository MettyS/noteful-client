import React from 'react'
import './CircleButton.css'
import propTypes from 'prop-types';

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.propTypes = {
	tag: propTypes.oneOfType([propTypes.string, propTypes.func]),
	className: propTypes.string
}

NavCircleButton.defaultProps ={
  tag: 'a',
}
