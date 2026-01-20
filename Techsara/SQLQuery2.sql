use db_churn
Select Gender, Count(Gender) as TotalCount,
Count(Gender) * 100.0 / (select Count(*) from Customer_Data) as percentage
from Customer_Data
group by GENDER

SELECT Contract, COUNT(Contract) as TotalCount,
Count(Contract) * 1.0 / (select Count(*) from Customer_Data) as percentage
from Customer_Data
Group by Contract

select Customer_Status,Count(Customer_Status) as TotalCount, sum(Total_Revenue) as TotalRev,
Sum(Total_Revenue) / (select sum(Total_Revenue) from Customer_Data) * 100 as RevPercentage
from Customer_Data
Group by Customer_Status

SELECT State, Count(State) as TotalCount,
Count(State) * 100.0 / (select Count(*) from Customer_Data) as percentage
from Customer_Data
Group by State
Order by percentage desc

select distinct Internet_Type
from Customer_Data


