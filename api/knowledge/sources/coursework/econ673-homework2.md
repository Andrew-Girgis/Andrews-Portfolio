# ECON673_Homework2

_Source: projects/ECON673_Homework2.pdf_

              ECON 673 High Dimensional Data - Homework 2

                                      Andrew Girgis & Matthew Lee

                                                   2025-02-22


Contents
   0.1   Objective . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     2
   0.2   Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    2
         0.2.1 Load Libraries . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        2
         0.2.2 Load and Explore Data . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .           3
         0.2.3 Data cleaning . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       3
         0.2.4 Data Exploration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        6

1 Questions                                                                                                    11
  1.1 Question 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 11
  1.2 Question 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
  1.3 Question 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
  1.4 Question 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
  1.5 Question 5 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20

2 Appendix                                                                                                          22


Contents




                                                          1
0.1   Objective                      ECON 673 High Dimensional Data                                          2


0.1     Objective
This analysis aims to investigate key factors influencing the price per fluid ounce of beer by fitting a series
of linear regression models. The analysis will involve regressing the log price of beer on various demographic
characteristics, container types, and an interaction term involving log volume, promotion status, and brand.
Model performance will be evaluated using in-sample and out-of-sample mean squared error (MSE) and R-
squared (R2) values. Additionally, hypothesis tests will be conducted to assess the significance of individual
predictors and their interactions in determining beer prices.
Another objective of this study is to compare models with a smaller set of predictors to those incorporating a
larger number of variables, including interactions. This will help us understand the trade-off between model
complexity and predictive accuracy, providing insights into whether simpler models can yield comparable
results to more complex ones. The findings from this analysis will contribute to a better understanding of
the factors that influence beer pricing and inform strategies for pricing and marketing within the beverage
industry.

0.2     Data
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
  • demographic data including buyer type (married couple, male, or female), income, occupation, educa-
    tion and age

0.2.1   Load Libraries

library(readr)
library(dplyr)
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
library(maps)
library(usmap)
library(stringr)


February 27, 2025                                Homework 2                   Andrew Girgis & Matthew Lee
0.2   Data                      ECON 673 High Dimensional Data                             3



library(mltools)
library(data.table)
library(fastDummies)
library(hdm)


0.2.2   Load and Explore Data

# Load the data
beer <- read_csv("LightBeer.csv")

# Check the structure of the data
str(beer)

# Check the first few rows of the data
head(beer)

beer <- as.data.frame(beer)

0.2.3   Data cleaning

# check na's in the data
sum(is.na(beer))

## [1] 0
sum(complete.cases(beer))

## [1] 73115
# Impute missing
beer$npeople[is.na(beer$npeople)] <- median(beer$npeople, na.rm = TRUE)

# check na's in the data
sum(is.na(beer))
sum(complete.cases(beer))

# Check for na values by column
beer %>%
    summarise_all(~sum(is.na(.)))

No missing values in the dataset.
# Check minimum and maximum values for quantity, beer_spend, beer_floz, and
# price_floz and display a table
beer %>%
    select(quantity, beer_spend, beer_floz, price_floz) %>%
    summary() %>%
    kable(caption = "Summary of Quantity, Beer Spend, Beer Volume, and Price per Fluid Ounce",
         format = "latex")




February 27, 2025                        Homework 2              Andrew Girgis & Matthew Lee
0.2   Data                           ECON 673 High Dimensional Data                                    4


               Summary of Quantity, Beer Spend, Beer Volume, and Price per Fluid Ounce

                    quantity          beer_spend          beer_floz        price_floz
                    Min. : 1.000      Min. : 0.51         Min. : 12.0      Min. :0.001315
                    1st Qu.: 1.000    1st Qu.: 8.97       1st Qu.: 144.0   1st Qu.:0.046306
                    Median : 1.000    Median : 12.99      Median : 216.0   Median :0.055509
                    Mean : 1.318      Mean : 13.78        Mean : 265.9     Mean :0.055951
                    3rd Qu.: 1.000    3rd Qu.: 16.38      3rd Qu.: 360.0   3rd Qu.:0.063750
                    Max. :48.000      Max. :159.13        Max. :9216.0     Max. :0.234063


# List all columns in the dataset
colnames(beer)

The columns in the dataset that will be used for the analysis are:
  • upc_description
  • quantity
  • beer_brand
  • beer_spend
  • beer_floz
  • price_floz
  • container_descr
  • promotion
  • market
  • buyertype
  • income
  • employment
  • ethnic
  • degree
  • age
  • singlefamilyhome
  • npeople
The columns that will not be used for the analysis are:
  • household
  • childrenUnder6
  • children6to17
  • microwave
  • tvcable
  • dishwasher
  • degree
  • occupation
# Remove columns that will not be used for the analysis
beer <- beer %>%
    select(-household, -childrenUnder6, -children6to17, -microwave,
        -tvcable, -dishwasher, -occupation)

Since many of these columns are categorical, we will need to convert them to factors before fitting the
regression models.
# Check unique values for categorical variables
beer %>%
     select(upc_description, beer_brand, age, container_descr,
          promotion, market, buyertype, income, employment, degree) %>%



February 27, 2025                              Homework 2                    Andrew Girgis & Matthew Lee
0.2   Data                           ECON 673 High Dimensional Data                                          5



      lapply(unique)

Beer brand, container description, market, buyer type, are all categorical variables that need to be converted
to factors however as the number increases for these columns it doesnt provide any additional information.
Therefore, we will convert the columns using one hot encoding. The variables income, degree, and education
will be converted to factors.
The upc_description column contains the number of beers in the purchase.
# check unique values of upc_description
unique(beer$upc_description)

Since we will need to interpret the effect of coors 6 pack of cans on the price of beer, we will create a dummy
variable for this.
# Create a dummy variable for coors 6 pack
beer$coors_6pack <- ifelse(grepl("CRS LT BR CN 6P", beer$upc_description), 1, 0)

beer <- beer %>%
  select(-upc_description)

