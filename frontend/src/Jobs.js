import React, {useState, useEffect} from 'react';
import JoblyApi from './Api';
import CardList from "./CardList";
import './Jobs.css'
import Search from './Search'

function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs() {
          let jobs = await JoblyApi.getJobs();
          setJobs(jobs);
        }
    
        getJobs();
      }, []);

    async function handleSearch(search) {
      let jobs = await JoblyApi.getJobs(search);
      setJobs(jobs);
      }

    async function apply(idx) {
      let jobId = jobs[idx].id;
      let message = await JoblyApi.applyToJob(jobId);
      setJobs(j => j.map(job => 
        job.id === jobId ? { ...job, state: message} : job
        ));
      }
      
    return (
        <div className="jobs">
            <Search handleSearch={handleSearch}/>
            <CardList cards={jobs} apply={apply}/>
        </div>
    )
}

export default Jobs
