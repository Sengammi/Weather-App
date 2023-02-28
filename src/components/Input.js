import React from 'react';

const Input = (props) => {

    return (
        <div>
            <form id={'form'} onSubmit={event => {
                event.preventDefault()
            }}
            onKeyDown={event => {
                if (event.key === 'Enter') {
                    props.onEdit();
                }
            }}>
                <input className={'input-city'} placeholder={'Another city'}  onChange={(e)=>{props.city(e.target.value)}}/>
                <button id={'search-button'} onClick={props.onEdit} type={"button"}>Search</button>
            </form>
        </div>
    )

}
Input.defaultProps = {
    city: 'Sadzhavka'
}


export default Input;