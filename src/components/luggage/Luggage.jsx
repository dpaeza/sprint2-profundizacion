import briefCase from './../../assets/icons/briefcase.svg';
import briefCaseBlack from './../../assets/icons/briefcaseBlack.svg'

const Luggage = ({ type, price, onClick, active }) => {
    return (
        <div
        className={`luggage ${active ? 'luggage__active' : ''}`}
        onClick={onClick}
        >
            <i>
                <img src={active ? briefCase :briefCaseBlack} alt="brief case icon" />
            </i>
            <p className="type">{type}</p>
            <p className="price">{price}</p>
        </div>
    );
};

export default Luggage;