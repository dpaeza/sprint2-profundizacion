
const PassengerCategory = ({category, range}) => {

    return (
        <div className="PassengerCategory">
            <p className="PassengerCategory__category">{category}</p>
            <p className="PassengerCategory__range">{range}</p>
        </div>
    )
}

export default PassengerCategory