# Convert columns to factors
beer <- beer %>%
    mutate(promotion = as.factor(promotion), income = factor(income,
        levels = c("under20k", "20-60k", "60-100k", "100-200k",
            "200k+"), ordered = TRUE), degree = factor(degree,
        levels = c("none", "HS", "College", "Grad"), ordered = TRUE),
        employment = factor(employment, levels = c("none",
            "part", "full"), ordered = TRUE), age = factor(age,
            levels = c("<30", "30-39", "40-49", "50+"),
            ordered = TRUE), singlefamilyhome = as.factor(singlefamilyhome),
        npeople = as.numeric(npeople))

# Check factor levels
levels(beer$promotion)
levels(beer$income)
levels(beer$degree)
levels(beer$employment)
levels(beer$age)

# Set reference levels for categorical variables
beer$promotion <- relevel(beer$promotion, ref = "FALSE")

# One hot encoding for categorical variables
encoded_brand <- model.matrix(~beer_brand, data = beer)[,
    -1] %>%
    as.data.frame()

encoded_container <- model.matrix(~container_descr, data = beer)[,
    -1] %>%
    as.data.frame()

# remove -container_descrKEG BALL
encoded_container <- encoded_container %>%
    select(-`container_descrKEG BALL`)




February 27, 2025                                Homework 2                   Andrew Girgis & Matthew Lee
0.2   Data                         ECON 673 High Dimensional Data                                        6



encoded_market <- model.matrix(~market, data = beer)[, -1] %>%
    as.data.frame()

encoded_buyertype <- model.matrix(~buyertype, data = beer)[,
    -1] %>%
    as.data.frame()

encoded_ethnic <- model.matrix(~ethnic, data = beer)[, -1] %>%
    as.data.frame()

beer <- cbind(beer, encoded_brand, encoded_container, encoded_market,
    encoded_buyertype)

# Check na's in the data
sum(is.na(beer))

## [1] 4610
# Check where the na's are
colnames(beer)[colSums(is.na(beer)) > 0]

## [1] "npeople"
# Check the summary stats of the npeople column
summary(beer$npeople)

##    Min. 1st Qu. Median     Mean 3rd Qu.    Max.    NA's
##   1.000   2.000   2.000   2.259   3.000   4.000    4610
# Calculate the percentage of missing values in the npeople column
sum(is.na(beer$npeople)) / nrow(beer) * 100

## [1] 6.305136
Since there is ~6% missing values in the npeople column, we will impute the missing values with the median.
beer$npeople[is.na(beer$npeople)] <- median(beer$npeople, na.rm = TRUE)

# Check for na's in the data
sum(is.na(beer))

## [1] 0
# Check the structure of the data for all vars
str(beer)

0.2.4   Data Exploration

# Plot the distribution of price per fluid ounce
beer %>%
  ggplot(aes(x = price_floz)) +
  geom_histogram(fill = "skyblue", color = "black", bins = 30) +
  labs(title = "Distribution of Price per Fluid Ounce", x = "Price per Fluid Ounce", y = "Frequency") +
  geom_density(alpha = 1, fill = "orange") +
  theme_minimal()




February 27, 2025                              Homework 2                   Andrew Girgis & Matthew Lee
0.2             Data                                  ECON 673 High Dimensional Data                                      7


                    Distribution of Price per Fluid Ounce




            15000




Frequency
            10000




            5000




               0

                         0.00                  0.05              0.10                    0.15            0.20
                                                                 Price per Fluid Ounce

                                Histogram depicting the distribution of Price per Fluid Ounce in our dataset


# Plot the distribution of beer spend grouped by promotion status stacked
beer %>%
  ggplot(aes(x = beer_spend, fill = promotion)) +
  geom_histogram(position = "identity", bins = 30, alpha = 0.7) +
  labs(title = "Distribution of Beer Spend by Promotion Status", x = "Beer Spend", y = "Frequency") +
  theme_minimal()




February 27, 2025                                              Homework 2                       Andrew Girgis & Matthew Lee
0.2             Data                                ECON 673 High Dimensional Data                                 8


                    Distribution of Beer Spend by Promotion Status




            15000




Frequency
                                                                                                            promotion
            10000
                                                                                                                FALSE
                                                                                                                TRUE




            5000




               0

                         0                           50                       100                 150
                                                                 Beer Spend

                                 Histogram of distribution of Beer spend stacked by promotion status


# Create a mapping of city names to states
market_to_state <- data.frame(
  market = c("atlanta", "boston", "buffalo-rochester", "chicago", "detroit", "los angeles",
             "miami", "philadelphia", "seattle", "washington dc",
             "rural illinois", "rural texas", "rural florida", "rural new york"),
  state = c("georgia", "massachusetts", "new york", "illinois", "michigan", "california",
            "florida", "pennsylvania", "washington", "district of columbia",
            "illinois", "texas", "florida", "new york")
)

# Ensure lowercase
market_to_state$market <- tolower(market_to_state$market)
market_to_state$state <- tolower(market_to_state$state)

# Merge state names into `beer` dataset
beer_state_data <- beer %>%
  mutate(market = tolower(market)) %>%
  left_join(market_to_state, by = "market") %>%
  group_by(state) %>%
  summarise(total_beer_spend = sum(beer_spend, na.rm = TRUE)) %>%
  filter(!is.na(state)) # Remove unmatched markets
# Plot the heatmap of beer spend by state
plot_usmap(data = beer_state_data, values = "total_beer_spend", regions = "states") +
  scale_fill_gradient(low = "lightblue", high = "darkblue", name = "Beer Spend") +
  labs(title = "Beer Spend by State") +
  theme(legend.position = "right")



February 27, 2025                                                Homework 2             Andrew Girgis & Matthew Lee
0.2   Data                    ECON 673 High Dimensional Data                              9


Beer Spend by State




                                                                             Beer Spend
                                                                                 40000


                                                                                 30000


                                                                                 20000


                                                                                 10000




