# ECON_607_Assign1

_Source: projects/ECON_607_Assign1.pdf_

ECON 607 Assignment 1
     Andrew Girgis
     September 2023




           1
Contents
1 Creating a database                                                           4

2 Calculate the CMHC Mortgage Insurance for all applicable
  mortgages                                                4

3 Which Mortgages are most likely to default and why?                          6
  3.1 How to find mortgages that are most likely to default . . . . . .        6
  3.2 Gross Debt Service Ratio Calculations . . . . . . . . . . . . . . .      7
  3.3 Conclusion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   9

4 Citations                                                                    10




                                       2
List of Figures
  1   Screen capture of the desired SSMS table diagram . . . . . . . .         4
  2   List of new entries to be added to the database . . . . . . . . . .      4
  3   SQL code used to create new table . . . . . . . . . . . . . . . . .      4
  4   Output table of SQL code . . . . . . . . . . . . . . . . . . . . . .     5
  5   Excel spreadsheet including property owners information on the
      mortgage . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   7
  6   Excel spreadsheet including average property taxes on properties
      in all cities of Ontario by property value . . . . . . . . . . . . . .   7
  7   Excel spreadsheet including average utilities cost in Ontario . . .      7
  8   Excel spreadsheet including property owners information on the
      mortgage and their Gross Debt Service Ratio . . . . . . . . . . .        8




                                      3
1    Creating a database
Create a database consisting of the tables in Figure 1. You can import the
tblCustomer.csv, tblMortgage.csv, and tblPropertyOwner.csv files available on
LEARN. Add the entries in Figure 2 to the Customer table BEFORE you set
the foreign key relationships. Back up the database and upload the .bak file to
the LEARN Dropbox along with this completed Worksheet.


         Figure 1: Screen capture of the desired SSMS table diagram




          Figure 2: List of new entries to be added to the database




2    Calculate the CMHC Mortgage Insurance for
     all applicable mortgages
To calculate the CMHC Mortgage Insurance for all applicable mortgages, the
first step I took was to create a new table containing the property owners;
first and last name, credit score, income, property appraisal, down payment,
amortization period and interest rate. I did this using SQL through the query
provided in Figure 3.


                 Figure 3: SQL code used to create new table




                                      4
    Then with this information nicely formatted in a table, I was able to use
the CMHC mortgage calculator at this link to calculate the property owners
mortgage for all applicable mortgages. Figure 4 provides the results in the
column named mortgageInsurance, note that I made the assumption that the
mortgage will be paid monthly.


                     Figure 4: Output table of SQL code




   While conducting the calculations I noticed there were some properties that
could not be entered into the calculator (shown in Figure 4 with the highlighted
NULL value). I referred to the general requirements to qualify for homeowner
mortgage loan insurance through this link to understand why the property mort-
gages wouldn’t be calculated.
Here I will explain the NULL values shown in Figure 4.
   • Line 2: Amortization period is greater than 25 years.
   • Line 3: Amortization period is greater than 25 years.
   • Line 6: Appraisal (Property value) is greater than $1,000,000.
   • Line 14: Appraisal (Property value) is greater than $1,000,000.
   • Line 15: Appraisal (Property value) is greater than $1,000,000.
   • Line 21: Amortization period is greater than 25 years.
   • Line 22: Amortization period is greater than 25 years.
   • Line 23: Amortization period is greater than 25 years.


                                       5
3     Which Mortgages are most likely to default
      and why?
3.1    How to find mortgages that are most likely to default
To find which mortgages were most likely to default I will be using the Gross
Debt Service ratio. The formula for the Gross Debt Service Ratio is given in
Equation 1:

                 P rincipali + Interesti + P ropertyT axesi + U tilitiesi
       GDSi =                                                                (1)
                                 GrossAnnualIncomei
   Since we wont be calculating the exact property taxes and utilities of each
individual property the revised equation is shown in Equation 2
                  P rincipali + Interesti + P ropertyT axes + U tilities
        GDSi =                                                               (2)
                                 GrossAnnualIncomei
    My first attempt was to create a table in SQL with all the information
I would need then add an identifier and a Gross Debt Service Ratio Column,
however the Property Taxes are specific to the area of the property and the value
of the property. The Gross Debt Service Ratio Column formula, if generalized
to a set property value and Canada wide average Property tax, would greatly
misrepresent the likelihood of a default. Another note to make is that some
properties will be calculated under a cumulative household income which would
not be to be represented in the automated formula. After realizing that the
automated formula in SQL wouldn’t work I came to the conclusion that I would
need to manually calculate the Gross Debt Service Ratio. For this I created
an excel spreadsheet with all of the information I would need, see Figure 5 . I
added two sheets to the excel spreadsheet, one included the average property
tax of properties in Ontario based on property value and the other states the
average utilities costs these are the numbers used in the calculation of Gross
Debt Service Ratio, see Figure 6 and Figure 7. I then manually calculated the
Gross Debt Service Ratio for all mortgages and entered them into the GDS
column on the property owners information sheet.




                                       6
Figure 5: Excel spreadsheet including property owners information on the mort-
gage




Figure 6: Excel spreadsheet including average property taxes on properties in
all cities of Ontario by property value




      Figure 7: Excel spreadsheet including average utilities cost in Ontario




