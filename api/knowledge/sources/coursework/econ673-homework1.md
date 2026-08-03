# ECON673_Homework1

_Source: projects/ECON673_Homework1.pdf_

               ECON 673 High Dimensional Data - Homework 1

                                      Andrew Girgis & Matthew Lee

                                                   2025-01-27


Contents
   0.1   Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    2
   0.2   Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   2
         0.2.1 Load Libraries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       2
         0.2.2 Load and Explore Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .          3

1 Questions                                                                                                          4
  1.1 Question 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       4
      1.1.1 Data Exploration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .           4
      1.1.2 Data Preprocessing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .           8
      1.1.3 Model Fitting . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .          9
      1.1.4 Model Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .          10
      1.1.5 Discussion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        10
  1.2 Question 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      12
  1.3 Question 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      14
  1.4 Question 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      15
      1.4.1 Part 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        15
      1.4.2 Part 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        16
      1.4.3 Part 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        19
  1.5 Question 5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      20

2 Appendix                                                                                                  21
  2.1 Table: Standard vs Train Model Statistics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
  2.2 Table: Large Model Statistics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22


Contents




                                                          1
0.1   Objective                      ECON 673 High Dimensional Data                                         2


0.1     Objective
This analysis aims to investigate key factors influencing bike rental counts in Washington, D.C., using the
Capital Bikeshare dataset. The analysis will involve fitting a series of linear regression models to the data
and evaluating the performance of these models in terms of in-sample and out-of-sample mean squared error
(M SE) and R-squared (R2 ) values. The analysis will also involve testing hypotheses about the relationship
between bike rental counts and various predictors, including days of the week, weather conditions, and
interactions between years and months. The results of the analysis will provide insights into the factors that
drive bike rental counts and help identify the most important predictors of bike rental demand.
Another aim of this project is to compare the performance of models with smaller amount of predictors
compared to models with a larger amount of predictors. This will help us understand the trade-off between
model complexity and predictive performance and determine whether simpler models can provide comparable
predictive accuracy to more complex models. The result of this analysis will help us determine the optimal
model for predicting bike rental counts and provide insights into the factors that have the most significant
impact on bike rental demand.

0.2     Data
The data provided is 17379 observations of hourly counts from 2011 to 2012 for bike rentals from the Capital
Bikeshare system in Washington DC1.
The data file hour.csv contains:
  • instant: identifier
  • dteday: date
  • season:
       – 1: spring,
       – 2: summer,
       – 3: fall,
       – 4: winter
  • yr: year (0:2011, 1:2012)
  • mnth: month (1 to 12)
  • hr: hour (0 to 23)
  • holiday: whether day is holiday or not
  • weekday: day of the week, counting from 0:sunday
  • workingday : if day is neither weekend nor holiday is 1, otherwise 0
  • weathersit:
       – 1. Clear, Few clouds, Partly cloudy
       – 2. Mist + Cloudy, Mist + Broken clouds, Mist + Few clouds, Mist
       – 3. Light snow, Light rain + Thunderstorm + Scattered clouds, Light rain + Scattered clouds
       – 4. Heavy rain + Ice pellets + Thunderstorm + Mist, Snow + Fog
  • temp : Normalized temperature in Celsius. The values are divided by 41 (max)
  • atemp : Normalized feeling temperature in Celsius. The values are divided by 50 (max)
  • hum : Normalized humidity. The values are divided by 100 (max)
  • windspeed : Normalized wind speed. The values are divided by 67 (max)
  • casual : count of casual users
  • registered : count of registered users
  • cnt: total count of rental bikes (casual or registered)
We will consider cnt as the response of interest.

0.2.1   Load Libraries

library(readr)
library(dplyr)



January 29, 2025                                Homework 1                    Andrew Girgis & Matthew Lee
0.2   Data                      ECON 673 High Dimensional Data                             3



library(tidyverse)
library(ggplot2)
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
library(stargazer)


0.2.2   Load and Explore Data

# Set the working directory
setwd("~/Downloads/UW_courses/ECON 673 (High Dimensional Data)/Homework 1")

# Load the data
hour <- read_csv("../data/hour.csv")

# Check the structure of the data
str(hour)

# Check the first few rows of the data
head(hour)




January 29, 2025                         Homework 1              Andrew Girgis & Matthew Lee
                                   ECON 673 High Dimensional Data                                      4


1         Questions
1.1        Question 1
Regress counts on indicators for days of the week, any other daily controls you think are important, and
a set of reasonable weather controls. Briefly explain why it would be reasonable to include the variables
that you do. What are the standard and adjusted in-sample M SE and R2 for this estimate? Calculate
them directly from the residuals and show how to match them with what summaries your software gives you
automatically.

1.1.1       Data Exploration

# Plot the distribution of weekday by count
hour %>%
  ggplot(aes(x = weekday, y = cnt)) +
  geom_bar(stat = "identity", fill = "skyblue") +
  labs(title = "Bike Rental Counts by Day of the Week",
       x = "Day of the Week",
       y = "Count") +
  theme_minimal()

                 Bike Rental Counts by Day of the Week
         5e+05




         4e+05




         3e+05


 Count
         2e+05




         1e+05




         0e+00

                       0                    2                        4                       6
                                                 Day of the Week
                                Bike Rental Counts by Day of the Week

# Plot the distribution of month by count
hour %>%
  ggplot(aes(x = mnth, y = cnt)) +
  geom_bar(stat = "identity", fill = "skyblue") +


