import "./landingKPICard.css"
const KpiCard = ({ title, value, description }) => {
    return (
        <div className="kpi-card">
            <div className="kpi-title">{title}</div>
            <div className="kpi-description">{description}</div>
            <div className="kpi-value">{value}</div>
        </div>
    );
};

export default KpiCard;