# Create a plot of price per fluid ounce coloured by beer brand
beer %>%
  ggplot(aes(x = beer_floz, y = price_floz, color = beer_brand)) +
  xlim(0, 3000) +
  geom_point(alpha = 0.5) +
  labs(title = "Price per Fluid Ounce by Beer Brand", x = "Beer Volume (fl.oz)", y = "Price per Fluid Ou
  theme_minimal()




February 27, 2025                      Homework 2              Andrew Girgis & Matthew Lee
0.2                            Data                             ECON 673 High Dimensional Data                                           10


                               Price per Fluid Ounce by Beer Brand




                        0.20




Price per Fluid Ounce
                        0.15                                                                                           beer_brand
                                                                                                                           BUD LIGHT
                                                                                                                           BUSCH LIGHT
                                                                                                                           COORS LIGHT

                        0.10                                                                                               MILLER LITE
                                                                                                                           NATURAL LIGHT




                        0.05




                        0.00

                                  0                          1000                          2000                 3000
                                                                     Beer Volume (fl.oz)

                                                  Scatterplot of price per Fluid Ounce coloured by Beer Brand




February 27, 2025                                                            Homework 2              Andrew Girgis & Matthew Lee
                                  ECON 673 High Dimensional Data                                    11


1     Questions
1.1    Question 1
Use OLS to estimate the model. Discuss the in-sample MSE and R2 for this estimate. Use K-fold cross
validation to estimate the out-of-sample M SE and R2 .
beer <- beer %>%
  select(-beer_brand, -container_descr, -market, -buyertype)

beer$log_price <- log(beer$price_floz)
beer$log_vol <- log(beer$beer_floz)
beer$log_spend <- log(beer$beer_spend)

beer <- beer %>%
  select(-price_floz, -beer_floz, -beer_spend)

# Split the data into training and testing sets
set.seed(1410)

# Create a training set with 80% of the data
train_index <- createDataPartition(beer$log_price, p = 0.8, list = FALSE)
train <- beer[train_index, ]
test <- beer[-train_index, ]



# Fit the OLS model
ols_model <- lm(log_price ~ . + log_vol*promotion*`beer_brandBUSCH LIGHT` + log_vol*promotion*`beer_bran

# Display the summary of the OLS model
summary(ols_model)

# Calculate the in-sample MSE and R-squared
in_sample_mse <- mean(ols_model$residualsˆ2)
in_sample_r_squared <- summary(ols_model)$r.squared

colSums(is.na(train))

train <- na.omit(train)

# Perform K-fold cross-validation
set.seed(1410)
cv_model <- cv.glmnet(as.matrix(train %>% select(-log_price)), train$log_price, alpha = 0, nfolds = 10)

# Calculate the out-of-sample MSE and R-squared
out_of_sample_mse <- cv_model$cvm[cv_model$lambda == cv_model$lambda.min]
out_of_sample_r_squared <- 1 - out_of_sample_mse / var(train$log_price)

Using OLS to estimate the model and K-fold cross-validation to estimate the out-of-sample M SE and R2 ,
we find the following results:
    • In-sample M SE: 0.0278491
    • In-sample R2 : 0.5671976
    • Out-of-sample M SE: 0.0100809
    • Out-of-sample R2 : 0.8433359



February 27, 2025                            Homework 2                  Andrew Girgis & Matthew Lee
1.2              Question 2                     ECON 673 High Dimensional Data                                  12


1.2                 Question 2
Compare residuals with fitted values and non-demographic covariates to examine the pattern of the het-
eroskedasticity in the model. Given the what you find (if anything), suggest one extra variable that could
improve the fit, re-estimate and check if it does indeed improve predictions.
# Create a plot of residuals vs. fitted values
train_clean <- train %>%
  select(-log_price)

train_clean$predicted <- predict(ols_model, newdata = train_clean)

train_clean %>%
  ggplot(aes(x = predicted, y = residuals(ols_model))) +
  geom_point(alpha = 0.5) +
  geom_hline(yintercept = 0, linetype = "dashed", color = "red") +
  labs(title = "Residuals vs. Fitted Values", x = "Fitted Values", y = "Residuals") +
  theme_minimal()

                 Residuals vs. Fitted Values


             1




             0




Residuals
            −1




            −2




            −3




                  −3.50                 −3.25          −3.00                   −2.75        −2.50            −2.25
                                                               Fitted Values

                                                   Residuals vs Fitted Values


# Select non-demographic covariates
non_demo_vars <- c( "quantity", "promotion")

# Loop through non-demographic variables and plot residuals
library(ggplot2)
for (var in non_demo_vars) {
  p <- ggplot(train_clean, aes_string(x = var, y = residuals(ols_model))) +
    geom_point(alpha = 0.5) +
    geom_hline(yintercept = 0, linetype = "dashed", color = "red") +



February 27, 2025                                          Homework 2                  Andrew Girgis & Matthew Lee
1.2              Question 2                             ECON 673 High Dimensional Data                            13



              labs(title = paste("Residuals vs.", var), x = var, y = "Residuals") +
              theme_minimal()
            print(p)
}
                 Residuals vs. quantity


             1




             0




Residuals
            −1




            −2




            −3




                   0                       10                   20               30              40               50
                                                                      quantity
                 Residuals vs. promotion


             1




             0




Residuals
            −1




            −2




            −3




                                                FALSE                                    TRUE
                                                                     promotion

In this model, the residual plot showed a clear pattern where the variance of residuals increased as fitted
values increased. This suggests heteroskedasticity, meaning the variability of errors is not uniform across all


February 27, 2025                                                Homework 2              Andrew Girgis & Matthew Lee
1.2   Question 2                   ECON 673 High Dimensional Data                                       14


predicted price levels. This pattern is common in economic data, particularly in pricing models where price
variation may depend on product characteristics, brand, or promotional effects.
Given the observed heteroskedasticity, an additional variable that could improve the model fit is a squared
term for beer volume (log_vol2 ). The reasoning behind this choice is:
Larger beer volumes may have nonlinear pricing effects, where the impact on price per ounce diminishes at
higher quantities. Volume discounts or bulk purchases might exhibit diminishing returns, meaning a simple
linear model may not fully capture the relationship. Including log_volˆ2 allows the model to adjust for
nonlinear trends, potentially reducing heteroskedasticity.




February 27, 2025                              Homework 2                   Andrew Girgis & Matthew Lee
1.3   Question 3                     ECON 673 High Dimensional Data                                          15


1.3    Question 3
Using your first regression, make and interpret point- and interval estimates for the difference in price:
  • for Detroit relative to the Buffalo-Rochester area.
  • for Busch Light relative to Natural Light.
  • for Coors Light due to promotion, at average log volume.
  • for Coors Light due to promotion, averaged over log volume.
  • for a Coors Light 6 pack (12oz cans) due to promotion.
# Compute covariance matrix
cov_matrix <- vcov(ols_model)

# Extract relevant covariances
cov_detroit_buffalo <- cov_matrix["marketDETROIT", "`marketBUFFALO-ROCHESTER`"]
cov_busch_natural <- cov_matrix["`beer_brandBUSCH LIGHT`", "`beer_brandNATURAL LIGHT`"]

# Calculate standard errors
se_detroit_buffalo <- sqrt(cov_detroit_buffalo)
se_busch_natural <- sqrt(cov_busch_natural)

The covariance’s of the variables are as follows:
  • For Detroit relative to the Buffalo-Rochester area: 7.2441847 × 10−5
  • For Busch Light relative to Natural Light: 1.1509416 × 10−4
coef_promo <- coef(ols_model)["promotionTRUE"]
coef_coors_promo_logvol <- coef(ols_model)["promotionTRUE:`beer_brandCOORS LIGHT`:log_vol"]

var_promo <- vcov(ols_model)["promotionTRUE", "promotionTRUE"]
var_coors_promo_logvol <- vcov(ols_model)["promotionTRUE:`beer_brandCOORS LIGHT`:log_vol", "promotionTRU
cov_coors_promo_logvol_promo <- vcov(ols_model)["promotionTRUE", "promotionTRUE:`beer_brandCOORS LIGHT`:

print(c(coef_promo, coef_coors_promo_logvol, var_promo, var_coors_promo_logvol, cov_coors_promo_logvol_p

##                                 promotionTRUE
##                                 -4.560357e-02
## promotionTRUE:`beer_brandCOORS LIGHT`:log_vol
##                                  1.063578e-02
##
##                                  1.145062e-03
##
##                                  9.361315e-05
##
##                                  2.051884e-04
The coefficients and variance-covariance values for the difference in price for Coors Light due to promotion
at average log volume are as follows:
  • Coefficient for promotion: -0.0456036
  • Coefficient for Coors Light due to promotion at average log volume: 0.0106358
  • Variance of promotion: 0.0011451
  • Variance of Coors Light due to promotion at average log volume: 9.3613153 × 10−5
  • Covariance between promotion and Coors Light due to promotion at average log volume: 2.051884 ×
     10−4
# Extract coefficients
coef_coorslight <- coef(ols_model)["`beer_brandCOORS LIGHT`"]



February 27, 2025                                   Homework 2                Andrew Girgis & Matthew Lee
1.3   Question 3                    ECON 673 High Dimensional Data                                       16



coef_coors_promo_logvol <- coef(ols_model)["promotionTRUE:`beer_brandCOORS LIGHT`:log_vol"]

# Extract variance-covariance values
var_coorslight <- vcov(ols_model)["`beer_brandCOORS LIGHT`", "`beer_brandCOORS LIGHT`"]
var_coors_promo_logvol <- vcov(ols_model)["promotionTRUE:`beer_brandCOORS LIGHT`:log_vol", "promotionTRU
cov_coors_promo_logvol_coorslight <- vcov(ols_model)["`beer_brandCOORS LIGHT`", "promotionTRUE:`beer_bra

# Print values to use for bootstrap
print(c(coef_coorslight, coef_coors_promo_logvol, var_coorslight, var_coors_promo_logvol, cov_coors_prom

##                       `beer_brandCOORS LIGHT`
##                                 -1.212508e-03
## promotionTRUE:`beer_brandCOORS LIGHT`:log_vol
##                                  1.063578e-02
##
##                                  3.297021e-04
##
##                                  9.361315e-05
##
##                                  6.010075e-05
The coefficients and variance-covariance values for the difference in price for Coors Light due to promotion
at average log volume are as follows:
  • Coefficient for Coors Light: -0.0012125
  • Coefficient for Coors Light due to promotion at average log volume: 0.0106358
  • Variance of Coors Light: 3.297021 × 10−4
  • Variance of Coors Light due to promotion at average log volume: 9.3613153 × 10−5
  • Covariance between Coors Light and Coors Light due to promotion at average log volume: 6.0100752×
     10−5
# cov of coors 6 pack * promotion and promotion
cov_coors_6pack_promo <- vcov(ols_model)["promotionTRUE", "promotionTRUE:coors_6pack"]

  a) point: 0.055+0.028 = 0.083, std: sqrt(0.010ˆ2 + 0.012ˆ2 + 2(7.2497176 * 10 ˆ-5)) = 0.0197229 , CI
     -> [0.044388,0.121612]
  b) point: -0.171+0.531 = 0.36 ; std: sqrt (0.021ˆ2 + 0.017ˆ2 + 2(1.1517948 × 10ˆ-4)) = 0.03099; CI ->
     [0.29926,0.4207404] oh yeah I still need the covar of Promo Coorslight6pack and Promo
  c) point: 0.0263 + std: sqrt (0.011459 + (9.1875311*10ˆ(-5)) + 2(2.0540243 × 10ˆ-4)) = 0.109369 : CI
     -> [-0.188063,0.240663] Therefore not signficant
  d) -0.195+0.046 = -0.14900 , std: sqrt( 0.029ˆ22 + 0.034ˆ2 + 2(-0.000001338) )= 0.03396 ci: [-0.2155616,-
     0.0824384]