January 29, 2025                                Homework 1                Andrew Girgis & Matthew Lee
1.1      Question 1                 ECON 673 High Dimensional Data                              5



   labs(title = "Monthly Bike Rental Counts",
        x = "Month",
        y = "Count") +
   theme_minimal()

                  Monthly Bike Rental Counts



         3e+05




         2e+05

 Count



         1e+05




         0e+00

                 0.0          2.5           5.0             7.5          10.0            12.5
                                                    Month
                                      Monthly Bike Rental Counts


# PLot the distribution of hour by count
hour %>%
  ggplot(aes(x = hr, y = cnt)) +
  geom_bar(stat = "identity", fill = "skyblue") +
  labs(title = "Hourly Bike Rental Counts",
       x = "Hour",
       y = "Count") +
  theme_minimal()




January 29, 2025                             Homework 1              Andrew Girgis & Matthew Lee
1.1      Question 1                  ECON 673 High Dimensional Data                                6


                 Hourly Bike Rental Counts


         3e+05




         2e+05


 Count



         1e+05




         0e+00

                      0          5                 10               15             20
                                                        Hour
                                        Hourly Bike Rental Counts


# Plot a bar graph average temperature by month
hour %>%
  group_by(mnth) %>%
  summarise(temp = mean(temp) * 41) %>%
  ggplot(aes(x = mnth, y = temp)) +
  geom_bar(stat = "identity", fill = "skyblue") +
  labs(title = "Average Temperature by Month",
       x = "Month",
       y = "Temperature (Celsius) ") +
  theme_minimal()




January 29, 2025                              Homework 1                 Andrew Girgis & Matthew Lee
1.1                      Question 1               ECON 673 High Dimensional Data                                7


                               Average Temperature by Month

                         30




 Temperature (Celsius)
                         20




                         10




                         0

                              0.0         2.5           5.0                7.5           10.0            12.5
                                                                  Month
                                                 Temperature Distribution by month


# Create a visualization of temp to count
hour %>%
  ggplot(aes(x = temp, y = cnt)) +
  geom_point() +
  labs(title = "Temperature vs. Bike Rental Counts",
       x = "Temperature (Celsius)",
       y = "Count") +
  theme_minimal()




January 29, 2025                                              Homework 1             Andrew Girgis & Matthew Lee
1.1      Question 1                 ECON 673 High Dimensional Data                                 8


                Temperature vs. Bike Rental Counts
         1000




         750




 Count
         500




         250




           0

                0.00             0.25                0.50               0.75                1.00
                                            Temperature (Celsius)
                                   Temperature vs. Bike Rental Counts


1.1.2       Data Preprocessing

# Create a new data frame with the variables of interest
hour1 <- hour %>%
    select(yr, weekday, holiday, hr, weathersit, temp, hum, windspeed,
        cnt) %>%
    mutate(hr = ifelse(hr %in% c(7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20), 1, 0), weekday = as.factor(weekday))

# Check the structure of the new data frame
str(hour1)

## tibble [17,379 x 9] (S3: tbl_df/tbl/data.frame)
## $ yr         : num [1:17379] 0 0 0 0 0 0 0 0 0 0 ...
## $ weekday    : Factor w/ 7 levels "0","1","2","3",..: 7 7 7 7 7 7 7 7 7 7 ...
## $ holiday    : num [1:17379] 0 0 0 0 0 0 0 0 0 0 ...
## $ hr         : num [1:17379] 0 0 0 0 0 0 0 1 1 1 ...
## $ weathersit: num [1:17379] 1 1 1 1 1 2 1 1 1 1 ...
## $ temp       : num [1:17379] 0.24 0.22 0.22 0.24 0.24 0.24 0.22 0.2 0.24 0.32 ...
## $ hum        : num [1:17379] 0.81 0.8 0.8 0.75 0.75 0.75 0.8 0.86 0.75 0.76 ...
## $ windspeed : num [1:17379] 0 0 0 0 0 0.0896 0 0 0 0 ...
## $ cnt        : num [1:17379] 16 40 32 13 1 1 2 3 8 14 ...
# Check the first few rows of the new data frame
head(hour1[1:8])


January 29, 2025                              Homework 1                Andrew Girgis & Matthew Lee
1.1   Question 1                 ECON 673 High Dimensional Data                                9



          yr       weekday   holiday   hr    weathersit      temp    hum    windspeed

           0       6               0    0                1    0.24   0.81        0

           0       6               0    0                1    0.22   0.8         0

           0       6               0    0                1    0.22   0.8         0

           0       6               0    0                1    0.24   0.75        0

           0       6               0    0                1    0.24   0.75        0

           0       6               0    0                2    0.24   0.75        0.0896


                                               cnt

                                                16

                                                40

                                                32

                                                13

                                                 1

                                                 1


1.1.3   Model Fitting

# Fit the model
model1 <- lm(cnt ~ yr + weekday + holiday + hr + weathersit +
    temp + hum + windspeed, data = hour1)

# Check the summary of the model
summary(model1)

##
## Call:
## lm(formula = cnt ~ yr + weekday + holiday + hr + weathersit +
##     temp + hum + windspeed, data = hour1)
##
## Residuals:
##     Min      1Q Median       3Q     Max
## -347.33 -87.31 -14.81     65.02 603.33
##
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)
## (Intercept) -25.287       5.808 -4.354 1.35e-05 ***
## yr            84.261      1.910 44.112 < 2e-16 ***
## weekday1      10.162      3.651   2.783 0.005391 **
## weekday2      11.138      3.564   3.125 0.001779 **
## weekday3      12.267      3.556   3.449 0.000563 ***
## weekday4      13.411      3.557   3.770 0.000164 ***


