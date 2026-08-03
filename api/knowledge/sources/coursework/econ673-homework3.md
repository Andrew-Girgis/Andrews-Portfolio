# ECON673_Homework3

_Source: projects/ECON673_Homework3.pdf_

               ECON 673 High Dimensional Data - Homework 3

                                      Andrew Girgis & Matthew Lee

                                                   2025-03-18


Contents
   0.1   Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    2
   0.2   Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   2
         0.2.1 Load Libraries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       2
         0.2.2 Load and Explore Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .          3
         0.2.3 Data Cleaning . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        3

1 Questions                                                                                                          5
  1.1 Question 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       5
  1.2 Question 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       7
  1.3 Question 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       9
      1.3.1 Visualizing Propensity Scores . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .            9
      1.3.2 Interpretation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        12
  1.4 Question 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      13
      1.4.1 Method 1: Linear Regression adjustment . . . . . . . . . . . . . . . . . . . . . . . . .                13
      1.4.2 Method 2: Inverse probability weighting . . . . . . . . . . . . . . . . . . . . . . . . . .             13
      1.4.3 Method 3: Matching . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .            13
      1.4.4 Interpretation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        14
  1.5 Question 5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      15


Contents




                                                          1
0.1     Objective                    ECON 673 High Dimensional Data                                      2


0.1       Objective
The objective of this assignment is to estimate the causal effect of high school graduation on wages using
observational data. We will explore different methods to estimate the effect, including linear regression
adjustment, inverse probability weighting (IPW), and propensity score matching. We will also assess the
validity of the causal estimates by examining the distribution of propensity scores and the overlap between
treated and untreated groups.

0.2       Data
The data provided is 753 observations with 22 features from the 1970’s and investigate women’s wages and
labour force participation purchases in the US.All the observations are features of women who potentially
worked in 1975. The features are as follows:
      • inlf: an indictor for whether the worker is in the labour force in 1975
      • hours: total hours worked in 1975
      • kidslt6: number of kids who are less than 6 years old
      • kidsge6: number of kids who are at least 6 years old
      • age: wage in years
      • educ: years of schooling
      • wage: wage estimated by the researchers from earnings and hours worked
      • repwage: reported wage in an interview in 1976
      • hushrs: hours worked by husband in 1975
      • husage: age of husband in years
      • huseduc: husband’s years of schooling
      • huswage: husband’s hourly wage in 1975
      • faminc: family income, 1975
      • mtr: federal marginal tax rate faced by the worker
      • motheduc: mother’s years of schooling
      • fatheduc: father’s years of schooling
      • unem: unemployment rate in county where worker lives
      • city: indicator for if the worker lives in a city
      • exper: years of actual labour market experience
      • nwifeinc: (faminc - wage × hours) / 1000
      • lwage: log wage
      • expersq: exper2

0.2.1      Load Libraries

library(readr)
library(dplyr)
library(tidyverse)
library(ggplot2)
library(ggdag)
library(xtable)
library(caret)
library(huxtable)
library(glmnet)
library(Hmisc)
library(skimr)
library(jtools)
library(kableExtra)
library(sjPlot)
library(pander)
library(knitr)


March 18, 2025                                  Homework 3                  Andrew Girgis & Matthew Lee
0.2   Data                       ECON 673 High Dimensional Data                             3



library(stargazer)
library(maps)
library(usmap)
library(stringr)
library(mltools)
library(data.table)
library(fastDummies)
library(hdm)
library(twang)
library(lmtest)
library(Matching)


0.2.2   Load and Explore Data

# Load data
mroz <- read.table("MROZ.raw", na.strings = ".")
nvec <- scan("MROZ.DES", what = "character", skip = 2, nlines = 3)
names(mroz) <- nvec

# Display data structure
str(mroz)