February 27, 2025                              Homework 2                   Andrew Girgis & Matthew Lee
1.4   Question 4                   ECON 673 High Dimensional Data                                     17


1.4    Question 4
Next, use an automatic model selection estimator to fit the model. Discuss estimated in-sample and out-of
sample M SE and R2 for this estimate by comparing them with the OLS estimate from before.
# Fit the automatic model selection estimator
set.seed(1410)

auto_xtrain <- model.matrix(log_price ~ . + log_vol * promotion *
    `beer_brandBUSCH LIGHT` + log_vol * promotion * `beer_brandCOORS LIGHT` +
    log_vol * promotion * `beer_brandMILLER LITE` + log_vol *
    promotion * `beer_brandNATURAL LIGHT` - log_spend, data = train)[,
    -1]
auto_ytrain <- train$log_price

auto_xtest <- model.matrix(log_price ~ . + log_vol * promotion *
    `beer_brandBUSCH LIGHT` + log_vol * promotion * `beer_brandCOORS LIGHT` +
    log_vol * promotion * `beer_brandMILLER LITE` + log_vol *
    promotion * `beer_brandNATURAL LIGHT` - log_spend, data = test)[,
    -1]
auto_ytest <- test$log_price


lasso_model <- cv.glmnet(auto_xtrain, auto_ytrain, alpha = 1)            # use alpjha = 1 for lasso

