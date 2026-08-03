# ECON 673 Final Paper

_Source: projects/ECON 673 Final Paper.pdf_

   The Impact of Oil Prices and Government Subsidies on
                                  Electric Vehicle Sales

                                Andrew Girgis & Matthew Lee ∗

                                           April 18, 2025



                                               Abstract


      ————————————————————————————————————–


      This paper investigates the effects of oil price shocks and government subsidies on electric
vehicle (EV) adoption in Canada, focusing on the geopolitical and economic disruptions triggered
by the Russia–Ukraine war. Leveraging this event as a quasi-natural experiment, we construct
a province-level panel dataset from 2019 to 2025 integrating gasoline prices, quarterly EV reg-
istrations, EV charging infrastructure, government incentive programs, demographic variables,
and income data. Our empirical strategy combines a Difference-in-Differences (DiD) design with
LASSO-based variable selection and interaction modeling to identify the most influential drivers
of EV uptake.
      We find that while provincial subsidies had limited and inconsistent impacts Nova Scotia’s pro-
gram, for example, yielded only modest gains the federal subsidy was associated with a significant
but counterintuitive negative effect. We interpret this result as reflecting broader macroeconomic
disruptions, including inflation, vehicle supply shortages, and post-COVID recovery effects. In
contrast, gasoline prices and public charging infrastructure consistently emerged as robust and
economically meaningful predictors of EV registrations across all model specifications. LASSO
  ∗
    Department of Economics, University of Waterloo, Waterloo, Ontario, N2L 3G1, Canada.       Email:
a4girgis@uwaterloo.ca or m265lee@uwaterloo.ca


                                                   1
regressions, especially those incorporating second-order interactions, highlighted the amplified
influence of infrastructure in the post-war period, with model performance reaching an out-of-
sample R2 of 0.94.
   Althoughugh our instrumental variable strategy using oil futures (WTI and WCS) was ulti-
mately inconclusive due to identificatichallenges,overall findings suggest that infrastructure iin-
vestments, particularly when paired with rising fuel costs, mayy be more effectivein accelerating
the adoption of electric vehicleson of electric vehicles than direct financial subsidies. These results
have key policy implications for climate-oriented transportation planning in Canada and other
advanced economies.
   ————————————————————————————————————–



   Keywords: Zero Emission Electric Vehicles (ZEV), Oil Prices, Public Policy, Government
Subsidies, EV Charging Infrastructure, Difference-in-Differences, LASSO Regression, Natural Ex-
periment


[This version of the paper is preliminary. Please do not quote without the author’s
permission]




                                                  2
1         Introduction

The transportation sector is one of the largest contributors to greenhouse gas emissions in Canada,
accounting for a significant share of total national emissions. A typical passenger vehicle emits
approximately 4.6 metric tons of carbon dioxide annually. U.S. Environmental Protection Agency,
20231 Greenhouse gas emissions from transportation primarily stem from the combustion of fossil
fuels including gasoline and diesel used in cars, trucks, ships, trains, and planes. Over 94%
of transportation energy consumption is petroleum-based, which results in substantial direct
emissions. In this context, increasing electric vehicle (EV) adoption has emerged as a key policy
priority in Canada’s climate strategy.
        Fuel price volatility, particularly the price of gasoline, has long been recognized as a major
driver of consumer behavior in vehicle markets. Increases in fuel costs often shift consumer
interest toward more fuel-efficient vehicles, including hybrid and electric models. This study
leverages the Russia–Ukraine war, which escalated in February 2022, as a natural experiment.
The war led to an unanticipated global oil price shock, driven by international sanctions and
severe supply disruptions. As oil prices spiked, Canadian gasoline prices followed suit, providing
a unique opportunity to examine how sudden and external cost shocks influence EV adoption.
        At the same time, the Canadian federal and provincial governments have introduced a variety
of EV subsidies and incentive programs. These policies range from upfront purchase rebates
to tax credits and infrastructure investment. While they are widely implemented, their actual
effectiveness in promoting EV adoption remains a matter of debate. Do financial incentives
significantly influence EV purchases, or are other factors such as fuel prices and infrastructure
availability more critical in shaping consumer behaviour?
        To answer these questions, this paper constructs a high-frequency, province-level panel dataset
covering the period from 2019 to 2025. The dataset integrates data on monthly gasoline prices,
quarterly EV registrations, cumulative charging infrastructure, provincial population, and median
after-tax income. Our empirical strategy employs a Difference-in-Differences (DiD) framework
to evaluate whether the post-war spike in oil prices led to a measurable increase in EV sales.
In addition, we use LASSO (Least Absolute Shrinkage and Selection Operator) regression to
    1
        U.S. Environmental Protection Agency. (2023). Greenhouse Gas Emissions from a Typical Passenger Vehicle.


                                                         3
