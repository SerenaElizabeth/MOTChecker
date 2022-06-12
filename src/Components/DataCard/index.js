import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './DataCard.css'


const DataCard = ({ title, icon, data }) => {
    return (
        <div data-testid="data-card" className='data-card'>
            <div className='icon-container'>
                <FontAwesomeIcon className="icon" icon={icon} />
            </div>
            <div className='text-container'>
                <p>{title}</p>
                {data ? <h1>{data}</h1> : <h1>Unknown</h1>}
            </div>

        </div>
    )
}

export default DataCard