3.2     Gross Debt Service Ratio Calculations
                        57229.68 + 6355 + 3840
                 GDS1 =                        = 0.46 = 46%
                                145000
                         40344 + 3178 + 3840
                 GDS2 =                       = 0.62 = 62%
                                 76000
                       61649.64 + 6355 + 3840
                GDS3 =                         = 1.10 = 110%
                                65000
                         40364 + 3178 + 3840
                 GDS4 =                       = 0.51 = 51%
                                 92000



                                        7
                           32986 + 3178 + 3840
                 GDS5,6 =                      = 0.31 = 31%
                              78000 + 48000
                           25888 + 3178 + 3840
                GDS7,8 =                       = 0.42 = 42%
                               71000 + 6300
                          29015 + 3178 + 3840
                 GDS9 =                        = 0.48 = 48%
                                  74000
                         60144 + 6355 + 3840
                GDS10 =                       = 0.104 = 104%
                                 67000
                          16670 + 6754 + 3840
                 GDS11 =                       = 0.40 = 40%
                                  67000
                           3815.28 + 6754 + 3840
               GDS12,13 =                        = 0.14 = 14%
                               54000 + 46000
                 (10699 + 14003) + (1589 + 1589) + 3840
      GDS14,15 =                                        = 0.62 = 62%
                                 57000
                         10699 + 1589 + 3840
                GDS14 =                      = 0.28 = 28%
                                57000
                         14003 + 1589 + 3840
                GDS15 =                      = 0.34 = 34%
                                57000
                        13150 + 13508 + 3840
                GDS16 =                       = 0.26 = 26%
                               114000


Figure 8: Excel spreadsheet including property owners information on the mort-
gage and their Gross Debt Service Ratio




    Some notes to make for the calculations; For the principal + interest I used
the mortgage payments obtained in Figure 4 multiplied by 12 to obtain the
annual principal + interest on the mortgage. For the property taxes I referred
to ’Canadian Property Taxes - By Province’ at this link, this provided me with
averages based on the city and the value of the property. Since this site provided
me with averages of property’s valued at $250,000, $500,000, and $1,000,000 I
rounded the properties of the mortgage applicants to the nearest value then


                                        8
used that average property tax, for example if the property was in Toronto and
worth $850,000 I rounded up and used the average property tax on a property
in Toronto worth $1,000,000. For the average utilities I used the article ’What
is the average cost of utilities for a house in Ontario and why is it increasing?’
at this link, from there I got the average cost of utilities per month as $320
which I then multiplied by 12 to get an annual cost for utilities for all properties
in Ontario, see Figure 7. Using these numbers I calculated all Gross Service
Debt Ratios then entered them into the excel spreadsheet, see Figure 8. For
mortgages on the same property where the two individuals had the same last
name I made the assumption it will be a joint mortgage and for the denominator
I summed the household income, see GDS5,6 as an example. For the case
of one individual attempting to purchase two properties and applying for two
mortgages, I summed the principal and property taxes for both properties and
calculated the GDS ratio under one income, then calculated the GDS ratio for
the individual properties to see whether the individual would be approved for a
single property, see GDS14,15 , GDS14 , GDS15 as an example.

3.3    Conclusion
In conclusion, the individuals most likely to default based on their Gross Debt
Service ratios are Robert Miller and Susan Franko [ID’s 3 & 10 in Figure 8].
The Gross Debt Service Ratio I calculated for these individuals are both over
100% meaning that the cost of the property would be greater than the indi-
viduals annual income. Since the cost of the property would be greater than
the individuals annual income it is very likely that these two individuals will
default on thier mortgage payments. It is important to note that according to
the article ’New CMHC rules may make mortgage applications tougher’ which
can be found through this link, due to COVID-19 the CMHC rules have been
updated, The new requirements are:
   • Gross debt service (GDS) ratios must be under 35, down from 39
   • Total debt service (TDS) ratios must be under 42, down from 44
   • Borrower’s credit score must be at least 680, up from 620
   • Borrowed down payments will no longer be allowed
Under these requirements most individuals on this list would not be eligible for
the CMHC mortgage insurance. The individuals who would be eligible for the
CMHC mortgage insurance are; James and Lisa Brown, Yvonne and Vincent
Hensen, and Paul Judd(but only for one of the properties, not both). All other
individuals either have a Gross Debt Service Ratio greater than 35% or have a
credit score below 680.
    Based on theses findings it is clear that it is wise to consider a joint mortgage
if possible since when you sum the household annual income the denominator
grows making the Gross Debt Service Ratio decrease and increasing the likeli-
hood of being accepted for the mortgage.


                                         9
4     Citations
    • https://www.cmhc-schl.gc.ca/consumers/home-buying/calculators/mortgage-
      calculator
    • https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-
      for-consumers/what-are-the-general-requirements-to-qualify-for-homeowner-
      mortgage-loan-insurance

    • https://www.investopedia.com/terms/g/grossdebtserviceratio.asp::̃text=
      The%20gross%20debt%20service%20(GDS,in%20comparison%20to%20their%20income.
    • https://www.ratehub.ca/blog/new-cmhc-rules-covid-19/
    • https://www.wealthsimple.com/en-ca/learn/canadian-property-taxes

    • https://www.canadianrealestatemagazine.ca/expert-advice/what-is-the-average-
      cost-of-utilities-for-a-house-in-ontario-and-why-is-it-increasing-335134.aspx
    • https://www.nesto.ca/calculators/cmhc-insurance/
    • https://www.nesto.ca/mortgage-basics/debt-service-ratios-how-to-calculate-
      gds-and-tds/




                                     10
