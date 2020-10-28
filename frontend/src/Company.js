import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import JoblyApi from './Api'
import CardList from './CardList'
import './Company.css'

function Company() {
    const { handle } = useParams();

    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompanyAndJobs() {
            const c = await JoblyApi.getCompany(handle);
            

            setCompany(c);
        }
        
        getCompanyAndJobs();
    }, [handle])

    if (!company) {
        return <div>Loading...</div>;
      }

    return (
        <div className="body__container">
            <div className="company__container">
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <CardList cards={company.jobs}/>
            </div>
        </div>
    )
}

export default Company
