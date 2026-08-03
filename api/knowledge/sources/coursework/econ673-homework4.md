# ECON673_Homework4

_Source: projects/ECON673_Homework4.pdf_

             ECON 673 High Dimensional Data - Homework 4

                                     Andrew Girgis & Matthew Lee

                                                  2025-04-04


Contents
  Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     2
  Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    2
      Load Libraries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        2
      Starter code . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      3

Questions                                                                                                            4
  Question 1    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    4
  Question 2    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    5
  Question 3    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    7
  Question 4    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    9
  Question 5    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   11
  Question 6    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   13
  Question 7    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   15




                                                         1
Objective                           ECON 673 High Dimensional Data                                       2


Objective
we are going to ask whether being unemployed causes beer buyers to buy more or less beer than they would if
they were employed. Use volume or log volume (your choice) purchased as a response variable. Suppose that
we don’t want to make a strong assumption about how volume, unemployment and all the other observables
are related.

Data
The data provided is 73,115 observations of light beer purchases in the US.
The data file LightBeer.csv contains:
  • household: an identifier of the purchasing household
  • upc_description: details on the purchased item (e.g., a 6-pack)
  • quantity: the number of items purchased
  • beer_brand: Bud Light, Busch Light, Coors Light, Miller Lite, or Natural Light
  • beer_spend: total dollar value of purchase
  • beer_floz: total volume of beer, in fluid ounces
  • price_floz: price per fl.oz. (i.e., beer_spend/beer_floz)
  • container_descr: the type of container
  • promotion: Whether the item was promoted (coupon or otherwise)
  • market: Either a US city or state if a rural market
  • demographic data including buyer type (married couple, male, or female), income, occupation, education
    and age

Load Libraries

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
library(stargazer)
library(maps)
library(usmap)
library(stringr)
library(mltools)
library(data.table)
library(fastDummies)
library(hdm)
library(ranger)
library(sandwich)
library(lmtest)



April 4, 2025                                  Homework 4                     Andrew Girgis & Matthew Lee
Data                            ECON 673 High Dimensional Data                             3



library(broom)


Starter code

xnaref <- function(x) {
if(is.factor(x))
if(!is.na(levels(x)[1]))
x <- factor(x, levels = c(NA, levels(x)), exclude = NULL)
return(x)
}
naref <- function(DF) {
  if(is.null(dim(DF))) return(xnaref(DF))
if(!is.data.frame(DF))
stop("Input should be a data.frame or a factor")
DF <- lapply(DF, xnaref)
return(as.data.frame(DF))
}

lb <- read.csv("LightBeer.csv", stringsAsFactors = TRUE)
n <- nrow(lb)
logprice <- log(lb$price_floz)
logvol <- log(lb$beer_floz)
brand <- lb$beer_brand
container <- lb$container_descr
promo <- lb$promo
demog <- lb[,-(1:9)]
# Keep employment status separate and construct an unempolyed variable:
unemp <- (lb$employment == "none")
# Interact markets with demographics (except employment, which predicts unemp)
library(Matrix)
xdemog <- sparse.model.matrix( ~ market * (buyertype + income + childrenUnder6 +
children6to17 + degree + occupation + ethnic + microwave +
dishwasher + tvcable + singlefamilyhome + npeople), data = naref(demog))[, -1]
xdemog <- xdemog[, colSums(xdemog) > 0] # drop if never occurs
xbeer <- sparse.model.matrix( ~ ., data = data.frame(brand = naref(brand),
promo))[,-1]
# Interact price with market and money-related variables
xprice <- sparse.model.matrix( ~ logprice * (market * income + brand + promo) -
market * income - brand - promo, data = naref(cbind(demog, brand, promo)))[,-1]
xprice <- xprice[, colSums(xprice != 0) > 0] # drop if never occurs
x <- cbind(xprice, xbeer, xdemog) # bind all together
# For tree-based methods, we can do this:
xtree <- subset(lb, select = -c(household, employment, beer_spend, beer_floz))
## Now use either
# (logvol, unemp, x) with linear model selection estimators or
# (logvol, unemp, xtree) with tree-based estimators