January 29, 2025                            Homework 1               Andrew Girgis & Matthew Lee
1.1   Question 1                        ECON 673 High Dimensional Data                                               10


## weekday5      16.663      3.550   4.694 2.70e-06 ***
## weekday6      15.619      3.537   4.416 1.01e-05 ***
## holiday      -29.070      5.929 -4.903 9.53e-07 ***
## hr           192.485      2.115 90.995 < 2e-16 ***
## weathersit   -23.854      1.695 -14.069 < 2e-16 ***
## temp         279.014      5.047 55.284 < 2e-16 ***
## hum          -78.014      6.123 -12.740 < 2e-16 ***
## windspeed    -35.347      8.277 -4.271 1.96e-05 ***
## ---
## Signif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
##
## Residual standard error: 125.2 on 17365 degrees of freedom
## Multiple R-squared: 0.5242, Adjusted R-squared: 0.5239
## F-statistic: 1472 on 13 and 17365 DF, p-value: < 2.2e-16

1.1.4   Model Evaluation

# Calculate the in-sample MSE
mse1 <- mean(model1$residualsˆ2)

# Pull the in-sample R2 from the model
r2_1 <- summary(model1)$r.squared

# Calculate the adjusted in-sample MSE
adj_mse1 <- mse1 * (nrow(hour1) - 1)/(nrow(hour1) - length(model1$coefficients))

# Calculate the adjusted in-sample R2
adj_r2_1 <- 1 - adj_mse1/var(hour1$cnt)


1.1.5   Discussion
The linear model we are using is:


cnt = β0 + β1 · yr + β2 · holiday + β3 · hr + β4 · weekday + β5 · weathersit + β6 · temp + β7 · hum + β8 · windspeed + ϵ

Note that the coefficients for the dummy variables for the days of the week are not shown in the equation
above but are included in the model.
The model includes the following variables and their coefficients:
   • yr: This variable is included to capture the effect of the year on bike rental counts. It is difficult
     to predict the direction of the effect of the year on bike rental counts without further information.
     However, it is possible that bike rental counts may increase over time due to factors such as population
     growth, increased awareness of bike-sharing programs, or changes in weather patterns. We do see with
     the model that the coefficient for year is positive indicating that bike rental counts increased from 2011
     to 2012.
   • weekday: Mutated to be a factor variable. This variable is included to capture the effect of the day
     of the week on bike rental counts. It is expected that bike rental counts may be higher on certain days
     of the week compared to others. After analysis, we notice that the coefficient for Friday and Saturday
     are the highest compared to other days of the week. This indicates that bike rental counts are higher
     on Fridays and Saturdays compared to other days of the week. See Figure 1 for the distribution of bike
     rental counts by day of the week.



January 29, 2025                                     Homework 1                      Andrew Girgis & Matthew Lee
1.1   Question 1                    ECON 673 High Dimensional Data                                         11


  • holiday: This variable is included to capture the effect of holidays on bike rental counts. It is expected
    that bike rental counts may be higher on holidays compared to non-holidays. After analysis the
    coefficient for holiday is negative indicating that bike rental counts are lower on holidays compared
    to non-holidays. This is likely to be due to the fact that people may be less likely to use bikes for
    commuting or leisure activities on holidays.
  • hr: Mutated to be equal to 0 if its before 7am or after 8pm and 1 any other hour. This variable is
    included to capture the effect of the hour of the day on bike rental counts. It is expected that bike
    rental counts may be higher during the hours between compared to colder months. The coefficient for
    hour is positive indicating that bike rental counts are higher during the hours between 7am and 8pm
    compared to other hours. See Figure 3 for the distribution of bike rental counts by hour.
  • weathersit: This variable is included to capture the effect of weather conditions on bike rental counts.
    It is expected that bike rental counts may be lower on days with poor weather conditions and since the
    poor conditions are represented with larger numbers we expect a negative correlation. After analysis,
    the coefficient for weathersit is negative indicating that bike rental counts are lower on days with poor
    weather conditions. This is likely due to the fact that people are less likely to use bikes for commuting
    or leisure activities when the weather is poor.
  • temp: This variable is included to capture the effect of temperature on bike rental counts. It is
    expected that bike rental counts may be higher on days with higher temperatures. After analysis,
    the coefficient for temp is positive indicating that bike rental counts are higher on days with higher
    temperatures. This is likely due to the fact that people are more likely to use bikes for commuting
    or leisure activities when the weather is warm. See Figure 5 for the relationship between temperature
    and bike rental counts.
  • hum: This variable is included to capture the effect of humidity on bike rental counts. It is expected
    that bike rental counts may be lower on days with higher humidity. After analysis, the coefficient for
    hum is negative indicating that bike rental counts are lower on days with higher humidity. This is
    likely due to the fact that people are less likely to use bikes for commuting or leisure activities when
    the weather is too humid.
  • windspeed: This variable is included to capture the effect of wind speed on bike rental counts. I’m
    unsure of the effect of wind speed on bike rental counts, my guess would be that on days with high
    wind speeds bike rental counts would be lower. After analysis, the coefficient for windspeed is negative
    indicating that bike rental counts are lower on days with higher wind speeds. This is likely due to the
    fact that people are less likely to use bikes for commuting or leisure activities when the weather is too
    windy.
      The standard and adjusted in-sample MSE and R2 for this estimate are as follows:
        – Standard in-sample M SE: 1.5652597 × 104
        – Standard in-sample R2 : 0.5242309
        – Adjusted in-sample M SE: 1.5664315 × 104
        – Adjusted in-sample R2 : 0.5239021
      The standard in-sample M SE and R2 values are calculated directly from the residuals of the model
      (see code chunk above for the calculation used) and match the summaries provided by the software.
      (See Table~1 for the summary statistics of the model). The equations used to calculate the M SE and
      R2 values are as follows:

                                                         n
                                                      1X
                                             M SE =         (yi − ŷi )2                                  (1)
                                                      n i=1

                                                           M SE
                                                R2 = 1 −                                                  (2)
                                                           V ar(y)

