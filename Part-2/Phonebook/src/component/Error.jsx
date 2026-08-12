
const Error = ({error}) => {
    if(error == null) {
        return null
    }
    return(
        <div className="Error">
            <h3>
                {error}
            </h3>
        </div>
    )
}

export default Error