set.seed(21108082)
ind <- sample(n, size = 1000)
logvol <- logvol[ind]
unemp <- unemp[ind]
x <- x[ind, ]
xtree <- xtree[ind, ]


April 4, 2025                            Homework 4              Andrew Girgis & Matthew Lee
                                    ECON 673 High Dimensional Data                                        4


Questions
Question 1
Do you expect this to be a negative, positive or insignificant effect on volume purchased? Why? Provide
some reasoning for competing explanations of the sign of the effect before making any estimates.
We expect unemployment to have a negative direct effect, but a positive correlation. Alcohol tends to be a
luxury good and having a job should allow individuals to buy more. The layman sort of logic being, and if
you give an alcoholic money they will buy more booze. However, many factors that lead to excessive drinking,
would probably also be associated with unemployment. Something like a high risk taking personality, might
be unemployed and drink significantly more. Furthermore, excessive drinking could have a causal effect
actually causing unemployment.




April 4, 2025                                  Homework 4                   Andrew Girgis & Matthew Lee
Question 2                            ECON 673 High Dimensional Data                                      5


Question 2
Discuss the unconditional difference between the amount purchased by unemployed and employed buyers. Do
you feel comfortable in claiming that this estimates the causal effect of unemployment, or do you think that
it is an estimated predictive effect? Why?
# Create a dummy variable for unemployed
lb$employed <- ifelse(lb$employment != "none", 1, 0)

# Unconditional difference
lb %>%
  group_by(employed) %>%

  summarise(mean = mean(beer_floz, na.rm = TRUE),
            sd = sd(beer_floz, na.rm = TRUE),
            n = n()) %>%
  mutate(se = sd/sqrt(n)) %>%
  mutate(lower = mean - qt(0.975, n-1)*se,
         upper = mean + qt(0.975, n-1)*se) %>%
  select(-n, -sd, -se) %>%
  mutate(employed = ifelse(employed == 1, "Yes", "No")) %>%
  kable()

                                employed        mean      lower      upper
                                No           293.3459   289.580   297.1118
                                Yes          259.4585   257.912   261.0050


# Create a histogram plot of beer_floz by employment status
ggplot(lb, aes(x = beer_floz, fill = factor(employed))) +
  geom_histogram(position = "identity", alpha = 0.5, bins = 30) +
  xlim(0, 2000) +
  labs(title = "Histogram of Beer Purchases by Employment Status",
       x = "Beer Purchases (floz)",
       y = "Count",
       fill= "Employment Status") +
  scale_fill_manual(values = c("blue", "red"), labels = c("Employed", "Unemployed")) +
  theme_minimal()

## Warning: Removed 22 rows containing non-finite outside the scale range
## (`stat_bin()`).
## Warning: Removed 4 rows containing missing values or values outside the scale range
## (`geom_bar()`).




April 4, 2025                                  Homework 4                    Andrew Girgis & Matthew Lee
Question 2                          ECON 673 High Dimensional Data                                         6


                Histogram of Beer Purchases by Employment Status
        12000




        9000




                                                                                       Employment Status

Count
        6000                                                                                Employed
                                                                                            Unemployed




        3000




           0

                  0          500            1000             1500             2000
                                   Beer Purchases (floz)
This is almost certainly not a causal estimation of the effect of Unemployment on volume purchased. This is
merely the predictive effect. Again in part 1 we asserted that there are many variables, such as temperament,
personality, ability, or even socioeconomic status, which could have a real impact on both unemployment and
volume of alcohol purchased.




April 4, 2025                                   Homework 4                   Andrew Girgis & Matthew Lee
Question 3                           ECON 673 High Dimensional Data                                          7


Question 3
Compare two estimates of a partially linear model of the effect of unemployment on volume while controlling
for other covariates:
 (a) Use a linear automatic model selection estimator with the fully-interacted data frame (labeled x below)
     for the estimation of the nonlinear part.
# Fit a linear model with automatic model selection
X_df <- as.data.frame(as.matrix(x))
X_df$unemp <- unemp