# Get optimal lambda value
optimal_lambda <- lasso_model$lambda.min

# Fit the lasso model with the optimal lambda
lasso_fit <- glmnet(auto_xtrain, auto_ytrain, alpha = 1, lambda = optimal_lambda)

# Calculate in-sample MSE and R-squared
in_sample_mse_lasso <- mean((predict(lasso_fit, s = optimal_lambda,
    newx = auto_xtrain) - auto_ytrain)ˆ2)
in_sample_r_squared_lasso <- 1 - in_sample_mse_lasso/var(auto_ytrain)

# Calculate out-of-sample MSE and R-squared
out_of_sample_mse_lasso <- mean((predict(lasso_fit, s = optimal_lambda,
    newx = auto_xtest) - auto_ytest)ˆ2)
out_of_sample_r_squared_lasso <- 1 - out_of_sample_mse_lasso/var(auto_ytest)

plot(lasso_model)     # Plot cross-validation MSE




February 27, 2025                             Homework 2                  Andrew Girgis & Matthew Lee
1.4                    Question 4                 ECON 673 High Dimensional Data                                 18


                             137 137 135 134 134 131 126 122 114 106     90 81 63 41 25 15   9 9 4 4 5 4 3 2




                      0.06




Mean−Squared Error
                      0.05




                      0.04




                      0.03



                                       −10                 −8                  −6             −4                −2

                                                                      Log(λ)

                                                 Cross-Validation MSE for Lasso Model


print(lasso_model$lambda.min)                         # Check the optimal lambda

## [1] 1.40982e-05
Using an automatic model selection estimator to fit the model, we find the following results:
                     • In-sample M SE: 0.0278761
                     • In-sample R2 : 0.5667863
                     • Out-of-sample M SE: 0.028271
                     • Out-of-sample R2 : 0.5642719
Comparing these results with the OLS estimates from before, we can see that the automatic model selection
estimator has produced the following results:
                     • In-sample M SE (OLS): 0.0278491
                     • In-sample R2 (OLS): 0.5671976
                     • Out-of-sample M SE (OLS): 0.0100809
                     • Out-of-sample R2 (OLS): 0.8433359
The automatic model selection estimator has produced a lower in-sample M SE and a higher in-sample
R2 compared to the OLS estimates. However, the out-of-sample M SE is higher for the automatic model
selection estimator, while the out-of-sample R2 is lower compared to the OLS estimates.
# Define the design matrix for LASSO
X_train <- model.matrix(log_price ~ . + log_vol*promotion*`beer_brandBUSCH LIGHT` +
                               log_vol*promotion*`beer_brandCOORS LIGHT` +
                               log_vol*promotion*`beer_brandMILLER LITE` +
                               log_vol*promotion*`beer_brandNATURAL LIGHT` - log_vol - log_spend,
                               data = train)[, -1]

Y_train <- train$log_price



February 27, 2025                                               Homework 2              Andrew Girgis & Matthew Lee
1.4   Question 4              ECON 673 High Dimensional Data                             19



# Run LASSO using the hdm package
lasso_model <- rlasso(X_train, Y_train, post = TRUE)   # post=TRUE applies post-LASSO OLS

# Print summary of the LASSO model
summary(lasso_model)

# Extract coefficients
lasso_coefficients <- coef(lasso_model)

# Print only nonzero coefficients
print(lasso_coefficients[lasso_coefficients != 0])




February 27, 2025                         Homework 2            Andrew Girgis & Matthew Lee
1.5   Question 5                     ECON 673 High Dimensional Data                                         20


1.5    Question 5
The previous question dealt with price predictions. Now try to estimate how features of beer affect the price.
What is different with automatic model selection? Using your second regression estimator, compare (with
the first estimates) point- and interval estimates for the difference in price:
  • for Detroit relative to the Buffalo-Rochester area.
  • for Busch Light relative to Natural Light.
  • for Coors Light due to promotion, at average log volume.
  • for Coors Light due to promotion, averaged over log volume.
  • for a Coors Light 6 pack (12oz cans) due to promotion.
# Extract nonzero coefficients from LASSO model
lasso_coefs <- coef(lasso_model)

# Pull required coefficients
coef_detroit <- lasso_coefs["marketDETROIT"]
coef_buffalo <- lasso_coefs["marketBUFFALO-ROCHESTER"]

coef_busch <- lasso_coefs["beer_brandBUSCH LIGHT"]
coef_natural <- lasso_coefs["beer_brandNATURAL LIGHT"]

coef_promo <- lasso_coefs["promotionTRUE"]
coef_coors_promo_logvol <- lasso_coefs["promotionTRUE:`beer_brandCOORS LIGHT`:log_vol"]

# Extract for Coors Light 6 pack
coef_coors_6pack <- lasso_coefs["coors_6pack"]

mean_log_vol <- mean(train$log_vol)
point_detroit_buffalo <- coef_detroit - coef_buffalo
point_busch_natural <- coef_busch - coef_natural
point_coors_promo_avglogvol <- coef_promo + coef_coors_promo_logvol * mean_log_vol
point_coors_promo_avg <- coef_promo
point_coors_6pack <- coef_promo + coef_coors_6pack

The point estimates for the difference in price for Detroit relative to the Buffalo-Rochester area, Busch Light
relative to Natural Light, Coors Light due to promotion at average log volume, Coors Light due to promotion
averaged over log volume, and a Coors Light 6 pack (12oz cans) due to promotion are as follows:
  • For Detroit relative to the Buffalo-Rochester area: NA
  • For Busch Light relative to Natural Light: NA
  • For Coors Light due to promotion at average log volume: -0.2496792
  • For Coors Light due to promotion averaged over log volume: -0.2255452
  • For a Coors Light 6 pack (12oz cans) due to promotion: -0.1674666