January 29, 2025                                Homework 1                   Andrew Girgis & Matthew Lee
1.2   Question 2                     ECON 673 High Dimensional Data                                         12



                                                            M SE × (n − 1)
                                        Adjusted M SE =                                                    (3)
                                                               (n − p)

                                                            Adjusted M SE
                                        Adjusted R2 = 1 −                                                  (4)
                                                               V ar(y)

      where yi is the observed value, ŷi is the predicted value, n is the number of observations, and V ar(y)
      is the variance of the observed values and p is the number of predictors in the model.

      1.2    Question 2
      It looks like Friday and Saturday are popular days to ride a bike. Test this hypothesis by building a
      confidence interval for the ratio of (average of [Friday/Saturday riders - Sunday riders]) to (average of
      [M/Tu/W/Th riders - Sunday riders]), controlling for the other variables in the specification. Discuss
      how you computed your interval.
      set.seed(42)

      B <- 1000

      # Create dataset to bootstrap and test hypothesis with
      # weekday as factor
      hour2 <- hour %>%
          select(weekday, yr, holiday, hr, weathersit, temp, hum, windspeed,
              cnt) %>%
          mutate(hr = ifelse(hr %in% c(7, 8, 9, 10, 11, 12, 13, 14,
              15, 16, 17, 18, 19, 20), 1, 0)) %>%
          mutate(weekday = as.factor(weekday))

      xbar_sim <- double(B)

      for (i in 1:B) {
          # Bootstrap sample: Resample rows (instead of just
          # shuffling weekdays)
          boot_sample <- hour2 %>%
              sample_n(nrow(hour2), replace = TRUE)

            model2 <- lm(cnt ~ weekday + yr + holiday + hr + weathersit +
                temp + hum + windspeed, data = boot_sample)

            # Extract coefficients for days
            frisat_coefs <- model2$coefficients[6:7]
            montuth_coefs <- model2$coefficients[2:5]

            xbar_sim[i] <- (sum(frisat_coefs)/2)/(sum(montuth_coefs)/4)
      }

      # Use Quantile to compute the confidence interval
      ci_lower <- quantile(xbar_sim, 0.025)
      ci_upper <- quantile(xbar_sim, 0.975)

      print(ci_lower)
      print(ci_upper)



January 29, 2025                                 Homework 1                   Andrew Girgis & Matthew Lee
1.2          Question 2                      ECON 673 High Dimensional Data                                         13



              # Calculate the average ratio
              avg_ratio <- mean(xbar_sim)

              # Create a visualization of the bootstrap distribution
              ggplot(data = data.frame(xbar_sim), aes(x = xbar_sim)) +
                geom_histogram(binwidth = 0.1, fill = "skyblue") +
                geom_vline(xintercept = ci_lower, color = "red") +
                geom_vline(xintercept = ci_upper, color = "red") +
                geom_vline(xintercept = avg_ratio, color = "blue") +
                labs(title = "Bootstrap Distribution of the Ratio",
                     x = "Ratio",
                     y = "Frequency") +
                theme_minimal()

                   Bootstrap Distribution of the Ratio



             150




 Frequency
             100




             50




               0

                                 1.0                        1.5                        2.0                        2.5
                                                                  Ratio
                      Bootstrap Distribution of the Ratio of Friday/Saturday to M/Tu/W/Th Riders


              The 95% confidence interval for the ratio of the average of [Friday/Saturday riders - Sunday riders]
              to the average of [M/Tu/W/Th riders - Sunday riders] is [1.0017906 , 1.9747016]. The average ratio
              is 1.4099728. See Figure 6 for the bootstrap distribution of the ratio. The confidence interval was
              computed using a bootstrap method with 1000 iterations. The ratio was calculated by taking the
              sum of the coefficients for Friday and Saturday and dividing by 2, then dividing the sum of the
              coefficients for Monday, Tuesday, Wednesday, and Thursday and dividing by 4, see Equation (5). This
              ratio was then calculated for each bootstrap sample, and the 95% confidence interval was computed
              using the quantile function, see code above. The reason we used the bootstrap method is that it is
              a non-parametric method that does not rely on assumptions about the distribution of the data. The
              confidence interval provides a range of plausible values for the ratio of interest, and the average ratio