## 'data.frame':    753 obs. of 22 variables:
## $ inlf     : int 1 1 1 1 1 1 1 1 1 1 ...
## $ hours    : int 1610 1656 1980 456 1568 2032 1440 1020 1458 1600 ...
## $ kidslt6 : int 1 0 1 0 1 0 0 0 0 0 ...
## $ kidsge6 : int 0 2 3 3 2 0 2 0 2 2 ...
## $ age      : int 32 30 35 34 31 54 37 54 48 39 ...
## $ educ     : int 12 12 12 12 14 12 16 12 12 12 ...
## $ wage     : num 3.35 1.39 4.55 1.1 4.59 ...
## $ repwage : num 2.65 2.65 4.04 3.25 3.6 4.7 5.95 9.98 0 4.15 ...
## $ hushrs : int 2708 2310 3072 1920 2000 1040 2670 4120 1995 2100 ...
## $ husage : int 34 30 40 53 32 57 37 53 52 43 ...
## $ huseduc : int 12 9 12 10 12 11 12 8 4 12 ...
## $ huswage : num 4.03 8.44 3.58 3.54 10 ...
## $ faminc : int 16310 21800 21040 7300 27300 19495 21152 18900 20405 20425 ...
## $ mtr      : num 0.722 0.661 0.692 0.781 0.622 ...
## $ motheduc: int 12 7 12 7 12 14 14 3 7 7 ...
## $ fatheduc: int 7 7 7 7 14 7 7 3 7 7 ...
## $ unem     : num 5 11 5 5 9.5 7.5 5 5 3 5 ...
## $ city     : int 0 1 0 0 1 1 0 0 0 0 ...
## $ exper    : int 14 5 15 6 7 33 11 35 24 21 ...
## $ nwifeinc: num 10.9 19.5 12 6.8 20.1 ...
## $ lwage    : num 1.2102 0.3285 1.5141 0.0921 1.5243 ...
## $ expersq : int 196 25 225 36 49 1089 121 1225 576 441 ...

0.2.3   Data Cleaning

summary(mroz$hours)

##      Min. 1st Qu.   Median    Mean 3rd Qu.     Max.
##       0.0     0.0    288.0   740.6 1516.0    4950.0




March 18, 2025                            Homework 3              Andrew Girgis & Matthew Lee
0.2   Data                    ECON 673 High Dimensional Data                             4



mroz_big <- mroz

# Remove rows with women who chose not to enter the labour force
mroz <- mroz %>%
  filter(hours != 0)

# Create a binary variable for whether the women finished high school or not
mroz$high_school <- ifelse(mroz$educ >= 12, 1, 0)

# Create a binary variable for the number of children the women has
mroz$kids <- mroz$kidslt6 + mroz$kidsge6




March 18, 2025                         Homework 3              Andrew Girgis & Matthew Lee
                                      ECON 673 High Dimensional Data                                           5


1     Questions
1.1    Question 1
Estimate the conditional mean log wage as a function of experience, the number of children a woman has,
and whether she has finished high school. Then: (a) Interpret the intercept estimate(s). (b) Interpret how
high school attainment is related to wages. (c) How do wages change as years of experience increase? (d)
Discuss how you would interpret these estimates—how would you describe the associations detected by the
regression model?
# Fit linear regression model
Q1_model <- lm(lwage ~ exper + kids + high_school, data = mroz)

summary(Q1_model)

##
## Call:
## lm(formula = lwage ~ exper + kids + high_school, data = mroz)
##
## Residuals:
##      Min       1Q   Median       3Q       Max
## -3.11277 -0.36545 0.01786 0.39494 2.15450
##
## Coefficients:
##              Estimate Std. Error t value Pr(>|t|)
## (Intercept) 0.752079    0.118288    6.358 5.29e-10 ***
## exper        0.013009   0.004622    2.815 0.00511 **
## kids        -0.028321   0.026471 -1.070 0.28528
## high_school 0.373542    0.090506    4.127 4.42e-05 ***
## ---
## Signif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
##
## Residual standard error: 0.7003 on 424 degrees of freedom
## Multiple R-squared: 0.06878,     Adjusted R-squared: 0.06219
## F-statistic: 10.44 on 3 and 424 DF, p-value: 1.222e-06
Q1_coefficients <- round(Q1_model$coefficients, 3)

 (a) Interpret the intercept estimate(s).
