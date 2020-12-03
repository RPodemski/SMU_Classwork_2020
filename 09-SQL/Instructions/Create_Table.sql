CREATE TABLE "titles" (
    "title_id" Varchar(50)   NOT NULL,
    "title" Varchar(50)   NOT NULL,
	last_updated timestamp default localtimestamp,
    CONSTRAINT "pk_titles" PRIMARY KEY (
        "title_id"
     )
);

CREATE TABLE "employees" (
    "emp_no" INT   NOT NULL,
    "emp_title_id" Varchar(50)   NOT NULL,
    "birth_date" DATE   NOT NULL,
    "first_name" Varchar(50)   NOT NULL,
    "last_name" Varchar(50)   NOT NULL,
    "sex" Varchar(2)   NOT NULL,
    "hire_date" DATE   NOT NULL,
	last_updated timestamp default localtimestamp,
    CONSTRAINT "pk_employees" PRIMARY KEY (
        "emp_no"
     )
);

CREATE TABLE "departments" (
    "dept_no" Varchar   NOT NULL,
    "dept_name" Varchar   NOT NULL,
	last_updated timestamp default localtimestamp,
    CONSTRAINT "pk_departments" PRIMARY KEY (
        "dept_no"
     )
);

CREATE TABLE "dept_manager" (
    "emp_no" INT   NOT NULL,
    "dept_no" Varchar   NOT NULL,
	last_updated timestamp default localtimestamp,
    CONSTRAINT "pk_dept_manager" PRIMARY KEY (
        "emp_no","dept_no"
     )
);

CREATE TABLE "dept_emp" (
    "emp_no" INT   NOT NULL,
    "dept_no" Varchar   NOT NULL,
	last_updated timestamp default localtimestamp,
    CONSTRAINT "pk_dept_emp" PRIMARY KEY (
        "emp_no", "dept_no"
     )
);

CREATE TABLE "salaries" (
    "emp_no" INT   NOT NULL,
    "salary" INT   NOT NULL,
	last_updated timestamp default localtimestamp,
    CONSTRAINT "pk_salaries" PRIMARY KEY (
        "emp_no"
     )
);

ALTER TABLE "employees" ADD CONSTRAINT "fk_employees_emp_title_id" FOREIGN KEY("emp_title_id")
REFERENCES "titles" ("title_id");

ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_emp_no" FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");

ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_dept_no" FOREIGN KEY("dept_no")
REFERENCES "departments" ("dept_no");

ALTER TABLE "dept_emp" ADD CONSTRAINT "fk_dept_emp_emp_no" FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");

ALTER TABLE "dept_emp" ADD CONSTRAINT "fk_dept_emp_dept_no" FOREIGN KEY("dept_no")
REFERENCES "departments" ("dept_no");

ALTER TABLE "salaries" ADD CONSTRAINT "fk_salaries_emp_no" FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");


