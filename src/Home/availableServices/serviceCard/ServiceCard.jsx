
const ServiceCard = ( {icon, tittle, description}) => {
    return (
        <div className="serviceCard">
            <div>
                <span className="material-symbols-outlined" >
                    {icon}
                </span>
            </div>
            <span className="serviceCard__tittle">{tittle}</span>
            <p>{description}</p>
        </div>
    )
}

export default ServiceCard