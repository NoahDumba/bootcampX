const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'password',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN teachers ON teachers.id = teacher_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher
`;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));