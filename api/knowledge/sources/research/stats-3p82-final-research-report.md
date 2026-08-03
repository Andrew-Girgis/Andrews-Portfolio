# STATS 3P82 Final research report

_Source: projects/STATS 3P82 Final research report.pdf_

         STATS 3P82
Andrew Girgis and Tanner Markusich
          October 2022




                1
1    Problem

Should you get a Masters degree? There comes a point in a student’s academic

career where they need to make a big decision; should I continue my education

to get my masters degree, or should I go into the labour force? For this research

project, we will try to answer the question of which path makes more income

on average. The people who would be interested in this research project are

upper year students, people with their bachelor’s degree, parents of students,

and universities. Upper year students would benefit from knowing the best

path to take for more future income, bachelor’s degree holders in the work force

could be interested in going back to school for the possibility of more future

income with the master’s and the experience under their belt, parents have a

very strong influence on what their children do with regards to education, and

lastly, universities could use this research to incentivize students to continue

their education if the research can prove that master’s degrees make more money

on average. This project has a lot of importance as it is crucial for students to

weight their options to understand which path is best.



2    Plan

We are interested in the trade-off between having a master’s degree and work

experience in terms of income. We expect both relationships i.e. income and

having a master’s, and income and work experience to be linear. Hence, linear

regression will be the method we apply to our data for analysis; specifically,

multiple linear regression. The following multiple linear regression model will

be the backbone of our research.




                                       2
   Multiple linear regression model (general form):


                             Ŷi = β̂0 + β̂1 X1i + β̂2 X2i


   Our multiple linear regression model:


                    ˆ i = β̂0 + β̂1 M aster′ si + β̂2 Experiencei
                 Income


            ˆ i is our outcome variable, regressed on our independents,
   Where Income

β̂1 M aster′ si and β̂2 Experiencei

   It is possible that the data we gather will be an inflated or deflated sample

relative to the true price level. That is, we may find a sample of data which

is specific to an upper class sample. This may create the illusion that master’s

degrees pay more than they actually do, relative to work experience (if that is

the case). Thus, it may be useful to log one or more of our variables, to evaluate

