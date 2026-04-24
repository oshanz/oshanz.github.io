+++
title = "The N+1 Query Problem"
date = "2016-04-04"
description = "Understanding and solving the N+1 query problem with join fetching"
tags = ["SQL", "Database", "Performance"]
+++

```sql
"select * from Students"

"select * from Books where studentId=?"
```

Here you have 1 select statement for the student and if you have n number of students you have to fire n more queries to select the books. So at the last you have to put n+1 select statements in order to perform this operation.

Now the next question is how to solve it?

Using join fetching (it will join the parent and children and fetch all the information in a single statement) we can solve the n+1 problem.
Now our next query will look like this:

```sql
"from Students s join fetch s.Books b"
```