The intercept estimate of the regression model is 0.752, which represents the expected log wage when all
other predictors are zero. In this case, it indicates the expected log wage is 0.752 when the women has 0
years of experience, 0 children under 6 years old, 0 children over 6 years old, and has not finished high school.
 (b) Interpret how high school attainment is related to wages.
The coefficient estimate for high school attainment is 0.374, which represents the change in the expected log
wage if the variable is 1 compared to 0, holding all other predictors constant. In this case, the coefficient
estimate of 0.374 indicates the change in the expected log wage if a women finishes high school compared to
one who does not, holding all other predictors constant.
If a women finishes high school, the expected log wage is expected to increase by 0.374 compared to if she did
not finish high school.
 (c) How do wages change as years of experience increase?
The coefficient estimate for experience is 0.013, which represents the change in the expected log wage for a
one-unit increase in experience, holding all other predictors constant. In this case, the coefficient estimate of



March 18, 2025                                   Homework 3                     Andrew Girgis & Matthew Lee
1.1   Question 1                    ECON 673 High Dimensional Data                                        6


0.013 indicates the change in the expected log wage for a one-year increase in experience, holding all other
predictors constant.
For every additional year of experience, the expected log wage is expected to increase by 0.013.
 (d) Discuss how you would interpret these estimates—how would you describe the associations detected by
     the regression model?
The regression estimates show that high school attainment and experience are positively associated with
higher log wages, holding other factors constant. These are conditional associations, not necessarily causal
effects, as unobserved factors like ability or family background may influence both education and wages.
While the model highlights important relationships, causal interpretation would require stronger assumptions
or further analysis to address potential confounding.




March 18, 2025                                 Homework 3                   Andrew Girgis & Matthew Lee
1.2   Question 2                    ECON 673 High Dimensional Data                                         7


1.2    Question 2
Now consider estimating the causal effect of having a high school degree on wages. Draw a DAG to express
the causal effect of a high school degree on wages for the subpopulation of women who have entered the
labour force.
wage_dag <- dagify(lwage ~ high_school + exper,
                   exper ~ high_school,
                   exper ~ kids,
                   lwage ~ exper,
                   hours ~ kids,
                   lwage ~ hours,
                   labels = c(
                     "lwage" = "Log Wage",
                     "high_school" = "High School",
                     "exper" = "Experience",
                     "kids" = "# of Children",
                     "hours" = "Hours Worked"
                     ),
                   outcome = "lwage")

ggdag(wage_dag,
      text = FALSE,
      use_labels = "label",
      node_size = 0,
      label_col = "blue") +
  theme_dag()


                                          # of Children



             Hours Worked

                                                                                    Experience




                                  Log Wage


                                                                           High School
#Save the DAG as a png file
ggsave("wage_dag.png", width = 6, height = 4)

