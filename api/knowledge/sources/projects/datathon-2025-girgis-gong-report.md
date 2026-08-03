# Datathon-2025_Girgis_Gong_Report

_Source: projects/Datathon-2025_Girgis_Gong_Report.pdf_

     Rotman Datathon 2025 Report
Analyzing the Impact of Rising Costs of Living on
   Economic Development and Supply Chains
        Team Members: Andrew Girgis, Yuxin Gong
                    January 17, 2025




                           1
Contents
1 Executive Summary                                                                       3

2 Introduction                                                                           4
  2.1 Problem Statement . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      4
  2.2 Objectives . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   4
  2.3 Scope and Approach . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       4
  2.4 Data Sources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     5

3 Key Variables                                                                           5
  3.1 Cost of Living Metrics . . . . . . . . . . . . . . . . . . . . . . . . . . . .      5
  3.2 Supply Chain Stability Metrics . . . . . . . . . . . . . . . . . . . . . . .        6
  3.3 Supply Chain Costs Metrics . . . . . . . . . . . . . . . . . . . . . . . . .        6
  3.4 Economic Indicators . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       6
  3.5 Data Preprocessing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      7

4 Methodology                                                                             8

5 Results and Discussion                                                                  9
  5.1 Correlational Insights . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    9
  5.2 Model Outputs . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       9
  5.3 Interpretation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    9

6 Recommendations                                                                        10
  6.1 Business Strategies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    10
  6.2 Policy Suggestions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     10

7 Conclusion                                                                             11

Appendices                                                                               12

A CPI Over Time - Top 10 Countries                                                       12

B Household Consumption Per Capita Growth Over Time - Top 10 Coun-
  tries                                                            13

C Household Consumption as % of GDP Over Time - Top 10 Countries 14

D Inflation Over Time - Top 10 Countries                                                 15

E Year-Over-Year % Change in CPI (All Countries)                                         16

F Year-Over-Year % Change in CPI (Excluding Specific Countries)                          17




                                             2
1    Executive Summary
The rising cost of living has become a critical global challenge that influences consumer be-
havior, supply chain dynamics, and economic stability. As living expenses outpace income
growth, households prioritize essential goods and services over discretionary spending,
creating significant disruptions across industries. This report investigates the interplay
between increase in cost of living and supply chain variables, with the aim of providing
actionable insights to businesses and policy makers.
    Our analysis focuses on three key objectives: understanding the impact of increased
living costs on supply chain stability and costs, identifying economic and regional factors
that contribute to cost increases, and recommending strategies for organizations to miti-
gate these effects. Using robust data sets from global organizations, we used correlation
analysis, predictive modeling, and data visualization to uncover critical patterns.
    Key findings reveal a negative correlation between rising consumer prices (CPI) and
trade metrics such as exports and imports, indicating that increasing costs of living
destabilize supply chains. Our predictive models further demonstrate that higher CPI
levels are associated with reduced trade volumes, highlighting vulnerabilities in global
supply chains.
    To address these challenges, we recommend that businesses adopt direct-to-consumer
models, locate manufacturing, and leverage technology to improve supply chain agility.
Policymakers are urged to combat inflation, streamline trade regulations, and invest in
infrastructure to support resilience. By implementing these strategies, stakeholders can
mitigate the adverse effects of increased costs and ensure economic and supply chain
stability.




                                             3
2     Introduction
2.1     Problem Statement
The rising cost of living has become a pressing global issue, impacting households, busi-
nesses, and entire economies. As living expenses increase at a pace faster than income
growth, consumer behavior is shifting significantly, with a marked decrease in short-term,
nonessential, and impulse purchases. This phenomenon extends to the broader economic
framework and influences supply chain dynamics, operational costs, and market struc-
tures. Supply chains must adapt to changing consumer priorities, focusing on essential
goods and services while facing increased pressure on production, distribution, and cost
management. This datathon seeks to explore the intersection of rising living costs, supply
chain stability, and organizational strategies.

2.2     Objectives
This project aims to address three critical questions:

    1. How does the rising cost of living impact supply chain stability and costs?
       We hypothesize that increases in the cost of living lead to reduced consumer spend-
       ing on non-essential goods, forcing supply chains to realign to the essentials. This
       shift could result in supply chain disruptions and increased operational costs, par-
       ticularly in industries reliant on discretionary spending.

    2. What economic and regional factors contribute to cost increases within
       supply chains?
       Identifying the key economic indicators and regional characteristics that influence
       supply chain costs is essential for understanding the vulnerabilities and challenges
       faced by different sectors and regions.

    3. How can organizations adapt supply chain strategies to mitigate the
       effects of rising costs on consumers?
       To remain competitive, organizations must adopt cost-saving measures, streamline
       operations, and consider innovative strategies such as direct-to-consumer models
       or localized manufacturing. These approaches can help alleviate consumer burdens
       and maintain supply chain resilience.