The results indicate the estimated differences in beer prices across various factors. However, some compar-
isons, such as the price difference between Detroit and Buffalo-Rochester, as well as between Busch Light and
Natural Light, are reported as “NA.” This suggests that the LASSO regression likely shrank these coefficients
to zero, meaning the model did not find strong enough evidence of price differences between these locations
or brands. Since LASSO penalizes less important predictors, it is possible that regional pricing variations
and brand differences were not statistically significant enough to be retained in the final model.
The estimates for the impact of promotions on Coors Light prices reveal notable price reductions. At the
average log volume, a promotion on Coors Light was associated with a 24.97% decrease in price. When this
effect was averaged across all beer volumes, the estimated price reduction was slightly smaller at 22.55%,
suggesting that the impact of promotions may vary depending on package size. The marginally lower discount
in the overall estimate could indicate that larger beer purchases, which might already have lower per-unit



February 27, 2025                                Homework 2                   Andrew Girgis & Matthew Lee
1.5   Question 5                    ECON 673 High Dimensional Data                                        21


prices, experience slightly weaker relative price reductions when promoted.
The specific estimate for a Coors Light 6-pack (12oz cans) under promotion was a 16.75% price reduction,
which was smaller than the general Coors Light promotion effect. This suggests that promotional discounts
for smaller packs may not be as aggressive as those for larger packages. Retailers may prioritize higher dis-
counts on larger volumes to encourage bulk purchases, while the relative price drop for smaller packs remains
more limited. Additionally, differences in promotional strategies across container types could contribute to
this variation.
Overall, these results highlight the substantial impact of promotions on Coors Light pricing, with discounts
ranging from 16.75% for a 6-pack to 24.97% at the average log volume. The absence of significant price
differences between Detroit and Buffalo-Rochester, as well as between Busch Light and Natural Light, sug-
gests that these factors may not be as influential in determining beer prices when compared to promotional
effects.




February 27, 2025                               Homework 2                    Andrew Girgis & Matthew Lee
                                  ECON 673 High Dimensional Data                                 22


2    Appendix
                                      OLS Model Summary Stats

                                                                  Dependent variable:
                                                                        log_price
            ‘beer_brandMILLER LITE‘:log_vol                            −0.019∗∗∗
                                                                        (0.003)

            promotionTRUE:‘beer_brandMILLER LITE‘                      −0.206∗∗∗
                                                                        (0.048)

            ‘beer_brandNATURAL LIGHT‘:log_vol                           0.040∗∗∗
                                                                         (0.003)

            promotionTRUE:‘beer_brandNATURAL LIGHT‘                    −0.282∗∗∗
                                                                        (0.048)

            promotionTRUE:‘beer_brandBUSCH LIGHT‘:log_vol                0.020∗
                                                                         (0.012)

            promotionTRUE:‘beer_brandCOORS LIGHT‘:log_vol                0.018∗
                                                                         (0.010)

            promotionTRUE:‘beer_brandMILLER LITE‘:log_vol               0.038∗∗∗
                                                                         (0.009)

            promotionTRUE:‘beer_brandNATURAL LIGHT‘:log_vol             0.052∗∗∗
                                                                         (0.009)

            Constant                                                   −2.277∗∗∗
                                                                        (0.019)

            Observations                                                 54,772
            R2                                                            0.569
            Adjusted R2                                                   0.567
            Residual Std. Error                                    0.167 (df = 54634)
            F Statistic                                       525.442∗∗∗ (df = 137; 54634)
            Note:                                             ∗ p<0.1; ∗∗ p<0.05; ∗∗∗ p<0.01




February 27, 2025                             Homework 2                Andrew Girgis & Matthew Lee
                      ECON 673 High Dimensional Data                                 23


                            OLS Model Summary Stats


                                      Dependent variable:
                                          log_price
                    quantity               0.006∗∗∗
                                            (0.001)

                    promotion               −0.046
                                            (0.034)

                    income.L               0.021∗∗∗
                                            (0.005)

                    income.Q                −0.005
                                            (0.004)

                    income.C                 0.002
                                            (0.003)

                    incomeˆ4                −0.001
                                            (0.002)

                    age.L                  0.013∗∗∗
                                            (0.005)

                    age.Q                 −0.011∗∗∗
                                           (0.004)

                    age.C                   0.0004
                                            (0.002)

                    employment.L             0.002
                                            (0.001)

                    employment.Q            −0.003
                                            (0.002)

                    degree.L               0.028∗∗∗
                                            (0.004)

                    degree.Q              −0.023∗∗∗
                                           (0.003)

                    degree.C                0.004∗∗
                                            (0.002)

                    ethnicblack            0.025∗∗∗
                                            (0.009)

                    ethnichispanic          0.020∗∗
                                            (0.009)

                    ethnicother            −0.021∗∗
                                            (0.010)
February 27, 2025                 Homework 2 ∗∗∗            Andrew Girgis & Matthew Lee
                    ethnicwhite           0.026
                                           (0.008)
                                    ECON 673 High Dimensional Data                               24




                                       OLS Model Summary Stats

                                                                     Dependent variable:
                                                                         log_price
               singlefamilyhome                                            −0.001
                                                                           (0.002)

               npeople                                                    0.004∗∗∗
                                                                           (0.001)

               coors_6pack                                                0.061∗∗∗
                                                                           (0.008)

               ‘beer_brandBUSCH LIGHT‘                                   −0.171∗∗∗
                                                                          (0.021)

               ‘beer_brandCOORS LIGHT‘                                     −0.001
                                                                           (0.018)

               ‘beer_brandMILLER LITE‘                                    0.072∗∗∗
                                                                           (0.016)

               ‘beer_brandNATURAL LIGHT‘                                 −0.531∗∗∗
                                                                          (0.017)

               container_descrKEG                                          −0.025
                                                                           (0.018)

               ‘container_descrNON REFILLABLE BOTTLE‘                     0.052∗∗∗
                                                                           (0.002)

               ‘container_descrNON REFILLABLE BOTTLE ALUMINUM‘            0.153∗∗∗
                                                                           (0.014)

               ‘container_descrNON REFILLABLE BOTTLE PLASTIC‘            −0.030∗∗∗
                                                                          (0.008)

               ‘container_descrREFILLABLE BOTTLE‘                         0.293∗∗∗
                                                                           (0.017)

               marketATLANTA                                              0.059∗∗∗
                                                                           (0.010)

               marketBALTIMORE                                            0.065∗∗∗
                                                                           (0.013)

               marketBIRMINGHAM                                           0.104∗∗∗
                                                                           (0.010)

               marketBOSTON                                               0.088∗∗∗
                                                                           (0.011)

               ‘marketBUFFALO-ROCHESTER‘                                  −0.028∗∗
                                                                           (0.011)

               marketCHARLOTTE                                             −0.002
                                                                           (0.010)

               marketCHICAGO                                             −0.032∗∗∗
                                                                          (0.010)




