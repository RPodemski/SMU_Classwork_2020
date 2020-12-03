--Query 1

Select
	e.emp_no,
	e.last_name,
	e.first_name,
	e.sex,
	s.salary
From
	employees e
join salaries s on e.emp_no = s.emp_no

--Query 2

Select
	first_name,
	last_name,
	hire_date
From
	employees
Where 
	extract(year from hire_date) = 1986

--Query 3

Select
	dm.dept_no,
	d.dept_name,
	e.emp_no,
	e.last_name,
	e.first_name
From
	employees e
join dept_manager dm on e.emp_no = dm.emp_no
join departments d on dm.dept_no = d.dept_no

--Query 4

Select
	d.dept_name,
	e.emp_no,
	e.last_name,
	e.first_name
From
	dept_emp de
join employees e on de.emp_no = e.emp_no
join departments d on de.dept_no = d.dept_no

--Query 5

Select
	last_name,
	first_name,
	sex
From
	employees
where 
	first_name = 'Hercules' 
	and last_name like 'B%'

--Query 6

Select
	de.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
From
	employees e
join dept_emp de on e.emp_no = de.emp_no
join departments d on de.dept_no = d.dept_no
where
	d.dept_name = 'Sales'

--Query 7

Select
	de.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
From
	employees e
join dept_emp de on e.emp_no = de.emp_no
join departments d on de.dept_no = d.dept_no
where
	d.dept_name = 'Sales'
	or d.dept_name = 'Development'

--Query 8

Select
	last_name,
	count(*) as lastNameCount
From
	employees
Group By
	last_name
Order By
	lastNameCount desc