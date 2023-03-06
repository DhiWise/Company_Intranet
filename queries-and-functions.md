# Queries and Functions

## Create tables:

Run the following query to **create tables** in your supabase project.

```sql
create or replace function create_tables()
returns void
language sql
as $$

create table employe(id bigint generated always as identity primary key, created_at timestamptz default now(),first_name text, middle_name text,last_name text,display_name text,work_email text,personal_email text,image json,job_title text,secondary_job_title text,time_type bigint,gender bigint,joining_date timestamptz,birth_date date,phone_number bigint, address json, employee_number varchar,uuid uuid,tool bigint,user_type bigint, is_send_xyz boolean, last_login timestamptz, tech_tag text, location text);

create table setting(id bigint generated always as identity primary key, created_at timestamptz default now(),name text, is_selected boolean,auth_token text);

create table space(id bigint generated always as identity primary key, created_at timestamptz default now(),space_name text, description text,location text, capacity bigint, image_url text);

create table space_booking(id bigint generated always as identity primary key, created_at timestamptz default now(),booking_title text, space_id bigint references space on delete cascade, booking_from  timestamptz, booking_to timestamtpz, booked_for references employe on delete cascade, sent_mail boolean, updated_at timestampz, updated_by references employe on delete cascade, booking_type text, booking_forName text );

create table space_booking_invitees(id bigint generated always as identity primary key, created_at timestamptz default now(), booking_id bigint references space_booking on delete cascade, employee_id references employe on delete cascade, space_id references space on delete cascade, booked_for references employe on delete cascade, employee_name text);

create table space_resource(id bigint generated always as identity primary key, created_at timestamptz default now(), space_id bigint references space on delete cascade, resource_id references resource on delete cascade);

create table resource(id bigint generated always as identity primary key, resource text);

create table status_update(id bigint generated always as identity primary key, created_at timestamptz , comments text, response_id references google_response on delete cascade, voter_id references google_response on delete cascade, applicant_id references applicants on delete cascade, status boolean);

create table tools(id bigint generated always as identity primary key, tool text,integration_status boolean, is_synced boolean);

create table user_type(id bigint generated always as identity primary key, label text);

create table applicants(id bigint generated always as identity primary key, created_at timestamptz default now(), name text, email text,mobile bigint,experience bigint,job_id bigint,job_title text,is_sent_mail boolean,tech_tag text,sent_xyz boolean,sent_mail_to_hr boolean, overall_vote varchar, is_qualified boolean);

create table google_response(id bigint generated always as identity primary key, created_at timestamptz default now(),response_id varchar, question_id varchar,answer text,applicants_id bigint);

create table notification(id bigint generated always as identity primary key, created_at timestamptz default now(),employe_id bigint,response_id bigint,is_viewed boolean,applicant_id bigint, notification_type references notification_type on delete cascade);

create table notification_type(id bigint generated always as identity primary key, value text);

$$;

SELECT from create_tables();
```
