import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const JobList = () => {
  const { jobs, loading,currentPage,totalPages,setCurrentPage } = useContext(JobContext);
   
  if (loading) return <p>Loading jobs...</p>;
  if (!jobs.length) return <p>No job listings found.</p>;
  const pagenate=(page)=>setCurrentPage(page);

  return (
    <section>
      <div className="job-list">
      {currentPage.map(job => (
        <div key={job.id} className="job-card">
          <h2>{job["job-tile"]}</h2>
          <p><strong>User Id:</strong> {job.userId}</p>
          <p><strong>Title:</strong> {job.title}</p>
          <p><strong>Completed:</strong> {job.completed ? "True" : "False"}</p>
        </div>
      ))}
    </div>
     <div className="pagination">
        <button onClick={( )=>pagenate(1)}>First</button>
        {new Array(totalPages).fill(null).map((_, index) => (
          <button className={currentPage===index+1?"active":""}key={index} onClick={() => pagenate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button onClick={( )=>pagenate(totalPages)}>Last</button>

      </div>
    </section>
    
  );
};

export default JobList;