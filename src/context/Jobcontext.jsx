// src/context/JobContext.js
import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(20);

 
  

  // 🆕 State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setJobs(res.data); // assuming res.data is an array of jobs
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);



  //  Filtered + Searched Jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Apply search
   if (searchQuery) {
  result = result.filter(job =>
    job.userId.toString().includes(searchQuery)
  );
}

    // Apply filter
if (filterType !== '') {
  result = result.filter(job =>
    job.completed === (filterType === 'true')
  );
}
    return result;
  }, [jobs, searchQuery, filterType]);
   //Pagination logic
  const indexOfLastJob = curentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentPage = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);;
  console.log(currentPage);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);  

  return (
    <JobContext.Provider value={{
      jobs: 
      filteredJobs,
      loading,
      searchQuery,
      setSearchQuery,
      filterType,
      setFilterType,
      curentPage,
      setCurrentPage,
      jobsPerPage,
      setJobsPerPage,
      currentPage,
      totalPages
    }}>
      {children}
    </JobContext.Provider>
  );
};