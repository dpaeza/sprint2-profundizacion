import ServiceCard from "./serviceCard/ServiceCard"

const AvailableServices = () => {
    return (
        <section className="availableServices">
            <h3>Servicios disponibles</h3>
            <section className="servicesCards">
                <ServiceCard icon="directions_car" tittle="Transporte" description="Renta un auto o reserva un shuttle." />
                <ServiceCard icon="where_to_vote" tittle="Vuelos + Hoteles" description="Encuentra las mejores ofertas para tu viaje." />
                <ServiceCard icon="group" tittle="Grupos" description="Obtén una cotización para grupos de más de 9 personas." />
                <ServiceCard icon="hotel" tittle="Hoteles" description="Reserva cualquier habitación en cualquier parte del mundo." />
                <ServiceCard icon="package" tittle="Carga" description="Contamos con servicio de carga y mensajería."/>
            </section>
        </section>
    )
}

export default AvailableServices