identify the most relevant predictors of EV adoption and evaluate model performance across
multiple specifications.
    This study contributes to the growing literature on sustainable transportation by jointly ex-
amining the impact of exogenous economic shocks and public policy instruments on EV uptake.
Our central hypothesis is that the 2022 oil price shock positively affected EV registrations, partic-
ularly in provinces with lower baseline EV adoption. Furthermore, recognizing that infrastructure
availability plays a vital role in consumer decision-making, we explore whether the presence of
public EV charging stations has a greater causal impact on EV sales than financial subsidies. In
doing so, we aim to inform more effective and targeted policy design for accelerating the transition
to low-emission transportation in Canada.



2     Data and Methodology

This study investigates the impact of oil prices and government subsidies on electric vehicle (EV)
adoption in Canada, with a particular focus on the period surrounding the Russia–Ukraine war.
The war, which escalated in February 2022, triggered widespread geopolitical and economic shocks
most notably, a sharp rise in global oil prices due to sanctions and supply chain disruptions. We
exploit this exogenous increase in oil prices as a quasi-natural experiment to examine whether
higher fuel costs and public incentives accelerated EV adoption.


2.1    Data Sources

Our analysis is based on a monthly panel dataset covering the ten Canadian provinces from
January 2019 through early 2025. The dataset integrates information from multiple sources:
    Gasoline prices were obtained from Statistics Canada. Statistics Canada, 2025b We filtered
the data for regular unleaded gasoline and retained monthly price series for each province.
    EV registrations were also retrieved from Statistics Canada and filtered to include zero-
emission vehicles (ZEVs) by province. Statistics Canada, 2024 While this data is only available
on a quarterly basis, it remains valuable for capturing overall trends in EV adoption.
    Recognizing the importance of infrastructure in consumer adoption decisions, we collected



                                                 4
data on EV charging station installations in each province. From the department of natural
resources, we found a EV charger locator tool that had a database of every commercial and
public EV charger in North America. We used this to estimate for the amount of EV charging
infrastructure that a business or individual could expect. Casually this is pretty complicated to
unpack, but it seemed like an important control to consider. We computed a cumulative count
of installed chargers to capture the stock of publicly available infrastructure at any given point
in time.
   Provincial population data were included as a control for market size. These were sourced
from Statistics Canada on a quarterly basis.Statistics Canada, 2025a
   We also integrated median after-tax family income from 2019 to 2022. Due to data limitations,
we filled post-2022 values with the most recent available figures, holding income constant beyond
that point.
   Each dataset was merged using a consistent province and year-month structure to construct
a clean panel format suitable for longitudinal analysis.


2.2    LASSO and Model Selection

To identify the most relevant predictors of EV adoption, we implemented a LASSO (Least Abso-
lute Shrinkage and Selection Operator) regression. This machine learning technique is well-suited
for high-dimensional settings and helps reduce overfitting by penalizing the inclusion of irrelevant
variables. Our LASSO results consistently highlighted cumulative EV charging infrastructure
and median after-tax income as the most influential predictors. However, we note the potential
endogeneity in the relationship between chargers and EV registrations, as causality may run in
both directions.
   We also experimented with an interaction-based LASSO model to capture nonlinear effects,
although it yielded limited additional insight and was ultimately excluded from our final analysis.




                                                 5
3     Empirical Data Analysis

To begin our analysis, we visualize gasoline prices and EV registrations over time to understand
the trends before and after the onset of the Russia–Ukraine war. Figure 1 presents average gasoline
prices in Canada from 2019 to early 2025. A pronounced spike in fuel prices occurs immediately
following February 2022, aligning closely with the geopolitical escalation of the war. This shock
was driven by global sanctions on Russian oil exports and broader supply chain disruptions, which
created a substantial and sudden increase in the cost of fossil fuels across Canadian provinces.
    Figure 2 plots the evolution of EV registrations over the same period. While the overall trend
is upward, the timing and steepness of this growth vary by province. Notably, there is a visible
acceleration in EV uptake beginning in 2022, although the increase is not uniform. Provinces
with higher charging infrastructure and income levels appear to exhibit more sustained growth
in EV adoption. These visual patterns suggest a potential link between the fuel price shock and
increased consumer interest in EVs, particularly when supported by enabling infrastructure.
    Descriptive statistics confirm these initial observations. Provinces with higher baseline EV
adoption tend to have greater cumulative public charger availability and higher median after-tax
incomes. This reinforces the idea that infrastructure and affordability play complementary roles
in facilitating the EV transition.
    To assess the causal effects of rising fuel prices and government interventions, we estimate