We believe that Wage should be impacted by the # of children, as a woman has more children, it becomes
more economically efficient to work less hours (and since some jobs are greedy (Goldin 2014) ) This should
negatively impact log wage. This would be through a channel of hours worked. (We are choosing to ignore
the potential impact of wage on # of children to remain acyclical) Furthermore, by this logic we would expect


March 18, 2025                                  Homework 3                   Andrew Girgis & Matthew Lee
1.2   Question 2                    ECON 673 High Dimensional Data                                         8


that a women with more children would have less experience (via the child penalty).
We believe that wage should be impacted by experience, as a long standing assumption that experience is an
effective proxy for ability, and employers also use experience as a proxy for ability. While we would love to
observe ability itself, (and employers estimation of ability) we are unable to.
We believe that wage should be impacted by Highschool as many jobs tend to require a high school diploma,
and those jobs tend to have higher wages.
We believe that # of children are impacted by Education, as it’s a well documented phenomenon that
the more educated a woman is the less children they have on average. The evidence of this based on the
development economics is overwhelmingly that this is the case.
We believe that there is an impact on high school on experience, as if a woman does not complete high school,
she can use that time to begin working sooner. This would give a direct negative impact on experience from
high school completion.




March 18, 2025                                  Homework 3                   Andrew Girgis & Matthew Lee
1.3   Question 3                   ECON 673 High Dimensional Data                                      9


1.3     Question 3
Devise a model to estimate the propensity scores for graduating from high school, pick a way to estimate
them and explain what you did. Given the estimated propensity scores, does it appear that you can achieve
conditional ignorability of finishing high school on a worker’s potential wages?
# Fit a logistic regression model to estimate propensity scores
t0 <- glm(high_school ~ 1, data = mroz, family = "binomial")
tbig <- glm(high_school ~ exper + kids, data = mroz, family = "binomial")

tstep <- step(t0, formula(tbig), direction = "forward", trace = 1)

## Start: AIC=389.82
## high_school ~ 1
##
##         Df Deviance    AIC
## <none>       387.82 389.82
## + kids   1   387.76 391.76
## + exper 1    387.79 391.79
mroz$pscore <- tstep$fitted # Propensity scores!

# Extract propensity scores
mroz$propensity_scores <- predict(tbig, type = "response")

# Check the distribution of propensity scores
summary(mroz$propensity_scores)

##      Min. 1st Qu.   Median     Mean 3rd Qu.       Max.
##    0.8140 0.8286    0.8324   0.8318 0.8354      0.8405
M <- model.matrix(mroz$high_school ~ ., data = subset(mroz, select = c(exper, kids)))
lalasso <- glmnet(M, mroz$high_school, family = "binomial")

lacv <- cv.glmnet(M, mroz$high_school, family = "binomial")
pscore_lacv <- predict(lacv, newx = M, type = "response",
s = "lambda.min")

1.3.1   Visualizing Propensity Scores

plot(mroz$propensity_scores, type = "l", col = "blue", lwd = 1, xlab = "Observation",
    ylab = "Propensity Score")




March 18, 2025                                Homework 3                  Andrew Girgis & Matthew Lee
1.3   Question 3                                       ECON 673 High Dimensional Data                              10




                                       0.835



                  Propensity Score     0.825



                                       0.815

                                               0         100             200            300          400

                                                                    Observation
# Plot the distribution of propensity scores
ggplot(mroz, aes(x = propensity_scores)) + geom_histogram(fill = "lightblue", color = "black",
    bins = 20) + labs(title = "Distribution of Propensity Scores", x = "Propensity Score",
    y = "Frequency") + theme_minimal()

                                     Distribution of Propensity Scores
                    50



                    40




      Frequency
                    30



                    20



                    10



                           0

                                                      0.82                     0.83                      0.84
                                                                Propensity Score
# Check for overlap in propensity scores
ggplot(mroz, aes(x = propensity_scores, fill = factor(high_school))) + geom_density(alpha = 0.5) +
    labs(title = "Propensity Score Overlap by High School Graduation", x = "Propensity Score",
        y = "Density", fill = "High School") + theme_minimal()




March 18, 2025                                                  Homework 3                Andrew Girgis & Matthew Lee
1.3   Question 3                             ECON 673 High Dimensional Data                                     11


                      Propensity Score Overlap by High School Graduation

                 80




                 60


                                                                                                 High School

       Density
                                                                                                     0
                 40
                                                                                                     1



                 20




                 0

                                     0.82                  0.83                    0.84
                                               Propensity Score
# Check for balance in propensity scores
ggplot(mroz, aes(x = propensity_scores)) + geom_histogram(fill = "skyblue", color = "black",
    bins = 20) + facet_wrap(~high_school, labeller = labeller(high_school = c(`0` = "No High School",
    `1` = "High School"))) + labs(title = "Propensity Score Distribution by Treatment Group",
    x = "Propensity Score", y = "Count") + theme_minimal()

                      Propensity Score Distribution by Treatment Group
                                    No High School                              High School



              40



              30



      Count   20



              10



                 0
                             0.82            0.83        0.84            0.82             0.83           0.84
                                                      Propensity Score



March 18, 2025                                        Homework 3                  Andrew Girgis & Matthew Lee
1.3   Question 3                     ECON 673 High Dimensional Data                                         12


1.3.2   Interpretation
The propensity scores were estimated using a logistic regression model with exper and kids as predictors.
The predicted scores were extracted and stored in the dataset. We confirmed that the scores fall within the
valid probability range of 0 to 1. Upon visual inspection of the distribution, the propensity scores ranged
from 0.8140 to 0.8405, displaying a left-skewed but relatively concentrated distribution.
Despite the narrow range, the density plots for treated and untreated groups indicate sufficient overlap, which
is a key requirement for common support and for applying causal inference methods like IPW or matching.
This observed overlap supports the potential for achieving conditional ignorability, assuming that all relevant
confounders are captured by the variables used in the propensity score model.




March 18, 2025                                  Homework 3                    Andrew Girgis & Matthew Lee
1.4   Question 4                    ECON 673 High Dimensional Data                                         13


1.4     Question 4
Estimate the effect of a high school degree on wages using the scores calculated in the previous part in three
different ways. Interpret your findings and criticize the model with regard to your DAG from part 2 — how
confident do you feel in inferring a causal effect of high school degree status?

1.4.1   Method 1: Linear Regression adjustment

adjusted <- lm(lwage ~ exper + kids + high_school + propensity_scores, data = mroz)
coeftest(adjusted)

##
## t test of coefficients:
##
##                      Estimate Std. Error t value Pr(>|t|)
## (Intercept)       -188.764676 494.141118 -0.3820    0.7026
## exper               -0.030106   0.112512 -0.2676    0.7892
## kids                 0.588823   1.609343 0.3659     0.7146
## high_school          0.367721   0.091860 4.0031 7.384e-05 ***
## propensity_scores 227.421592 592.973197 0.3835      0.7015
## ---
## Signif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
coeftest(adjusted)["high_school",]

##     Estimate   Std. Error      t value     Pr(>|t|)
## 3.677212e-01 9.185988e-02 4.003066e+00 7.383513e-05

1.4.2   Method 2: Inverse probability weighting

y <- mroz$lwage
tr <- mroz$high_school
HT <- mean(y * tr / mroz$propensity_scores) -
mean(y * (1 - tr) / (1 - mroz$propensity_scores))
HT_se <- sqrt((var(y * tr / mroz$propensity_scores) +
var(y * (1 - tr) / (1 - mroz$propensity_scores))) /
nrow(mroz))
cat("Est.:", HT, " Std. err.:", HT_se, " t stat.:",
HT / HT_se)

## Est.: 0.3764016      Std. err.: 0.1310216       t stat.: 2.87282

1.4.3   Method 3: Matching

Y <- mroz$lwage
Tr <- mroz$high_school
X <- mroz$propensity_scores

matched <- Match(Y = Y, Tr = Tr, X = X, M = 1)

summary(matched)

##
## Estimate...     0.45272
## AI SE......     0.11422


March 18, 2025                                  Homework 3                    Andrew Girgis & Matthew Lee
1.4   Question 4                     ECON 673 High Dimensional Data                                          14


## T-stat..... 3.9634
## p.val...... 7.3888e-05
##
## Original number of observations..............              428
## Original number of treated obs...............              356
## Matched number of observations...............              356
## Matched number of observations (unweighted).               534
ATT_estimate <- matched$est
ATT_se <- matched$se.standard
cat("Matching Est.:", ATT_estimate, " Std. err.:", ATT_se, " t stat.:", ATT_estimate / ATT_se)

## Matching Est.: 0.4527162         Std. err.: 0.04794692        t stat.: 9.442029

1.4.4   Interpretation
We estimated the effect of high school graduation on log wages using linear regression adjustment, inverse
probability weighting (IPW), and propensity score matching. Across all methods, high school completion was
associated with a significant increase in wages, ranging from ~37% to ~45% higher log wages for graduates.
The matching method, which estimates the effect among treated individuals, yielded the highest estimate
(0.4527162), suggesting substantial wage benefits for high school graduates compared to similar non-graduates.
IPW and regression adjustment produced consistent, though slightly lower estimates (0.3764016).
While the consistency across methods increases confidence in the result, our ability to claim a causal effect
depends heavily on the assumption of no unmeasured confounding. Based on our DAG from Part 2, high
school affects wages directly and indirectly via experience, with number of children affecting both experience
and hours worked, which then influence wages.
The model assumes no unmeasured confounding of the relationship between high school and wages, which
may be unrealistic. Factors like parental education, ability, or socioeconomic status likely influence both high
school completion and wages but are not included in the DAG.
This missing information could bias our estimates and violate conditional ignorability, which the propensity
score methods rely on.
Therefore, while the DAG helps identify key pathways and adjust for observed factors, the absence of
important confounders limits confidence in making strong causal claims. We would describe our confidence in
the positive direction of the effect as strong, with uncertainty in the magnitude due to potential omitted
variable bias.




March 18, 2025                                   Homework 3                    Andrew Girgis & Matthew Lee
1.5   Question 5                    ECON 673 High Dimensional Data                                        15


1.5    Question 5
Consider the larger population of women who may or may not have entered the workforce and draw a DAG
for the entire population, with high school degree as your treatment and wages as the outcome variable. Do
you identify any challenges to estimation from looking at this larger DAG?
wage_dag <- dagify(lwage ~ high_school + exper,
                   exper ~ high_school,
                   exper ~ kids,
                   lwage ~ exper,
                   inlf ~ lwage,
                   inlf ~ high_school,
                   inlf ~ exper,
                   inlf ~ kids,
                   labels = c(
                     "lwage" = "Log Wage",
                     "high_school" = "High School",
                     "exper" = "Experience",
                     "kids" = "# of Children",
                     "hours" = "Hours Worked",
                     "inlf" = "Employed"
                     ),
                   outcome = "lwage")

ggdag(wage_dag,
      text = FALSE,
      use_labels = "label",
      node_size = 0,
      label_col = "blue") +
  theme_dag()

                                                                                 # of Children




                                               Employed




                                                                       Experience


           Log Wage

                                                       High School

We believe that if a women has a large number of children she’s less likely to be employed, as she would save
more money doing childcare and her childcare obligations would be higher.
We believe that employed women to have a wage, and obvious that an unemployed women would have a


March 18, 2025                                  Homework 3                   Andrew Girgis & Matthew Lee
1.5   Question 5                    ECON 673 High Dimensional Data                                      16


wage of zero.
We believe that having a high school degree would make a women more likely to be employed as she would
qualify for more jobs, and furthermore those jobs typically have a higher hourly wage, incentivizing her to
work.
We believe that women with experience are more likely to be qualified for higher paying jobs, and women who
have previous worked, are probably more likely to be working now, as they have a proven history of working.
With this larger DAG we do not see an issue with estimating our model due to any cycles or really terrible
unobservable effects. Our biggest concern would be how adding a bunch of wages with a value of zero have
on our conditional log mean. Any relationship between employment and finishing high school could dominate
the wage effect, which might not be the answer to the question we are trying to answer




March 18, 2025                                 Homework 3                   Andrew Girgis & Matthew Lee
