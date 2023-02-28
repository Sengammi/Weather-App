import React from 'react';

const Header = (props) => {
    return (
            <p className="header">{props.title}</p>
    )
}
Header.defaultProps = {
    title: 'Head'
}
export default Header;