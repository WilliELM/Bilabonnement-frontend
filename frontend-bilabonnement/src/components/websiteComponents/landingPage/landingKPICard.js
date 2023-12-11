import "./landingKPICard.css"

function KpiCard({ title, value, description }) {
    return (
        <div className="kpi-card">
            <div className="kpi-title">{title}</div>
            <div className="kpi-value">{value}</div>
            {description && <div className="kpi-description">{description}</div>}
        </div>
    );
}


export default KpiCard;
