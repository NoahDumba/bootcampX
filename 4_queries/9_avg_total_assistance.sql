SELECT avg(total_request_duration) as avg_total_duration 
FROM (
  SELECT sum(completed_at - started_at) as total_request_duration
  FROM assistance_requests
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  GROUP BY cohorts.name
  ORDER BY total_request_duration
) as total_request_duration;