2.3     Scope and Approach
To address these objectives, this study leverages a multi-faceted approach:

    • Investigating the correlation between rising living costs and supply chain variables.

    • Identifying key regions or demographics most affected by these changes.

    • Developing actionable recommendations for businesses and policymakers to ensure
      supply chain stability in a cost-constrained environment.

    Through data analysis and predictive modeling, this project seeks to provide insights
into the patterns and drivers of supply chain dynamics under economic pressure, offering
strategies to enhance resilience and adaptability.

                                             4
2.4    Data Sources
The data utilized in this project were sourced from the Rotman Datathon raw datasets,
which compile information from fifteen reputable global organizations. These include:
    • United Nations Population Division
    • Human Mortality Database (HMD)
    • Eurostat
    • United Nations Statistics Division
    • World Bank
    • International Monetary Fund (IMF)
    • International Labour Organization (ILO)
    • International Telecommunication Union (ITU)
    • World Health Organization (WHO)
    • Food and Agriculture Organization (FAO)
    • International Civil Aviation Organization (ICAO)
    • Stockholm International Peace Research Institute (SIPRI)
    • UNESCO Institute for Statistics (UIS)
    • World Trade Organization (WTO)
    • World Federation of Exchanges
    These diverse and authoritative data sources ensure comprehensive coverage and cred-
ibility for analyzing the variables relevant to the rising cost of living and its impact on
supply chain dynamics.


3     Key Variables
To investigate the relationship between the rising cost of living and supply chain dynam-
ics, we have identified the following key variables based on our hypotheses:

3.1    Cost of Living Metrics
These variables measure changes in consumer costs and household spending patterns:
    • Consumer Price Index (2010 = 100): Tracks changes over time in prices for
      consumers.
    • Inflation, consumer prices (annual %): Directly ties to cost-of-living changes.
    • Households and NPISHs final consumption expenditure (% of GDP):
      Reflects household spending trends.
    • Household final consumption expenditure per capita growth (annual %):
      Indicates how spending changes over time.

                                            5
3.2    Supply Chain Stability Metrics
These variables assess the stability and adaptability of supply chains:
   • Exports of goods and services (% of GDP): Shows how changes in global
     demand might impact supply chains.

   • Imports of goods and services (% of GDP): Tracks dependency on imported
     goods, which impacts costs and stability.

   • Labor force participation rate, total (% of total population ages 15+):
     Indicates workforce trends affecting production and supply.

   • Broad money growth (annual %): Rapid money supply growth can influence
     inflation and cost of living.

   • Foreign direct investment, net inflows (% of GDP): Highlights investment
     trends in specific regions that might improve supply chain infrastructure.

   • Net barter terms of trade index (2015 = 100): Indicates regional trade
     competitiveness, which can impact supply chain costs.

   • Transport services (% of commercial service exports): Reflects how trans-
     port infrastructure supports adaptation strategies.

   • High-technology exports (current US$): Indicates tech-driven supply chain
     improvements.

   • Gross fixed capital formation (current US$): Tracks investments in supply
     chain infrastructure.

   • Customs and other import duties (% of tax revenue): Affects the feasibility
     of DTC models by impacting costs.

3.3    Supply Chain Costs Metrics
These variables capture direct costs related to supply chain operations:
   • Cost to export, border compliance (US$): Reflects export-related supply
     chain costs.

   • Cost to import, border compliance (US$): Reflects import-related supply
     chain costs.

   • Air transport, freight (million ton-km): Measures the volume of goods trans-
     ported by air.

3.4    Economic Indicators
These variables provide insights into broader economic trends that influence cost of living
and supply chains:
   • Unemployment, total (% of total labor force) (national estimate): Impacts
     disposable income and consumption patterns.

                                            6
   • Adjusted savings: education expenditure (% of GNI): Investments in edu-
     cation influence long-term adaptability.

   • Final consumption expenditure (annual % growth): Tracks growth in overall
     consumption expenditures.

   • Adjusted net national income (annual % growth): Reflects changes in na-
     tional income, which influences economic stability.

3.5    Data Preprocessing
To prepare the dataset for analysis, we extracted the relevant columns, including ”Coun-
try Name,” ”Country Code,” and ”Time,” ensuring that all data types were appropriately
formatted to facilitate accurate visualizations and analyses. Missing values were handled
by imputing country-specific averages, ensuring consistency across the dataset. Addi-
tionally, countries with excessive missing data across multiple years were excluded to
maintain the integrity and reliability of the analysis.




                                           7
4    Methodology
To identify patterns and relationships within the data, we utilized correlation matrices
and visualizations to highlight significant trends. These insights informed the selection
of appropriate predictive models. Techniques such as regression analysis and time se-
ries forecasting were employed to analyze the impact of rising living costs on supply
chain dynamics. Relevant equations and algorithms were applied to ensure robust and
interpretable results.




                                           8
