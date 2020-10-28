import React from 'react'
import './JobCard.css'

function JobCard({ item = {}, handleApply }) {
    const {title, salary, equity} = item;
    return (
        <div>
            <div className="job__card">
                <h6 className="job__title">{title}</h6>
                <div className="job__information">
                    <p>Salary: ${salary}</p>
                    <p>Equity: {equity}</p>
                </div>
                <button className="job__button" 
                onClick={handleApply}>
                    {item.state ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    )
}

export default JobCard
