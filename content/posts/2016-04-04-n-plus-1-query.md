+++
title = "The N+1 Query Problem"
date = "2016-04-04"
description = "Understanding and solving the N+1 query problem with join fetching"
tags = ["SQL", "Database", "Performance"]
+++

```sql
select * from Students;

select * from Books where studentId = ?;
```

Here you have 1 select statement for the students, and if you have `n` students, you have to fire `n` more queries to fetch their books. So in total you end up with `n+1` select statements to perform this operation.

Now the next question is: how do we solve it?

Using join fetching — joining the parent and children and fetching everything in a single statement — we can solve the N+1 problem. Our query then looks like this:

```sql
select * from Students s join fetch s.Books b;
```