a Difference-in-Differences (DiD) regression model. The specification includes an interaction
term between a post-war indicator and a treatment group, defined as provinces with below-
median pre-war EV adoption. The coefficient on this DiD interaction is negative and statistically
significant (β = −1036, p = 0.037), suggesting that the war-induced price spike did not uniformly
stimulate EV registrations in lower-adopting provinces. However, this result should be interpreted
cautiously, as these regions may also face structural barriers such as sparse infrastructure or fewer
urban centers.
    Surprisingly, the estimated coefficient for the federal EV subsidy is negative and significant
(β = −2454, p = 0.001). This counterintuitive finding likely reflects confounding macroeconomic
dynamics, such as inflation, post-pandemic economic uncertainty, and supply chain disruptions
affecting vehicle availability. Nova Scotia’s provincial subsidy, by contrast, is statistically insignif-


                                                   6
icant, aligning with its limited scale and relatively recent implementation. These results point
to a broader insight: that direct financial incentives alone may be insufficient to drive large-scale
behavioral change.
   Cumulative EV charging infrastructure consistently emerges as a strong and robust predictor
of EV registrations across all model specifications. In our ordinary least squares (OLS) model,
the coefficient for chargers is both large and highly significant (β = 5.86, p < 0.001). This
suggests that each additional public charger is associated with a measurable increase in EV
uptake, reflecting the importance of infrastructure visibility and convenience in reducing range
anxiety and supporting consumer confidence.
   To further explore predictive power and feature importance, we implement a LASSO regression
with and without second-order interactions. The base LASSO model selects cumulative chargers,
gasoline prices, income, and the post-war indicator as dominant predictors. The DiD interaction
term also remains in the model with a negative weight, supporting earlier findings. Notably,
infrastructure remains the most significant contributor, with cumulative chargers receiving the
largest coefficient (6328), followed by gasoline price (443). The model achieves a high test R2 of
0.83 and a mean squared error (MSE) of approximately 10.2 million.
   When we introduce all pairwise interactions using PolynomialFeatures and re-run the LASSO,
model performance improves significantly, achieving a test R2 of 0.94 and adjusted R2 of 0.80.
Among the selected features, interactions between cumulative chargers and the post-war period
(β = 12, 164), as well as between gas prices and specific provinces (e.g., Ontario and British
Columbia), emerge as highly influential. These results suggest that the impact of infrastructure
is not only significant on its own, but may be amplified under conditions of heightened fuel prices
consistent with economic theory on substitution effects in the presence of price shocks.
   Finally, we explored an instrumental variables (IV) approach using U.S. and Canadian oil
futures (WTI and WCS) to isolate exogenous components of gasoline prices. While the regression
of gasoline prices on WTI and WCS was statistically significant (R2 = 0.75), the model failed
to capture sufficient province-level variation, limiting its usefulness as a first-stage instrument in
a two-stage least squares (2SLS) framework. As such, the IV strategy was ultimately deemed
inconclusive.



                                                  7
    In sum, our empirical results underscore the multifaceted drivers of EV adoption in Canada.
While oil price shocks appear to increase demand, infrastructure investment plays a more con-
sistent and causally plausible role. Financial incentives have mixed effects and are likely less
effective in isolation than when combined with broader systemic support.



4     Conclusion

This paper set out to examine whether recent geopolitical shocks most notably, the Russia–Ukraine
war and existing policy instruments have meaningfully influenced the adoption of electric vehi-
cles (EVs) in Canada. Using a rich panel dataset that combines fuel prices, EV registrations,
government subsidies, charging infrastructure, and demographic factors from 2019 through early
2025, we assessed how both market forces and policy levers affect consumer behavior in the EV
market.
    Our Difference-in-Differences (DiD) model suggests that provincial EV subsidies had, at best,
modest effects. For instance, Nova Scotia’s rebate was associated with a statistically significant
but economically small increase of approximately 57 EV registrations per quarter. This limited
impact raises questions about the cost-effectiveness of such direct financial interventions. Mean-
while, the federal subsidy exhibited an unexpected negative coefficient in our regressions. We
interpret this result not as evidence of policy failure, but as a reflection of concurrent macroeco-
nomic disruptions such as inflation, supply chain bottlenecks, and post-COVID market distortions
that likely dampened the policy’s intended effect.
    Across all model specifications, gasoline prices and charging infrastructure emerged as the most
consistent and robust predictors of EV registrations. Notably, our LASSO analysis revealed that
the interaction between charger availability and the post-war period was among the strongest
predictors of EV uptake. This suggests that infrastructure investments not only facilitate EV
adoption but may also amplify consumer responsiveness during periods of fuel price volatility.
    These findings carry important policy implications. While financial subsidies are politically
