

export default function Numbers_container(props) {
    if (props.inputValue !== '') {console.log(props.inputValue)}

    return (
        <div className="numbers_container">
            {(props.inputValue?.split('')[props.id] !== undefined) 
                ? <h5>{props.inputValue?.split('')[props.id]}</h5>
                : ''
            }
        </div>
    )
}