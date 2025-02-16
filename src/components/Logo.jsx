import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Logo = ({ width = '60px', className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={width}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-900 dark:text-white transition-colors duration-300"
      >
        <path
          d="M25 5C13.402 5 4 14.402 4 26s9.402 21 21 21 21-9.402 21-21S36.598 5 25 5zm10.655 15.813l-8.75 14a2.003 2.003 0 01-3.28.133l-5.25-7a2 2 0 013.2-2.4l3.495 4.66 7.255-11.607a2 2 0 013.33 2.214z"
          className="fill-current"
        />
      </svg>
      <span className="text-xl font-bold">
        <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">Scribe</span>
        <span className="text-gray-900 dark:text-white transition-colors duration-300">Space</span>
      </span>
    </Link>
  )
}

Logo.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string
}

export default Logo