salient and offer short-term incentives, our results indicate that infrastructure deployment par-
ticularly in underserved provinces may deliver more sustained and scalable impacts. Moreover,
market-based mechanisms such as carbon pricing, which directly influence fuel costs, could play

                                                 8
a complementary role in accelerating the EV transition by shifting relative price signals in favor
of cleaner alternatives.
   Of course, this study has several limitations. Our analysis is observational and cannot fully
rule out the influence of unmeasured confounders. Additionally, the use of aggregated provincial
data may mask heterogeneity in consumer behavior at the household or community level. Fu-
ture research could benefit from micro-level purchase data, survey-based insights, or alternative
specifications of the post-war treatment window.
   Nonetheless, as oil price volatility continues to shape global energy markets, understanding
how consumers respond to these shocks especially in the presence of enabling infrastructure will
remain critical. Our findings suggest that rather than relying solely on subsidies, policymakers
should consider a more holistic approach: one that combines infrastructure, pricing signals, and
consumer confidence to support the long-term electrification of transport in Canada.




                                                9
    Appendix

A    Tables and Figures

                    Table 1: Summary Statistics of Key Variables

       Variable                     Mean     Std. Dev.       Min        Max

       Gasoline Price (¢/L)         142.93        30.04      62.40     225.40
       Cumulative EV Chargers       867.67      1115.81      18.00    4476.00
       EV Registrations            4607.41      7138.28       5.00   49357.00
       Federal Subsidy                0.99         0.12       0.00       1.00
       NS Subsidy                     0.04         0.20       0.00       1.00
       Median After-Tax Income    67545.81      5123.37   57812.00   78265.00
       Population (Millions)          5.49         2.59       0.15      15.45




                                        10
  Table 2: OLS Regression Results – Determinants of EV Registrations

Variable                  Coefficient   Std. Error    t-Stat   p-Value

Gasoline Price                  18.03          5.68     3.17     0.002
Cumulative EV Chargers           5.86          0.25    23.47     0.000
Federal Subsidy              -2454.43        760.41    -3.23     0.001
NS Subsidy                    -373.51        785.44    -0.48     0.634
Post-War Indicator             742.56        543.07     1.37     0.172
DiD Interaction Term         -1036.23        494.99    -2.09     0.037
Median After-Tax Income          0.21          0.07     3.21     0.001
Population                   -1288.29        497.94    -2.59     0.010




                                 11
Table 3: LASSO Regression – Most Important Predictors of EV Registrations

                Feature                      Coefficient

                Cumulative EV Chargers           6327.90
                Gasoline Price (¢/L)              442.71
                Post-War Indicator                233.09
                Median After-Tax Income           227.28
                Province: British Columbia        184.55
                Federal Subsidy                  -215.34
                DiD Interaction Term             -517.33




                                     12
Table 4: LASSO with Interaction Terms (Top Selected Features)

       Interaction Term                   Coefficient

       Chargers × Post-War Indicator         12164.15
       Chargers × Province: Quebec            4627.30
       Gasoline Price × Province: ON          2926.10
       Gasoline Price × DiD Interaction       1273.19




                             13
Figure 1: Cumulative Number of EV Charging Stations in Canada by Province (2010–2025).
The figure illustrates the gradual and then accelerated rollout of public charging infrastructure,
particularly in provinces such as Quebec, Ontario, and British Columbia.




                                               14
Figure 2: Monthly Percent Change in Gas Prices by Region Compared to WTI Spot Price. The
figure highlights sharp volatility following 2020 and again after February 2022, consistent with
global oil market disruptions.




                                              15
Figure 3: Monthly Gasoline Prices. A clear spike in prices is visible following the escalation of
the Russia–Ukraine war in February 2022.




                                               16
Figure 4: Quarterly Zero-Emission Vehicle (ZEV) Registrations (2019–2025). EV uptake accel-
erates post-2022.




                                            17
References

Statistics Canada. (2024). Table 20-10-0025-01: New zero-emission vehicle registrations, quarterly
       [Accessed April 18, 2025]. https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=
       2010002501
Statistics Canada. (2025a). Table 17-10-0009-01: Population estimates, quarterly [Accessed April
       18, 2025]. https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901
Statistics Canada. (2025b). Table 18-10-0001-01: Monthly average retail prices for gasoline and
       fuel oil, by geography [Accessed April 18, 2025]. https://www150.statcan.gc.ca/t1/tbl1/
       en/tv.action?pid=1810000101
U.S. Environmental Protection Agency. (2023). Sources of greenhouse gas emissions [Accessed
       April 18, 2025]. https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions




                                               18
