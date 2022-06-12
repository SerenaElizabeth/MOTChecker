import React from 'react';
import DataCard from '../DataCard';
import { faCalendar, faCar, faGasPump, faBrush, faStopwatch, faCarSide } from '@fortawesome/free-solid-svg-icons';
import './CarData.css'

const CarData = ({ data }) => {
    let daysToGo;

    // get expiry date
    let expireDate = data.motTestExpiryDate ? data.motTestExpiryDate : data.motTestDueDate ? data.motTestDueDate : data.motTests[0].expiryDate ? data.motTests[0].expiryDate : "Unknown"

    //calculate number of days left until MOT expires

    if (expireDate !== "Unknown") {
        let countDownDate = new Date(expireDate).getTime();
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        daysToGo = days
    }

    return (
        <div data-testid="data-card-container" className="data-card-container">
            <DataCard title="Make" icon={faCar} data={data.make ? data.make : "Unknown"} />
            <DataCard title="Model" icon={faCarSide} data={data.model ? data.model : "Unknown"} />
            <DataCard title="Mileage" icon={faStopwatch} data={data.motTests ? data.motTests[0].odometerValue : "Unknown"} />
            <DataCard title="Fuel Type" icon={faGasPump} data={data.fuelType ? data.fuelType : "Unknown"} />
            <DataCard title="Colour" icon={faBrush} data={data.primaryColour ? data.primaryColour : "Unknown"} />
            <DataCard title="MOT Expiry" icon={faCalendar} data={expireDate} />
            <h1>{daysToGo} Days until MOT Expires</h1>
        </div>
    )
}

export default CarData