
const Success = ({errormsg}) => {
    if(errormsg == null) {
        return null
    }
    return( 
        <div className="success">
            {errormsg}
        </div>
    )
}

export default Success