lm1 <- lm(logvol ~ unemp + ., data = X_df)
summary(lm1)

# Tidy model output
lm1_tidy <- tidy(lm1)

# Extract unemployment effect
unemp_effect <- lm1_tidy %>%
  filter(term == "unempTRUE")

# Print unemployment effect
print(unemp_effect)

## # A tibble: 1 x 5
##   term      estimate std.error statistic p.value
##   <chr>        <dbl>     <dbl>     <dbl>   <dbl>
## 1 unempTRUE    -1.17     0.688     -1.70 0.0921
kable(unemp_effect, caption = "Effect of Unemployment on Beer Volume (Linear Model)")

                         Effect of Unemployment on Beer Volume (Linear Model)

                       term             estimate     std.error    statistic     p.value
                       unempTRUE       -1.166949    0.6879659    -1.696231    0.0921469

 (b) Use a tree-based estimator (i.e., trees, forests, boosted trees) for the estimation of the nonlinear part.
     Why is it sufficient to use the alternate data frame (labeled xtree below instead of x) for this estimate?
# Fit a tree-based model using random forest
rf_model <- ranger(logvol ~ ., data = data.frame(logvol, unemp, xtree), num.trees = 100)
rf_model

## Ranger result
##
## Call:
## ranger(logvol ~ ., data = data.frame(logvol, unemp, xtree), num.trees = 100)
##
## Type:                            Regression
## Number of trees:                 100
## Sample size:                     1000
## Number of independent variables: 21
## Mtry:                            4
## Target node size:                5
## Variable importance mode:        none
## Splitrule:                       variance


April 4, 2025                                   Homework 4                     Andrew Girgis & Matthew Lee
Question 3                          ECON 673 High Dimensional Data                                        8


## OOB prediction error (MSE):              0.2345634
## R squared (OOB):                         0.5325
Tree-based methods like random forests partition the covariate space and predict outcomes flexibly. Since we
are simply sorting the data before making estimates, and then making estimates based on that sorting, we
have no need to include variables like beer spend, as they would just spit out the volume without giving us
any actually understanding of what happens. We want to sort the data on factors that aren’t the ones we
removed, and then from there estimate each individual bucket.




April 4, 2025                                  Homework 4                   Andrew Girgis & Matthew Lee
Question 4                         ECON 673 High Dimensional Data                                       9


Question 4
Given your experience in the previous step, describe how to make the best partially linear estimate of the
effect, estimate it and interpret your results.
# Convert sparse x to dense matrix
X <- as.matrix(x)
d <- unemp
y <- logvol

crossfit_rf <- function(x, d, y, dreg, yreg, nfold = 2) {
  nobs <- nrow(x)
  foldid <- sample(cut(1:nobs, breaks = nfold, labels = FALSE))
  subsam <- split(1:nobs, foldid)
  ytil <- dtil <- rep(NA, nobs)

    for (b in 1:length(subsam)) {
      dfit <- dreg(x[-subsam[[b]], ], d[-subsam[[b]]])
      yfit <- yreg(x[-subsam[[b]], ], y[-subsam[[b]]])
      dhat <- predict(dfit, x[subsam[[b]], ])$pred[,2]
      yhat <- predict(yfit, x[subsam[[b]], ])$pred
      dtil[subsam[[b]]] <- drop(d[subsam[[b]]] - dhat)
      ytil[subsam[[b]]] <- drop(y[subsam[[b]]] - yhat)
    }

    rfit <- lm(ytil ~ dtil)
    al <- coef(rfit)[2]
    se <- sqrt(vcovHC(rfit)[2, 2])
    cat(sprintf("\nalpha (se) = %g (%g)\n", al, se))

    return(list(alpha = al, se = se, dtil = dtil, ytil = ytil))
}


dreg <- function(x, d) { ranger(x = x, y = d, probability = TRUE) }
yreg <- function(x, y) { ranger(x = x, y = y) }

# Run cross-fitting DML
forest_dml <- crossfit_rf(x = X, d = d, y = y, dreg = dreg, yreg = yreg, nfold = 5)

##
## alpha (se) = 0.0521108 (0.0905873)
#Create a visualization of residuals