January 29, 2025                                         Homework 1                   Andrew Girgis & Matthew Lee
1.3   Question 3                   ECON 673 High Dimensional Data                                      14


      gives the point estimate of the ratio. Note that the Sunday β coefficient was not included in the
      calculation of the ratio as it is the reference category for the weekday variable.
                                                         Pn
                                                             βF ri+Sat
                                                     (     i=1
                                                                       )
                                              X̄ =        Pn 2                                         (5)
                                                               βdays
                                                         ( i=14      )

      1.3   Question 3
      Now regress counts on your basic model, interacted with years and months. Compare the standard
      and adjusted values of the MSE and R2 of this estimate with the previous one. How much do the new
      regressors improve the fit of the model? Is this model preferable to the previous one? Do we need to
      worry about the size of the parameter vector here?
      hour3 <- hour %>%
          select(mnth, yr, weekday, holiday, hr, weathersit, temp,
              hum, windspeed, cnt) %>%
          mutate(mnth = ifelse(mnth %in% c(3, 4, 5, 6, 7, 8, 9, 10),
              1, 0), hr = ifelse(hr %in% 7:20, 1, 0), weekday = as.factor(weekday)) %>%
          mutate(yr_holiday = yr * holiday, yr_hr = yr * hr, yr_weathersit = yr *
              weathersit, yr_temp = yr * temp, yr_hum = yr * hum, yr_windspeed = yr *
              windspeed) %>%
          mutate(mnth_yr = mnth * yr, mnth_holiday = mnth * holiday,
              mnth_hr = mnth * hr, mnth_weathersit = mnth * weathersit,
              mnth_temp = mnth * temp, mnth_hum = mnth * hum, mnth_windspeed = mnth *
                  windspeed)


      # Fit the model
      model3 <- lm(cnt ~ yr + holiday + hr + weekday + weathersit +
          temp + hum + windspeed + yr_holiday + yr_hr + yr_weathersit +
          yr_temp + yr_hum + yr_windspeed + mnth_holiday + mnth_hr +
          mnth_weathersit + mnth_temp + mnth_hum + mnth_windspeed,
          data = hour3)

      # Check the summary of the model
      summary(model3)

      # Calculate the in-sample MSE
      mse3 <- mean(model3$residualsˆ2)

      # Pull the in-sample R2 from the model
      r2_3 <- summary(model3)$r.squared

      # Calculate the adjusted in-sample MSE
      adj_mse3 <- mse3 * (nrow(hour3) - 1)/(nrow(hour3) - length(model3$coefficients))

      # Calculate the adjusted in-sample R2
      adj_r2_3 <- 1 - adj_mse3/var(hour3$cnt)

      The standard and adjusted in-sample M SE and R2 for this estimate are as follows:
        – Standard in-sample M SE: 1.4306915 × 104
        – Standard in-sample R2 : 0.5651336



January 29, 2025                               Homework 1                  Andrew Girgis & Matthew Lee
1.4   Question 4                     ECON 673 High Dimensional Data                                          15


        – Adjusted in-sample M SE: 1.4327527 × 104
        – Adjusted in-sample R2 : 0.5645322
      See Table 2 for the summary statistics of the model. Our model from Question 1 has a higher M SE and
      lower R2 and Adjusted R2 . While we would expect that given that we added many more terms to our
      model we can see that the coefficients are significant, and our adjusted R2 is still very close to our R2.
      That is because our number of predictors is still very small compared to our number of observations.
      Here it would be appropriate to say that our Question 3 model is better than our Question 1 model,
      given the evidence of both improved MSE,R2 and Adjusted R2, while having many interactions terms
      that are highly significant.

      1.4     Question 4
      Now repeat the previous three steps, but with one important difference: use only the first 80% (i.e.,
      the first 585 days or so) of the sample to estimate your model. Then predict the ride counts for the
      remaining 20% of the sample. Calculate the out-of sample MSE, R2, adjusted MSE and adjusted R2
      of your predictions from each model. Which model performs better? Discuss.

      1.4.1   Part 1

      # find the index of the 80% of the data
      index <- floor(0.8 * nrow(hour1))

      # Split the data into training and testing sets with the
      # training set being the first 80% of the data
      hour4_train <- hour1 %>%
          slice(1:index)

      hour4_test <- hour1 %>%
          slice((index + 1):nrow(hour1))

      # Fit the model
      model4 <- lm(cnt ~ yr + holiday + hr + weekday + weathersit +
          temp + hum + windspeed, data = hour4_train)

      # Check the summary of the model
      summary(model4)

      # Calculate the in-sample MSE
      insample_mse4 <- mean(model4$residualsˆ2)

      # Pull the in-sample R2 from the model
      insample_r2_4 <- summary(model4)$r.squared

      # Calculate the adjusted in-sample MSE
      adj_insample_mse4 <- insample_mse4 * (nrow(hour4_train) - 1)/(nrow(hour4_train) -
          length(model4$coefficients))

      # Calculate the adjusted in-sample R2
      adj_insample_r2_4 <- 1 - adj_insample_mse4/var(hour4_train$cnt)

      # Predict the ride counts for the remaining 20% of the
      # sample
      pred4 <- predict(model4, newdata = hour4_test)



