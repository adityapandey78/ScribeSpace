import PropTypes from 'prop-types'

const Container = ({
  children,
  className = '',
  bgColor = 'bg-transparent',
  neonBorder = false,
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto  sm:px-6 lg:px-8 ${className}`}>
      <div className={`relative ${bgColor} rounded-xl ${neonBorder ? 'p-0.5' : ''}`}>
        {neonBorder && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-sm opacity-75"></div>
        )}
        <div className={`relative ${neonBorder ? 'bg-white dark:bg-gray-900 rounded-xl p-6' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  neonBorder: PropTypes.bool,
}

export default Container