5     Results and Discussion
5.1    Correlational Insights
To investigate the relationships between cost of living and supply chain metrics, we
analyzed the correlations among three representative variables: Consumer Price Index
(CPI), Exports, and Imports. Three correlation methods were employed: Basic Corre-
lation (ignoring panel structure), Within-Country Correlation (controlling for country-
specific effects), and Between-Country Correlation (controlling for time-specific effects).
The analysis revealed a negative correlation between CPI and both Exports and Imports,
suggesting that as the cost of living increases, supply chain stability diminishes. These
findings were further supported by tables and visualizations, highlighting the broader
implications of rising living costs on global trade dynamics.

5.2    Model Outputs
The results of our predictive models align with the observed correlation trends. The
regression and time series models consistently demonstrated that higher CPI levels are
associated with declining export and import volumes. These outputs provide strong
evidence of the adverse effects of rising costs on supply chain functionality. Graphs and
charts illustrating these trends are included for reference, showcasing the predictive power
of the models in capturing these dynamics.

5.3    Interpretation
The findings indicate significant challenges for businesses and policymakers. For busi-
nesses, rising costs of living may reduce international trade volumes, forcing organizations
to reconsider their supply chain strategies to maintain resilience and stability. Policy-
makers are encouraged to address inflationary pressures and trade barriers to mitigate
these effects and support economic stability. These insights can guide both sectors in
adapting to the economic shifts driven by the increasing cost of living.




                                             9
6     Recommendations
6.1    Business Strategies
To adapt to the challenges posed by rising living costs, businesses should implement the
following strategies to ensure supply chain resilience and maintain consumer demand:

    • Adopt Direct-to-Consumer (DTC) Models: Streamlining operations by elim-
      inating intermediaries can help businesses reduce costs and offer more competitive
      pricing. Companies like Temu have successfully leveraged this model to maintain
      affordability for consumers.

    • Enhance Supply Chain Agility: Businesses should focus on building more flex-
      ible supply chains capable of quickly responding to shifts in consumer demand,
      particularly toward essential goods and services.

    • Localize Manufacturing and Sourcing: Establishing production closer to key
      markets, such as in North America or Europe, can help reduce tariffs and shipping
      costs while improving supply chain efficiency.

    • Invest in Technology and Infrastructure: Leveraging high-tech solutions, such
      as AI-driven demand forecasting and automation, can optimize supply chain oper-
      ations and reduce costs.

    • Diversify Product Offerings: Expanding product portfolios to include essential
      goods or affordable alternatives can help businesses capture market share during
      periods of economic uncertainty.

6.2    Policy Suggestions
Policymakers play a crucial role in mitigating the impact of rising costs on supply chains
and consumers. The following recommendations aim to address systemic challenges:

    • Combat Inflation: Implement monetary and fiscal policies aimed at reducing
      inflationary pressures to stabilize costs for both businesses and consumers.

    • Support Domestic Manufacturing: Provide incentives for localized production,
      such as tax benefits or subsidies, to reduce dependency on global supply chains and
      improve national resilience.

    • Streamline Trade Regulations: Simplify customs processes and reduce trade
      barriers to minimize delays and costs associated with importing and exporting
      goods.

    • Invest in Logistics Infrastructure: Enhance transportation and logistics in-
      frastructure to ensure efficient supply chain operations, particularly in regions with
      high demand.

    • Encourage Workforce Development: Support education and training programs
      to ensure a skilled labor force, which is critical for maintaining production and
      supply chain stability.


                                             10
7    Conclusion
This report highlights the intricate relationships between rising costs of living and supply
chain dynamics. Our analysis underscores that increased living costs negatively impact
supply chain stability, as evidenced by declining export and import volumes. These trends
demand urgent attention from both businesses and policymakers.
    Through correlation analysis, predictive modeling, and robust data visualizations, we
have identified actionable strategies for businesses to adapt to these challenges, such as
adopting direct-to-consumer models, localizing manufacturing, and leveraging technology.
Similarly, policymakers must focus on stabilizing inflation, simplifying trade regulations,
and investing in infrastructure to support resilient supply chains.
    In conclusion, addressing the economic and supply chain challenges posed by rising
living costs requires a collaborative effort between the public and private sectors. By
implementing the recommendations outlined in this report, stakeholders can mitigate the
adverse effects of cost-of-living increases and foster a more stable and equitable economic
environment.




                                            11
Appendix
A   CPI Over Time - Top 10 Countries




        Figure 1: CPI (2010=100) Over Time for Top 10 Countries




                                  12
B    Household Consumption Per Capita Growth Over
     Time - Top 10 Countries




Figure 2: Household Consumption Per Capita Growth Over Time for Top 10 Countries




                                      13
C     Household Consumption as % of GDP Over Time
      - Top 10 Countries




    Figure 3: Household Consumption as % of GDP Over Time for Top 10 Countries




                                       14
D   Inflation Over Time - Top 10 Countries




          Figure 4: Inflation Over Time for Top 10 Countries




                                 15
E   Year-Over-Year % Change in CPI (All Countries)




    Figure 5: Year-Over-Year % Change in CPI (2010=100) for All Countries




                                     16
F   Year-Over-Year % Change in CPI (Excluding Spe-
    cific Countries)




Figure 6: Year-Over-Year % Change in CPI (2010=100) Excluding Specific Countries




                                      17
