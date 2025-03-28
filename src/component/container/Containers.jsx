import React from 'react'

const Containers = ({ children, className = "" }) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

export default Containers