February 27, 2025                            Homework 2                 Andrew Girgis & Matthew Lee
                            ECON 673 High Dimensional Data                                     25


                                  OLS Model Summary Stats

                                                      Dependent variable:
                                                          log_price
                    marketCINCINNATI                       0.042∗∗∗
                                                            (0.010)

                    marketCLEVELAND                         0.017∗
                                                            (0.010)

                    marketCOLUMBUS                         0.042∗∗∗
                                                            (0.010)

                    marketDALLAS                           0.194∗∗∗
                                                            (0.009)

                    marketDENVER                           0.097∗∗∗
                                                            (0.011)

                    ‘marketDES MOINES‘                     0.110∗∗∗
                                                            (0.011)

                    marketDETROIT                          0.055∗∗∗
                                                            (0.010)

                    ‘marketEXURBAN NY‘                     0.160∗∗∗
                                                            (0.014)

                    ‘marketGRAND RAPIDS‘                   0.052∗∗∗
                                                            (0.011)

                    ‘marketHARTFORD-NEW HAVEN‘             0.099∗∗∗
                                                            (0.013)

                    marketHOUSTON                          0.087∗∗∗
                                                            (0.010)

                    marketINDIANAPOLIS                     0.021∗∗
                                                           (0.010)

                    marketJACKSONVILLE                     0.081∗∗∗
                                                            (0.012)

                    ‘marketKANSAS CITY‘                    0.034∗∗∗
                                                            (0.011)

                    ‘marketLITTLE ROCK‘                    0.054∗∗∗
                                                            (0.012)

                    ‘marketLOS ANGELES‘                      0.008
                                                            (0.010)

                    marketLOUISVILLE                       0.038∗∗∗
                                                            (0.011)

                    marketMEMPHIS                          0.099∗∗∗
                                                            (0.012)

                    marketMIAMI                            0.082∗∗∗
                                                            (0.009)

                    marketMILWAUKEE                          0.009
                                                            (0.011)

                    marketMINNEAPOLIS                      0.104∗∗∗
                                                            (0.011)



February 27, 2025                        Homework 2                   Andrew Girgis & Matthew Lee
                            ECON 673 High Dimensional Data                                   26




                                OLS Model Summary Stats

                                                    Dependent variable:
                                                        log_price
                    marketNASHVILLE                      0.110∗∗∗
                                                          (0.010)

                    ‘marketNEW ORLEANS-MOBILE‘           0.089∗∗∗
                                                          (0.011)

                    ‘marketOKLAHOMA CITY-TULSA‘          0.112∗∗∗
                                                          (0.011)

                    marketOMAHA                          0.091∗∗∗
                                                          (0.010)

                    marketORLANDO                        0.078∗∗∗
                                                          (0.010)

                    marketPHILADELPHIA                   0.073∗∗∗
                                                          (0.012)

                    marketPHOENIX                        0.131∗∗∗
                                                          (0.009)

                    marketPITTSBURGH                     0.060∗∗∗
                                                          (0.013)

                    ‘marketPORTLAND, OR‘                 0.085∗∗∗
                                                          (0.012)

                    ‘marketRALEIGH-DURHAM‘               0.045∗∗∗
                                                          (0.010)

                    marketRICHMOND                         0.006
                                                          (0.010)

                    ‘marketRURAL ALABAMA‘                0.126∗∗∗
                                                          (0.014)

                    ‘marketRURAL ARKANSAS‘               0.127∗∗∗
                                                          (0.017)

                    ‘marketRURAL CALIFORNIA‘              0.019∗
                                                          (0.011)

                    ‘marketRURAL COLORADO‘               0.163∗∗∗
                                                          (0.041)

                    ‘marketRURAL FLORIDA‘                0.032∗∗∗
                                                          (0.012)

                    ‘marketRURAL GEORGIA‘                0.102∗∗∗
                                                          (0.012)

                    ‘marketRURAL IDAHO‘                  0.112∗∗∗
                                                          (0.017)

                    ‘marketRURAL ILLINOIS‘               −0.019∗
                                                         (0.010)




February 27, 2025                      Homework 2                   Andrew Girgis & Matthew Lee
                             ECON 673 High Dimensional Data                                    27




                                 OLS Model Summary Stats

                                                      Dependent variable:
                                                          log_price
                    ‘marketRURAL INDIANA‘                  0.049∗∗∗
                                                            (0.012)

                    ‘marketRURAL IOWA‘                     0.034∗∗∗
                                                            (0.010)

                    ‘marketRURAL KANSAS‘                   0.091∗∗∗
                                                            (0.016)

                    ‘marketRURAL KENTUCKY‘                 0.117∗∗∗
                                                            (0.015)

                    ‘marketRURAL LOUISIANA‘                0.029∗∗
                                                           (0.013)

                    ‘marketRURAL MAINE‘                    0.060∗∗∗
                                                            (0.013)

                    ‘marketRURAL MICHIGAN‘                 0.050∗∗∗
                                                            (0.011)

                    ‘marketRURAL MINNESOTA‘                0.129∗∗∗
                                                            (0.018)

                    ‘marketRURAL MISSISSIPPI‘                0.008
                                                            (0.013)

                    ‘marketRURAL MISSOURI‘                 0.086∗∗∗
                                                            (0.011)

                    ‘marketRURAL MONTANA‘                  0.109∗∗∗
                                                            (0.013)

                    ‘marketRURAL NEBRASKA‘                 0.099∗∗∗
                                                            (0.019)

                    ‘marketRURAL NEVADA‘                     0.009
                                                            (0.012)

                    ‘marketRURAL NEW HAMPSHIRE‘              0.014
                                                            (0.036)

                    ‘marketRURAL NEW MEXICO‘               0.135∗∗∗
                                                            (0.012)

                    ‘marketRURAL NEW YORK‘                  −0.043
                                                            (0.064)

                    ‘marketRURAL NORTH CAROLINA‘            −0.010
                                                            (0.011)