ytil <- forest_dml$ytil
dtil <- forest_dml$dtil

residuals_df <- data.frame(
  Residual_D = dtil,
  Residual_Y = ytil
)

ggplot(residuals_df, aes(x = Residual_D, y = Residual_Y)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", color = "red") +



April 4, 2025                                 Homework 4                   Andrew Girgis & Matthew Lee
Question 4                                                   ECON 673 High Dimensional Data                            10



                                 labs(
                                   title = "Residualized Outcome vs Residualized Treatment (DML Step)",
                                   x = "Residualized Unemployment",
                                   y = "Residualized Beer Volume (log)"
                                 ) +
                                 theme_minimal()

## `geom_smooth()` using formula = 'y ~ x'
                                      Residualized Outcome vs Residualized Treatment (DML Step)
                                  2




                                  1




Residualized Beer Volume (log)
                                  0




                                 −1




                                 −2




                                                  −0.4                    0.0                    0.4
                                                                 Residualized Unemployment




April 4, 2025                                                         Homework 4              Andrew Girgis & Matthew Lee
Question 5                         ECON 673 High Dimensional Data                                      11


Question 5
Estimate the pieces for a fully interactive model for the effect of unemployment, comparing two methods as
you did for the partially linear model.
# Linear model with full interactions
lm_full <- lm(logvol ~ unemp * ., data = X_df)
summary(lm_full)

# Random forest model
xtree_df <- xtree
xtree_df$logvol <- logvol
xtree_df$unemp <- unemp

rf_full <- ranger(logvol ~ ., data = xtree_df, num.trees = 100, importance = "impurity")
rf_full

## Ranger result
##
## Call:
## ranger(logvol ~ ., data = xtree_df, num.trees = 100, importance = "impurity")
##
## Type:                            Regression
## Number of trees:                 100
## Sample size:                     1000
## Number of independent variables: 21
## Mtry:                            4
## Target node size:                5
## Variable importance mode:        impurity
## Splitrule:                       variance
## OOB prediction error (MSE):      0.2291231
## R squared (OOB):                 0.5433429
# Tidy and filter lm_full
lm_full_tidy <- tidy(lm_full)

unemp_interactions <- lm_full_tidy %>%
  filter(grepl("unempTRUE:", term)) %>%
  arrange(desc(abs(estimate)))

# Show top 10 unemployment interaction effects
unemp_interactions %>%
  head(10) %>%
  kable(caption = "Top 10 Unemployment Interaction Effects (Linear Model)")

                        Top 10 Unemployment Interaction Effects (Linear Model)

term                                                    estimate       std.error     statistic     p.value
unempTRUE:degreeCollege                   3.272009e+12             1.508205e+13     0.2169473    0.8286785
unempTRUE:degreeHS                        3.272009e+12             1.508205e+13     0.2169473    0.8286785
unempTRUE:logprice:income100-200k                     -            5.306512e+12    -0.2169473    0.8286785
                                          1.151233e+12
unempTRUE:logprice:marketDETROIT:income100-200k
                                          1.151233e+12             5.306512e+12     0.2169473    0.8286785
unempTRUE:logprice:marketMIAMI:income20-60k           -            5.304287e+12    -0.2169473    0.8286785
                                          1.150751e+12



April 4, 2025                                 Homework 4                   Andrew Girgis & Matthew Lee
Question 5                    ECON 673 High Dimensional Data                                         12



term                                                 estimate        std.error     statistic     p.value
unempTRUE:income20-60k                       6.472134e+03        6.439928e+04     0.1005001    0.9201427
unempTRUE:brandMILLER LITE                               -       4.346883e+04    -0.1017399    0.9191609
                                             4.422514e+03
unempTRUE:logprice:marketPHOENIX                         -       3.681248e+04    -0.1129215    0.9103126
                                             4.156922e+03
unempTRUE:logprice:income20-60k              2.424914e+03        2.416873e+04     0.1003327    0.9202752
unempTRUE:logprice                                       -       1.834344e+04    -0.1037572    0.9175638
                                             1.903263e+03


# Random Forest variable importance
importance_df <- data.frame(
  Variable = names(rf_full$variable.importance),
  Importance = rf_full$variable.importance
)

importance_df %>%
  arrange(desc(Importance)) %>%
  head(10) %>%
  kable(caption = "Top 10 Important Variables (Random Forest Model)")

                      Top 10 Important Variables (Random Forest Model)

                                          Variable              Importance
                        price_floz        price_floz             121.48688
                        upc_description   upc_description         83.32295
                        quantity          quantity                48.05163
                        market            market                  31.22988
                        container_descr   container_descr         27.66613
                        beer_brand        beer_brand              21.03747
                        income            income                  13.33174
                        npeople           npeople                 12.62626
                        age               age                     12.62044
                        occupation        occupation              11.42634




April 4, 2025                             Homework 4                    Andrew Girgis & Matthew Lee
Question 6                        ECON 673 High Dimensional Data                                     13


Question 6
Given your experience in the previous step, describe how to make best interactive model estimate of the
effect, estimate it and interpret your results.
# Get residuals
residuals_full <- resid(lm_full)

library(ranger)

xtree_df <- xtree
xtree_df$residuals_full <- residuals_full
xtree_df$unemp <- unemp

# Fit random forest to residuals
rf_resid <- ranger(residuals_full ~ ., data = xtree_df, num.trees = 100, importance = "impurity")


# View model
rf_resid

## Ranger result
##
## Call:
## ranger(residuals_full ~ ., data = xtree_df, num.trees = 100,                   importance = "impurity")
##
## Type:                            Regression
## Number of trees:                 100
## Sample size:                     1000
## Number of independent variables: 21
## Mtry:                            4
## Target node size:                5
## Variable importance mode:        impurity
## Splitrule:                       variance
## OOB prediction error (MSE):      0.02584181
## R squared (OOB):                 -0.1801994
importance_df <- data.frame(
  Variable = names(rf_resid$variable.importance),
  Importance = rf_resid$variable.importance
)

importance_df %>%
  arrange(desc(Importance)) %>%
  head(10) %>%
  knitr::kable(caption = "Top Variables Explaining Residual Variation")

                              Top Variables Explaining Residual Variation

                                              Variable          Importance
                           upc_description    upc_description    2.9166096
                           price_floz         price_floz         2.7304591
                           market             market             2.3980273
                           quantity           quantity           0.9926963
                           beer_brand         beer_brand         0.8673931



April 4, 2025                                Homework 4                     Andrew Girgis & Matthew Lee
Question 6                           ECON 673 High Dimensional Data                                         14



                                                 Variable            Importance
                             occupation          occupation           0.7374434
                             tvcable             tvcable              0.7112848
                             degree              degree               0.7000064
                             npeople             npeople              0.6422675
                             income              income               0.5785232


There appear to be substantial interaction effects between unemployment levels and educational attainment,
particularly for individuals with high school and college degrees. These interactions suggest that the
relationship between education and unemployment is not uniform, but rather influenced significantly by the
level of education attained. Furthermore, we observe similarly strong interaction effects between higher income
brackets and unemployment, indicating that income level also plays a critical role in how unemployment
impacts individuals. Taken together, these findings underscore the importance of further investigating the
predictive power of educational attainment and occupational categories. Understanding how these factors
interact with unemployment will be crucial for refining our interactive model estimates and enhancing the
accuracy and interpretability of our analysis.




April 4, 2025                                   Homework 4                    Andrew Girgis & Matthew Lee
Question 7                            ECON 673 High Dimensional Data                                            15


Question 7
Now you have a few estimates of the effect. Summarize what you think the average treatment effect of
unemployment on volume is, and discuss it in light of the first part of the assignment.
The results suggest basically exactly what I supposed in part 1. It looks like there might be some negative
effect, but it fails to always be statistically significant. This suggests that my thoughts in part 1, that a naive
conditional mean estimator might be misleading turned out to be true, but my priors that there would be a
strong treatment effect turn out to be not so valid.




April 4, 2025                                     Homework 4                     Andrew Girgis & Matthew Lee