our model in terms of percentages.


                     ˆ i ) = β̂0 + β̂1 M aster′ si + β̂2 Experiencei
               ln(Income


   We expect that β̂1 will be weakly greater than β̂2 . However, both are ex-

pected to be positive. This is because we hypothesize that the effect of having

a masters degree is more beneficial than the equivalent in years of experience.

This model will be run in R-Studio using the lm() function and the summary()

function will be used to gather relevant standard errors for hypothesis testing.

   The source of our data will be Statcan. However, it is likely that we will

expand our search for data and potentially use data from schools’ websites,

academic journals, and others.

   We would like our sample size to be as large as possible for it to be an

informative one, we know it is informative when sample mean ≈ population


                                          3
mean. We would like to maximize our sample size so that the law of large

numbers can take an effect and reduce the probability that our sample is biased.

From the data we have collected, the sample size is respondents to a survey by

students from Canadian post-secondary institutions. The source did not specify

the exact sample size.



3    Summary of data

The data used for this regression was collected via Statcan. The study that

was found had raw data for masters studies, bachelors studies, male and female.

However the data was not provided in spreadsheet format so the data was ex-

tracted from the research study and organized into an excel spreadsheet. Then

the data was separated by the dummy variables to be used in the regression

model. Some school majors within the data didn’t line up along all variables so

to have a uniform comparison the data was sorted by major in alphabetic order

then the majors that weren’t consistent over all variables were removed from

the data. An example of this within the process was engineering. Engineering is

a major that could have provided a lot of information to the regression model,

unfortunately it had to be removed from the data since there was no informa-

tion on female engineering majors average incomes. After the data was cleaned

of all non consistent majors, the incomes were then put into one column and 2

more columns were created for our dummy variables: Masters - 1 if graduated

with a masters degree - and Male - 1 if male.




                                       4
      Figure 1: Sample of the data compiled and used for the research




                        Table 1: Summary Statistics


 Independents        Mean      SD           Var.       Median         Range
 Male-Master’s       77956   14420.83    207960254.8   76926     [39583, 110518]
 Female-Master’s     67647   12816.11    162452592.5   68407      [28266, 92956]
 Male-Bachelor’s     61743   11498.66    132219219.2   61964      [38462, 89637]
 Female-Bachelor’s   52771   13155.33    173062744.3   51177      [22174, 82193]




4    Regression analysis

In the plan subsection of this research project the proposed regression model

was a multiple linear regression with two independents a dummy variable on

Masters degree and a continuous variable on work experience. Due to lack of

data to support the proposed plan a regression model with three independents


                                     5
of which two are dummy variables and the last is a interaction term between

the two dummy variables will be used. Since there is a lack of available data on

specific individuals average income, work experience and level of education, the

new model will use achieving a masters degree and gender as the two dummy

variables. The new multiple regression model used is as follows

   Multiple linear regression model (general form):


                      Ŷi = β̂0 + β̂1 X1i + β̂2 X2i + β̂3 X1i X2i


   Our multiple linear regression model:


         ˆ i = β̂0 + β̂1 M aster′ si + β̂2 Genderi + β̂3 M aster′ si Genderi
      Income


            ˆ i is our outcome variable, regressed on our independents,
   Where Income

β̂1 M aster′ si , β̂2 Genderi and the interaction term β̂3 M aster′ si Genderi




            Figure 2: normal QQplot for the non transformed data




                                          6
        Figure 3: normal QQplot for the square root transformed data




          Figure 4: normal QQplot for the squared transformed data



   Throughout the research project the data was transformed to check for a

more normally distributed set of residuals. In Figure 2 the lower tail clearly

falls off the line however the upper tail stays relatively close to the QQline. In

Figure 3 the reader can see a very similar graph to Figure 2 where the lower tail

again falls off the line and the upper tail stays close to the QQline. In Figure 4

both the lower and the upper tail deviate off of the QQline suggesting that this


                                        7
model has a less normally distributed set of residuals therefore this model will

not be used for the regression. Between Figure 2 and Figure 3 there is very little

difference so for simplicity sake of interpretations the non transformed data will

be the model used for the regression.




         Figure 5: Scatterplot of Master on income no transformation




                                        8
 Figure 6: Scatterplot of Gender on income no transformation




Figure 7: Scatterplot of interaction on income no transformation




                               9
                     Figure 8: Regression model summary



   H0 : β1 = 0 HA : β1 =/ 0 Decision rule: If |t| < t − critical : f ailtorejectH0

If |t| >= t − critical : rejectH0 andacceptHA

   The test statistic is 5.422 and the t-critical given a = 0.05, 176 degrees of

freedom, two tails is 1.96. It follows that |t| > t − critical. Thus, we reject H0

and accept HA . Therefore, master’s degree has a statistically significant impact

on income.

   The 95% CI for β1 is given by: [9461.586, 20291.036] 0 ̸∈ CI which is con-

sistent with the hypothesis test.

   H0 : β2 = 0 HA : β2 =/ 0 Decision rule: If |t| < t − critical : f ailtorejectH0

If |t| >= t − critical : rejectH0 andacceptHA

   The test statistic is 3.27 and the t-critical given a = 0.05, 176 degrees of

freedom, two tails is 1.96. It follows that |t| > t − critical. Thus, we reject

H0 and accept HA . Therefore, male has a statistically significant impact on

income.

   The 95% CI for β2 is given by: [3558.141, 14387.592] 0 ̸∈ CI which is con-



                                       10
sistent with the hypothesis test.

    H0 : β3 = 0 HA : β3 =/ 0 Decision rule: If |t| < t − critical : f ailtorejectH0

If |t| >= t − critical : rejectH0 andacceptHA

    The test statistic is 0.344 and the t-critical given a = 0.05, 176 degrees of

freedom, two tails is 1.96. It follows that |t| < t − critical. Thus, we fail to

reject H0 .

    Therefore, the interaction term does not have a statistically significant im-

pact on income.

    The 95% CI for β3 is given by: [-6321.734, 8993.422] 0 ∈ CI which is consis-

tent with the hypothesis test.



5     Conclusion

The research question proposed in the problem section of this report was: Which

path [Masters or bachelors] and makes more income on average, and what is the

effect of experience on income? Due to the data change throughout the research

project, the new question that is being answered through this research is ”What

is the affect of having a Masters on your income and does your gender have an

impact on your income?” During the research process, the data has been com-

piled into a spreadsheet, then loaded into RStudio for least-squares regression,

after it was transformed. After the transformation and running the regressions,

it was determined that the original model with no transformations was best to

utilize for the regression. Then the original model was estimated, plotted and

statistically inferred. The results of the regression informed the reader that on

average, an individual who is a female and has a bachelors degree will make

$52,770. The affect of having a masters degree compared to just a bachelors

is that an individual with a masters degree will make $14,876 more income on

average than an individual who just has a bachelors regardless of gender. The


                                        11
affect of being a male on income is that an individual who is a male will make

$8,973 more income on average. As a result of our statistical inference the num-

bers above are statistically. There is also a interaction term in our model that

tells us the impact of having a master’s degree in combination with being male

on income is $1336 however it was evident from the statistic inference that this

term is not statistically significant so we cannot conclude that the interaction

term is truly nonzero. To answer the original question proposed The affect of

having a masters on income is $14,876 more income on average and the affect

of gender on income is $8,973 more income on average. Therefore to optimize

future income having a masters degree will increase income as compared to only

having a bachelors during and gender has a significant difference on income

where males make more income on average.




                                      12