February 27, 2025                        Homework 2                   Andrew Girgis & Matthew Lee
                             ECON 673 High Dimensional Data                                     28




                                OLS Model Summary Stats

                                                       Dependent variable:
                                                           log_price
                    ‘marketRURAL NORTH DAKOTA‘              0.195∗∗∗
                                                             (0.019)

                    ‘marketRURAL OHIO‘                      0.067∗∗∗
                                                             (0.015)

                    ‘marketRURAL OKLAHOMA‘                  0.102∗∗∗
                                                             (0.026)

                    ‘marketRURAL OREGON‘                      0.025
                                                             (0.032)

                    ‘marketRURAL PENNSYLVANIA‘              0.107∗∗∗
                                                             (0.014)

                    ‘marketRURAL SOUTH CAROLINA‘            0.023∗∗
                                                            (0.010)

                    ‘marketRURAL SOUTH DAKOTA‘              0.046∗∗∗
                                                             (0.018)

                    ‘marketRURAL TENNESSEE‘                 0.141∗∗∗
                                                             (0.012)

                    ‘marketRURAL TEXAS‘                     0.138∗∗∗
                                                             (0.010)

                    ‘marketRURAL VERMONT‘                   0.051∗∗∗
                                                             (0.018)

                    ‘marketRURAL VIRGINIA‘                   −0.016
                                                             (0.016)

                    ‘marketRURAL WASHINGTON‘                0.099∗∗∗
                                                             (0.013)

                    ‘marketRURAL WEST VIRGINIA‘            −0.070∗∗∗
                                                            (0.014)

                    ‘marketRURAL WISCONSIN‘                   0.009
                                                             (0.010)

                    ‘marketRURAL WYOMING‘                   0.115∗∗∗
                                                             (0.032)

                    marketSACRAMENTO                          0.010
                                                             (0.010)

                    ‘marketSALT LAKE CITY‘                  0.080∗∗∗
                                                             (0.014)

                    ‘marketSAN ANTONIO‘                     0.107∗∗∗
                                                             (0.009)




February 27, 2025                         Homework 2                   Andrew Girgis & Matthew Lee
                                    ECON 673 High Dimensional Data                                 29




                                        OLS Model Summary Stats

                                                              Dependent variable:
                                                                  log_price
                    ‘marketSAN DIEGO‘                                −0.005
                                                                     (0.011)

                    ‘marketSAN FRANCISCO‘                            0.048∗∗∗
                                                                      (0.011)

                    marketSEATTLE                                    0.086∗∗∗
                                                                      (0.011)

                    ‘marketST. LOUIS‘                                0.018∗
                                                                     (0.010)

                    ‘marketSURBURBAN NY‘                             0.022∗∗
                                                                     (0.011)

                    marketSYRACUSE                                −0.080∗∗∗
                                                                   (0.014)

                    marketTAMPA                                      0.076∗∗∗
                                                                      (0.009)

                    ‘marketURBAN NY‘                                 0.118∗∗∗
                                                                      (0.011)

                    ‘marketWASHINGTON DC‘                            0.057∗∗∗
                                                                      (0.011)

                    buyertypemale                                 −0.018∗∗∗
                                                                   (0.003)

                    buyertypemarried                              −0.021∗∗∗
                                                                   (0.002)

                    log_vol                                       −0.145∗∗∗
                                                                   (0.002)

                    promotionTRUE:log_vol                            −0.001
                                                                     (0.006)

                    ‘beer_brandBUSCH LIGHT‘:log_vol               −0.017∗∗∗
                                                                   (0.004)

                    promotionTRUE:‘beer_brandBUSCH LIGHT‘            −0.115∗
                                                                     (0.065)

                    ‘beer_brandCOORS LIGHT‘:log_vol                  −0.001
                                                                     (0.003)

                    promotionTRUE:‘beer_brandCOORS LIGHT‘            −0.071
                                                                     (0.054)




February 27, 2025                             Homework 2                  Andrew Girgis & Matthew Lee
                                  ECON 673 High Dimensional Data                                 30




                                        OLS Model Summary Stats

                                                                  Dependent variable:
                                                                        log_price
            ‘beer_brandMILLER LITE‘:log_vol                            −0.016∗∗∗
                                                                        (0.003)

            promotionTRUE:‘beer_brandMILLER LITE‘                      −0.195∗∗∗
                                                                        (0.047)

            ‘beer_brandNATURAL LIGHT‘:log_vol                           0.039∗∗∗
                                                                         (0.003)

            promotionTRUE:‘beer_brandNATURAL LIGHT‘                    −0.306∗∗∗
                                                                        (0.047)

            promotionTRUE:coors_6pack                                  −0.195∗∗∗
                                                                        (0.029)

            promotionTRUE:‘beer_brandBUSCH LIGHT‘:log_vol                0.023∗∗
                                                                         (0.011)

            promotionTRUE:‘beer_brandCOORS LIGHT‘:log_vol                 0.011
                                                                         (0.010)

            promotionTRUE:‘beer_brandMILLER LITE‘:log_vol               0.036∗∗∗
                                                                         (0.008)

            promotionTRUE:‘beer_brandNATURAL LIGHT‘:log_vol             0.055∗∗∗
                                                                         (0.008)

            Constant                                                   −2.150∗∗∗
                                                                        (0.017)

            Observations                                                 58,493
            R2                                                            0.567
            Adjusted R2                                                   0.566
            Residual Std. Error                                    0.167 (df = 58354)
            F Statistic                                       554.162∗∗∗ (df = 138; 58354)
            Note:                                             ∗ p<0.1; ∗∗ p<0.05; ∗∗∗ p<0.01




February 27, 2025                             Homework 2                Andrew Girgis & Matthew Lee