January 29, 2025                                 Homework 1                    Andrew Girgis & Matthew Lee
1.4   Question 4                    ECON 673 High Dimensional Data                                        16



      # Calculate the out-of-sample MSE
      mse4 <- mean((hour4_test$cnt - pred4)ˆ2)

      # Calculate the out-of-sample R2
      r2_4 <- 1 - mse4/var(hour4_test$cnt)

      # Calculate the adjusted out-of-sample MSE
      adj_mse4 <- mse4 * (nrow(hour4_test) - 1)/(nrow(hour4_test) -
          length(model4$coefficients))

      # Calculate the adjusted out-of-sample R2
      adj_r2_4 <- 1 - adj_mse4/var(hour4_test$cnt)

      The standard and adjusted in-sample and out-of-sample M SE and R2 for this model and from model
      1 are as follows:
        – Standard in-sample M SE: 1.3134429 × 104
        – Standard in-sample R2 : 0.5287608
        – Adjusted in-sample M SE: 1.3146723 × 104
        – Adjusted in-sample R2 : 0.5283536
        – Standard out-of-sample M SE: 2.6696511 × 104
        – Standard out-of-sample R2 : 0.4510002
        – Adjusted out-of-sample M SE: 2.6796757 × 104
        – Adjusted out-of-sample R2 : 0.4489387
      See Table 1 for the summary statistics of the model. The model from Question 1 outperforms the
      model on observable metrics. For Question 1 we have a lower M SE and higher R2 and Adjusted R2
      compared to the model from Question 4. The difference between the models is very small meaning
      that the model from Question 4 is still a good model. The size of the parameter vector is not a concern
      in this case as the number of predictors is small compared to the number of observations.

      1.4.2   Part 2

      set.seed(14)

      # Split the data into training and testing sets with the
      # training set being the first 80% of the data
      hour4b_train <- hour2 %>%
          slice(1:index)

      hour4b_test <- hour2 %>%
          slice((index + 1):nrow(hour2))

      xbar_sim_4 <- double(B)

      for (i in 1:B) {
          # Bootstrap sample: Resample rows (instead of just
          # shuffling weekdays)
          boot_sample <- hour4b_train %>%
              sample_n(nrow(hour4b_train), replace = TRUE)



January 29, 2025                                Homework 1                   Andrew Girgis & Matthew Lee
1.4   Question 4                 ECON 673 High Dimensional Data                            17



            model4b <- lm(cnt ~ weekday + holiday + hr + weathersit +
                temp + hum + windspeed, data = boot_sample)

            # Extract coefficients for days
            frisat_coefs4b <- model4b$coefficients[6:7]
            montuth_coefs4b <- model4b$coefficients[2:5]

            xbar_sim_4[i] <- (sum(frisat_coefs4b)/2)/(sum(montuth_coefs4b)/4)
      }

      # Use Quantile to compute the confidence interval
      ci_lower4b <- quantile(xbar_sim_4, 0.025)
      ci_upper4b <- quantile(xbar_sim_4, 0.975)

      # Calculate the average ratio
      avg_ratio4b <- mean(xbar_sim_4)

      # Create a visualization of the bootstrap distribution vs the previous model
      # Ensure variables are numeric
      xbar_sim_4 <- as.numeric(xbar_sim_4)
      xbar_sim <- as.numeric(xbar_sim)
      ci_lower4b <- as.numeric(ci_lower4b)
      ci_upper4b <- as.numeric(ci_upper4b)
      avg_ratio4b <- as.numeric(avg_ratio4b)
      ci_lower <- as.numeric(ci_lower)
      ci_upper <- as.numeric(ci_upper)
      avg_ratio <- as.numeric(avg_ratio)

      # Create a combined dataset for histograms with labels
      hist_data <- rbind(
        data.frame(value = xbar_sim_4, group = "Sample Q4"),
        data.frame(value = xbar_sim, group = "Original Sample")
      )

      # Create a dataset for vertical lines with labels
      vline_data <- data.frame(
        xintercept = c(ci_lower4b, ci_upper4b, avg_ratio4b,
                       ci_lower, ci_upper, avg_ratio),
      label = c("CI Lower Q4", "CI Upper Q4", "Mean Q4",
                  "CI Lower OG", "CI Upper OG", "Mean Original OG"),
        color = c("red", "red", "blue", "green", "green", "purple")
      )

      # Plot
      ggplot(hist_data, aes(x = value, fill = group)) +
        geom_histogram(binwidth = 0.1, alpha = 0.5, color = "black", position = "identity") +

          # Add vertical lines with mapped colors
          geom_vline(data = vline_data, aes(xintercept = xintercept, color = label), linetype = "dashed", s

          # Define colors and fills for legend
          scale_fill_manual(values = c("skyblue", "red"), name = "Histogram") +
          scale_color_manual(values = setNames(vline_data$color, vline_data$label), name = "Vertical Lines"



January 29, 2025                          Homework 1              Andrew Girgis & Matthew Lee
1.4          Question 4                   ECON 673 High Dimensional Data                                        18



               # Set x-axis limits
               scale_x_continuous(limits = c(-1, 6), breaks = seq(0, 3, by = 0.5)) +

               # Labels
               labs(title = "Bootstrap Distribution of the Ratio",
                    x = "Ratio",
                    y = "Frequency") +

               # Theme and legend positioning
               theme_minimal() +
               theme(legend.position = "right")

             ## Warning: Using `size` aesthetic for lines was deprecated in ggplot2 3.4.0.
             ## i Please use `linewidth` instead.
             ## This warning is displayed once every 8 hours.
             ## Call `lifecycle::last_lifecycle_warnings()` to see where this warning was
             ## generated.
             ## Warning: Removed 37 rows containing non-finite values (`stat_bin()`).
             ## Warning: Removed 4 rows containing missing values (`geom_bar()`).

                   Bootstrap Distribution of the Ratio



                                                                                         Vertical Lines
             150
                                                                                              CI Lower OG
                                                                                              CI Lower Q4
                                                                                              CI Upper OG




 Frequency
             100                                                                              CI Upper Q4
                                                                                              Mean Original OG
                                                                                              Mean Q4



             50                                                                          Histogram
                                                                                              Original Sample
                                                                                              Sample Q4


               0

                            0.0 0.5 1.0 1.5 2.0 2.5 3.0
                                                Ratio
                      Bootstrap Distribution of the Ratio of Friday/Saturday to M/Tu/W/Th Riders


             The 95% confidence interval for the ratio of the average of [Friday/Saturday riders - Sunday riders]
             to the average of [M/Tu/W/Th riders - Sunday riders] is [0.8976775 , 5.4815037]. The average ratio
             is 0.902517. See Figure~7 for the bootstrap distribution of the ratio. The confidence interval was


January 29, 2025                                      Homework 1                  Andrew Girgis & Matthew Lee
1.4   Question 4                   ECON 673 High Dimensional Data                                     19


      computed using a bootstrap method with 1000 iterations. The ratio was calculated for each bootstrap
      sample, and the 95% confidence interval was computed using the quantile function, see code above.
      The reason we used the bootstrap method is that it is a non-parametric method that does not rely on
      assumptions about the distribution of the data. Note that the Sunday β coefficient was not included
      in the calculation of the ratio as it is the reference category for the weekday variable.

      1.4.3   Part 3

      # Split the data into training and testing sets with the
      # training set being the first 80% of the data
      hour4c_train <- hour3 %>%
          slice(1:index)

      hour4c_test <- hour3 %>%
          slice((index + 1):nrow(hour3))

      # Fit the model
      model4c <- lm(cnt ~ mnth + yr + weekday + holiday + hr + weathersit +
          temp + hum + windspeed + yr_holiday + yr_hr + yr_weathersit +
          yr_temp + yr_hum + yr_windspeed + mnth_holiday + mnth_hr +
          mnth_weathersit + mnth_temp + mnth_hum + mnth_windspeed,
          data = hour4c_train)

      # Check the summary of the model
      summary(model4c)

      # Calculate the in-sample MSE
      insample_mse4c <- mean(model4c$residualsˆ2)

      # Pull the in-sample R2 from the model
      insample_r2_4c <- summary(model4c)$r.squared

      # Calculate the adjusted in-sample MSE
      adj_insample_mse4c <- insample_mse4c * (nrow(hour4_train) - 1)/(nrow(hour4_train) -
          length(model4c$coefficients))

      # Calculate the adjusted in-sample R2
      adj_insample_r2_4c <- 1 - adj_insample_mse4c/var(hour4_train$cnt)

      # Predict the ride counts for the remaining 20% of the
      # sample
      pred4c <- predict(model4c, newdata = hour4c_test)

      # Calculate the out-of-sample MSE
      mse4c <- mean((hour4_test$cnt - pred4c)ˆ2)

      # Calculate the out-of-sample R2
      r2_4c <- 1 - mse4c/var(hour4_test$cnt)

      # Calculate the adjusted out-of-sample MSE
      adj_mse4c <- mse4c * (nrow(hour4_test) - 1)/(nrow(hour4_test) -
          length(model4c$coefficients))

      # Calculate the adjusted out-of-sample R2



January 29, 2025                              Homework 1                  Andrew Girgis & Matthew Lee
1.5   Question 5                     ECON 673 High Dimensional Data                                          20



      adj_r2_4c <- 1 - adj_mse4c/var(hour4_test$cnt)

      The standard and adjusted in-sample and out-of-sample M SE and R2 for this model and from model
      3 are as follows:
        – Standard in-sample M SE: 1.2050327 × 104
        – Standard in-sample R2 : 0.5676564
        – Adjusted in-sample M SE: 1.2072906 × 104
        – Adjusted in-sample R2 : 0.5668774
        – Standard out-of-sample M SE: 2.4204386 × 104
        – Standard out-of-sample R2 : 0.5022495
        – Adjusted out-of-sample M SE: 2.4386849 × 104
        – Adjusted out-of-sample R2 : 0.4984972
      The model from Question 4 part 3 is worse than the model from Question 3. The model from Question
      3 has a lower M SE and higher R2 and Adjusted R2 compared to the model from Question 4 part 3.
      The difference between the models is quite large in this case meaning that the model from Question
      3 is a much better model. This could be due to many factors, such as poor sampling, overfitting, or
      multicollinearity. My main hypothesis is that since we only took from the first 80% of the data, we
      may have missed some important trends that are only present in the last 20% of the data, especially
      since we are dealing with time series data. The first 80% of the data may not be Representative of the
      last 20% of the data, as we see in the data that the index is based on the date. In another trial it may
      be beneficial to randomly sample the data instead of taking the first 80% of the data. The size of the
      parameter vector is not a concern in this case as the number of predictors is small compared to the
      number of observations.

      1.5    Question 5
      Do you find that “the weather” is associated with the ride count in a statistically significant way? In
      this case I mean just that the one may be significantly associated with the other, without thinking
      too much about the causal impact of weather on ride count. Discuss the potential of interpreting this
      association as a causal effect, and what challenges there might be to doing so.
      We find the weather correlated with ride count statistically significant. Both our weather variable
      and all of our variables related to “weather” such as temp, humidity, and windspeed were significantly
      correlated with ride count. We could consider interpreting these as casual, however we have several
      issues. In particular we have difficulty excluding explanations such as if severe weather causes busi-
      ness/schools to close, it could cause ride counts to also decrease. If this were the case and outside of
      this fact the weather doesn’t change how many people ride a bike, then it could lead to misguided
      policy. Something like free high quality jackets for cyclists would not actually lead to more ride counts.
      Another source of difficulty is that with our linear regression we may have trouble with potentially
      non-linear relationships between temperature and ride count. Subjective theory would suggest that
      both very cold and very hot temptatures encourage people to use modes of transportation with less
      exposure to the elements.




January 29, 2025                                 Homework 1                    Andrew Girgis & Matthew Lee
                                    ECON 673 High Dimensional Data                                              21


     2     Appendix
     2.1   Table: Standard vs Train Model Statistics
                                              Model Statistics

                                                          Dependent variable:
                                                                    cnt
                                                 (1)                                   (2)
              yr                             84.261∗∗∗                              70.478∗∗∗
                                              (1.910)                                (2.032)

              weekday1                       10.162∗∗∗                                5.107
                                              (3.651)                                (3.739)

              weekday2                       11.138∗∗∗                               7.522∗∗
                                              (3.564)                                (3.645)

              weekday3                       12.267∗∗∗                                5.232
                                              (3.556)                                (3.653)

              weekday4                       13.411∗∗∗                               8.260∗∗
                                              (3.557)                                (3.649)

              weekday5                       16.663∗∗∗                              11.809∗∗∗
                                              (3.550)                                (3.643)

              weekday6                       15.619∗∗∗                              11.087∗∗∗
                                              (3.537)                                (3.627)

              holiday                       −29.070∗∗∗                             −21.302∗∗∗
                                             (5.929)                                (6.238)

              hr                             192.485∗∗∗                            174.799∗∗∗
                                               (2.115)                               (2.159)

              weathersit                    −23.854∗∗∗                             −23.156∗∗∗
                                             (1.695)                                (1.729)

              temp                           279.014∗∗∗                            271.592∗∗∗
                                               (5.047)                               (5.040)

              hum                           −78.014∗∗∗                             −71.496∗∗∗
                                             (6.123)                                (6.125)

              windspeed                     −35.347∗∗∗                             −32.275∗∗∗
                                             (8.277)                                (8.420)

              Constant                      −25.287∗∗∗                             −12.921∗∗
                                             (5.808)                                (5.813)

              Observations                     17,379                                13,903
              R2                                0.524                                 0.529
              Adjusted R2                       0.524                                 0.528
              Residual Std. Error       125.161 (df = 17365)                  114.663 (df = 13889)
              F Statistic           1,471.831∗∗∗ (df = 13; 17365)         1,198.796∗∗∗ (df = 13; 13889)
              Note:                                                       ∗ p<0.1; ∗∗ p<0.05; ∗∗∗ p<0.01




January 29, 2025                                Homework 1                             Andrew Girgis & Matthew Lee
2.2   Table: Large Model Statistics ECON 673 High Dimensional Data                                       22


      2.2   Table: Large Model Statistics
                                          Large Model Statistics


                                                    Dependent variable:
                                                             cnt
                                                    (1)               (2)
                             mnth                                   20.487∗
                                                                    (11.256)

                             yr                  25.757∗∗           19.232∗
                                                 (10.095)           (10.568)

                             holiday         −25.247∗∗∗            −18.799∗∗
                                              (9.756)               (9.495)

                             hr                  87.227∗∗∗         91.543∗∗∗
                                                  (3.972)           (3.942)

                             weekday1             8.734∗∗            3.985
                                                  (3.497)           (3.591)

                             weekday2            10.545∗∗∗          6.195∗
                                                  (3.415)           (3.506)

                             weekday3            12.020∗∗∗           4.342
                                                  (3.411)           (3.515)

                             weekday4            12.890∗∗∗          6.807∗
                                                  (3.415)           (3.515)

                             weekday5            15.727∗∗∗         10.282∗∗∗
                                                  (3.400)           (3.499)

                             weekday6            15.265∗∗∗         10.584∗∗∗
                                                  (3.386)           (3.479)

                             weathersit      −21.790∗∗∗            −19.654∗∗∗
                                              (3.312)               (3.268)

                             temp             317.599∗∗∗           279.845∗∗∗
                                               (15.092)             (15.883)

                             hum             −39.399∗∗∗            −22.648∗
                                              (11.055)             (12.089)

                             windspeed       −115.394∗∗∗           −85.297∗∗∗
                                              (14.711)              (15.040)

                                             ∗
                             Note:               p<0.1; ∗∗ p<0.05; ∗∗∗ p<0.01




January 29, 2025                                 Homework 1                     Andrew Girgis & Matthew Lee
2.2   Table: Large Model Statistics ECON 673 High Dimensional Data                                       23


                                           Model Statistics


                                                         Dependent variable:
                                                                 cnt
                                             (1)                                   (2)
                                                   ∗∗∗
           yr_holiday                    −31.455                                −22.783∗
                                          (10.929)                              (11.877)

           yr_hr                         99.976∗∗∗                              82.020∗∗∗
                                          (4.048)                                (4.254)

           yr_weathersit                   −4.646                                −4.656
                                           (3.254)                               (3.479)

           yr_temp                       75.026∗∗∗                              74.704∗∗∗
                                          (9.733)                                (10.043)

           yr_hum                        −51.116∗∗∗                            −50.716∗∗∗
                                          (11.767)                              (12.231)

           yr_windspeed                    14.350                                 18.857
                                          (15.905)                               (16.839)

           mnth_holiday                  36.696∗∗∗                              24.670∗∗
                                          (10.957)                              (11.535)

           mnth_hr                       82.564∗∗∗                              76.955∗∗∗
                                          (4.168)                                (4.444)

           mnth_weathersit                 −2.031                                −4.484
                                           (3.492)                               (3.640)

           mnth_temp                    −123.295∗∗∗                            −86.239∗∗∗
                                         (15.126)                               (17.264)

           mnth_hum                       −18.564∗                             −41.245∗∗∗
                                           (9.890)                              (13.282)

           mnth_windspeed                113.563∗∗∗                             70.999∗∗∗
                                          (15.034)                               (17.263)

           Constant                       16.300∗∗                                9.136
                                           (7.528)                               (9.423)

           Observations                    17,379                                13,903
           R2                               0.565                                 0.568
           Adjusted R2                      0.565                                 0.567
           Residual Std. Error      119.701 (df = 17353)                  109.881 (df = 13876)
           F Statistic           902.049∗∗∗ (df = 25; 17353)           700.725∗∗∗ (df = 26; 13876)
                                                                   ∗
           Note:                                                       p<0.1; ∗∗ p<0.05; ∗∗∗ p<0.01



January 29, 2025                            Homework 1                          Andrew Girgis & Matthew Lee
