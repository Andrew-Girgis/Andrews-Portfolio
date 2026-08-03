# EVStockPredict_Presentation

_Source: projects/EVStockPredict_Presentation.pdf_

Can we predict the future of the cars of the
  future: A study on predictors of EV car
        manufacturor stock returns
            ECON 623: Dinghai Xu


                Andrew Girgis
Introduction: Motivation - Literature review



    ▶ Passion for financial markets, automotives and the future of
      EV’s(Electric Vehicles)
    ▶ New territory: EV’s are making a large impact in the market
      currently with many bills being passed banning production of
      combustion engines in certain years, forcing many large
      automotive companies to adopt the BEV(Battery Electric
      Vehicles) model.
    ▶ Can the returns of these new EV startups be predicted using
      complementary and substitutionary commodities and goods?
Introduction: Motivation - Literature review


    ▶ Shen, J., Griffith, J., Najand, M., & Sun, L. (2021).
      Predicting stock and bond market returns with emotions:
      Evidence from futures markets. Journal of Behavioral Finance,
      24(3), 333–344.
      https://doi.org/10.1080/15427560.2021.1975717 (Shen et al.
      2021)
    ▶ Li, T., & Sun, X. (2023). Predicting stock market returns
      using aggregate credit risk. International Review of Economics
      & Finance, 88, 1087–1103.
      https://doi.org/10.1016/j.iref.2023.07.039 (Li and Sun 2023)
Introduction: Motivation - Literature review



    ▶ Cai, Y., & Stander, J. (2019). The threshold GARCH model:
      Estimation and density forecasting for financial returns*.
      Journal of Financial Econometrics, 18(2), 395–424.
      https://doi.org/10.1093/jjfinec/nbz014 (Cai and Stander
      2019)
    ▶ Hansen, P. R., & Lunde, A. (2001). A forecast comparison of
      volatility models: Does anything beat a GARCH(1,1)? SSRN
      Electronic Journal. https://doi.org/10.2139/ssrn.264571
      (Hansen and Lunde 2001)
Data - Theory - Model

                          Logged Adjusted Close of Independants on Year
                    7.5

                                                                             Companies
                    5.0                                                         FF




   Log Adj Close
                                                                                Fisker

                    2.5                                                         Lucid
                                                                                Nio

                    0.0                                                         Rivian
                                                                                Tesla

                   −2.5
                           2022−01   2022−07   2023−01   2023−07   2024−01
                                                 Year

   Figure 1: Line plot of the Log Adjusted Close prices of the EV stocks we
   will be predicting
Data - Theory - Model

                       Logged Adjusted Close of Dependants on Year

                   4
                                                                          Companies




   Log Adj Close
                                                                             Blink
                   3
                                                                             Chargepoint
                                                                             Crude
                   2
                                                                             Gasoline
                                                                             LitBat
                   1


                        2022−01   2022−07   2023−01   2023−07   2024−01
                                              Year

   Figure 2: Line plot of the Log Adjusted Close prices of the Dependants
   we will be using as predictors
Data - Theory - Model
                    Histogram of Lucid Returns
                                            Histogram of Tesla Returns
                                                                    Histogram of Rivian Return
                                                                                                   60
               50                                           80
               40



   Frequency                                    Frequency                              Frequency
                                                            60                                     40
               30
                                                            40
               20                                                                                  20
               10                                           20

               0                                            0                                      0
                    −20       0       20                         −10 −5   0   5   10                    −30 −20 −10   0   10
                          Returns                                    Returns                                  Returns

                    Histogram of Nio Returns

               60




   Frequency
               40


               20


               0
                    −20 −10       0   10   20
                          Returns
Data - Theory - Model


                    Histogram of FF Returns

               30




   Frequency
               20



               10



               0
                     −60            −30              0              30
                                                Returns

                           Figure 4: Histogram of Faraday Future returns
Data - Theory - Model


                    Histogram of Fisker Returns



               40



   Frequency
               20




               0
                      −75            −50            −25            0    25
                                                  Returns

                                Figure 5: Histogram of Fisker returns
Data - Theory - Model
                        Histogram of Crude Returns
                                               Histogram of Gasoline Returns
                                                                      Histogram of LitBat Retur
                                                                 150                                            120

                                                                                                                90



   Frequency                                         Frequency                                      Frequency
               100                                               100
                                                                                                                60
               50                                                50
                                                                                                                30

                    0                                                 0                                           0
                        −8    −4    0       4                             −8    −4   0     4                          −4     0       4   8
                               Returns                                          Returns                                    Returns

                    Histogram of ChargepointHistogram
                                             Returns of Blink Returns
               60                                                60




   Frequency                                         Frequency
               40                                                40


               20                                                20


               0                                                 0
                        −40   −20       0       20                        −10    0   10   20   30
                              Returns                                           Returns
Data - Theory - Model

      Panel A     FF        Fisker    Lucid    Nio      Rivian    Tesla
         mean     -1.65     -1.17     -0.51    -0.37    -0.41     -0.14
      variance    115.87    65.16     26.16    24.63    27.34     14.14
     skewness     0.30      -5.83     0.51     0.37     -0.45     -0.24
      kurtosis    7.47      71.99     8.47     4.86     6.45      3.97
      Panel B     FF        Fisker    Lucid    Nio      Rivian    Tesla
            FF    1.00
        Fisker    0.21      1.00
         Lucid    0.25      0.38      1.00
           Nio    0.26      0.30      0.54     1.00
        Rivian    0.16      0.35      0.67     0.56     1.00
         Tesla    0.21      0.27      0.56     0.52     0.56      1.00
    Table 1: Descriptive statistics & correlations of returns of EV stocks
Data - Theory - Model

       Panel A      Crude     Gasoline    LitBat    Chargepoint     Blink
          mean      0.05      0.05        -0.12     -0.45           -0.44
       variance     3.05      2.93        3.83      28.82           25.90
      skewness      -0.42     -0.48       0.094     -0.60           0.63
        kurtosis    3.67      4.20        3.28      10.21           5.37
       Panel B      Crude     Gasoline    LitBat    Chargepoint     Blink
          Crude     1.00
       Gasoline     0.94      1.00
         LitBat     0.17      0.19        1.00
    Chargepoint     0.01      0.03        0.49      1.00
          Blink     0.04      0.04        0.50      0.67            1.00
    Table 2: Descriptive statistics & correlations of returns of Dependants
Data - Theory - Model


    ▶ GARCH(1,1)

  Mean Equation:


                              rt = µ + ϵt
  Where:
  - rt is the observed return at time t.
  - µ is the intercept term or the conditional mean of the return.
  - ϵt is the error term, assumed to be normally distributed with
  mean 0.
Data - Theory - Model

  Variance Equation (GARCH(1,1) with External Regressor):


                   σt2 = ω + α1 ϵ2t−1 β1 σt−1
                                          2
                                              + γXt−1
  Where:
     2
  - σt−1  is the conditional variance of the return at time t.
  - ω is the intercept term.
  - α1 is the parameter associated with the lagged squared error
  term, representing the ARCH effect.
  - β1 is the parameter associated with the lagged conditional
  variance, representing the GARCH effect.
  - Xt−1 is the external regressor, representing the lagged returns of
  the Lithium Battery stock returns.
  - γ is the parameter associated with the external regressor.
Data - Theory - Model


    ▶ VAR(1)

                                                
           Y1,t     A11 A12 . . .   A1n Y1,t−1
         Y2,t  A21 A22 . . .     A2n 
                                         Y2,t−1 
                                              
          . = .       ..          ..   .. 
          .   .           ..          
          .   .        .     .     .  . 
                                                  
          Yn,t     An1 An2 . . .    Ann     Yn,t−1
                                                         
                                                 ε1,t
                       B11 B12   B13 X1,t−1        
                                                     ε     
                                                     2,t 
                   + B21  B22   B23  X2,t−1  +  . 
                                                
                                                    .. 
                                                           
                       B31 B32   B33 X3,t−1
                                                    εn,t
Data - Theory - Model


    ▶ VAR(1)

  where:
    ▶ Yt is a vector representing the returns of Rivian at time t,
    ▶ Xt−1 is a vector representing the lagged returns of the
      external regressors at time t − 1,
    ▶ A is a coefficient matrix capturing the lagged effects of Rivian
      returns,
    ▶ B is a coefficient matrix capturing the effects of lagged
      external regressors, and
    ▶ εt is a vector of error terms at time t.
Data - Theory - Model


  Finding optimal lags of our VAR model for Rivian returns.


              selection   criteria.1   criteria.2   criteria.3   criteria.4 ...
   AIC(n)             1        8.29         8.31         8.33         8.37 ...
    HQ(n)             1        8.35         8.42         8.49         8.57 ...
    SC(n)             1        8.44         8.59         8.73         8.89 ...
   FPE(n)             1    3982.78      4068.04      4151.32       4303.34...
  Table 3: Table depicting the optimal number of lags to use in our VAR
  model for Rivian returns
Data - Theory - Model


  Finding optimal lags of our VAR model for Tesla returns.


              selection   criteria.1   criteria.2   criteria.3   criteria.4 ...
   AIC(n)             1        7.65         7.67         7.69         7.71 ...
    HQ(n)             1        7.71         7.78         7.85         7.91 ...
    SC(n)             1        7.80         7.94         8.09         8.23 ...
   FPE(n)             1    2092.56      2139.35      2196.39      2220.36 ...
  Table 4: Table depicting the optimal number of lags to use in our VAR
  model for Tesla returns
Data - Theory - Model



  Inspecting the Granger Causality of our Rivian VAR model.

          Granger Causality Test             F-Test     p-value
          Rivian does not cause Gas         1.5337      0.2038
          Gas does not cause Rivian         1.8225      0.1409
          LitBat does not cause Rivian      0.90716     0.4368
          CP does not cause Rivian         0.039752     0.9894
        Table 5: Granger Causality Test Results for Rivian returns
Data - Theory - Model



  Inspecting the Granger Causality of our Tesla VAR model.

          Granger Causality Test             F-Test    p-value
          Tesla does not cause Gas          0.86932     0.4563
          Gas does not cause Tesla           2.0865    0.09996
          LitBat does not cause Tesla        1.8949     0.1283
          CP does not cause Tesla            1.5879     0.1903
         Table 6: Granger Causality Test Results for Tesla returns
Data - Theory - Model


            Model                        AIC       BIC
            ARMA(0,0) GARCH(1,1)         6.1424    6.1808*
            ARMA(1,0) GARCH(1,1)         6.1454    6.1916
            ARMA(0,1) GARCH(1,1)         6.1455    6.1916
            ARMA(1,1) GARCH(1,1)         6.1471    6.2009
            ARMA(0,0) GARCH(2,1)         6.1422*   6.1883
            ARMA(1,0) GARCH(2,1)         6.1453    6.1991
            ARMA(0,1) GARCH(2,1)         6.1453    6.1991
            ARMA(1,1) GARCH(2,1)         6.1473    6.2088
            ARMA(0,0) GARCH(2,2)         6.1829    6.2367
    Table 7: AIC and BIC of different GARCH models of Rivian returns
Data - Theory - Model


            Model                        AIC        BIC
            ARMA(0,0) GARCH(1,1)         5.4993     5.5381
            ARMA(1,0) GARCH(1,1)         5.5028     5.5493
            ARMA(0,1) GARCH(1,1)         5.5028     5.5493
            ARMA(1,1) GARCH(1,1)         5.5025     5.5568
            ARMA(0,0) GARCH(2,1)         5.4951     5.5416
            ARMA(1,0) GARCH(2,1)         5.4986     5.5528
            ARMA(0,1) GARCH(2,1)         5.4986     5.5528
            ARMA(1,1) GARCH(2,1)         5.4985     5.5605
            ARMA(0,0) GARCH(2,2)         5.4903*    5.5446*
     Table 8: AIC and BIC of different GARCH models of Tesla returns
Data - Theory - Model




  Due to the AIC and BIC of all models being not significantly
  different from one another I will choose to use the ARMA(0,0)
  GARCH(1,1) to use the best most simple model with the least
  extra variables in the model for both the Rivian returns and for the
  Tesla Returns.
Data Analysis
   VAR Forecasts


                          Forecast of Rivian returns

                     10




   Rivian Returns
                      0


                    −10


                    −20


                    −30
                           Jan                    Feb               Mar
                                                        Date

                          Figure 7: Forecast of Rivian returns with our VAR(1) model
Data Analysis



   The period from February 19 to February 26 in Rivian’s returns
   stands out due to a significant decline of approximately 30%. A
   closer examination on the news during that week revealed that this
   decline resulted from disappointing 2024 deliveries and earnings
   reported on February 23. It appears that market expectations were
   not met, leading to the observed decrease in returns. However, the
   subsequent rebound in returns might suggest that the initial sell-off
   reaction was perhaps exaggerated.
Data Analysis


                         Forecast of Tesla returns

                     5




   Tesla Returns
                     0



                   −5



                   −10



                          Jan                    Feb                Mar
                                                       Date

                          Figure 8: Forecast of Tesla returns with our VAR(1) model
Data Analysis




   The period from 2024-01-22 to 2024-01-28 is highlighted in Tesla’s
   returns due to a decline of approximately 12%. After reviewing the
   news of Tesla’s returns on January 25th 2024 I realized the reason
   for the decrease in the returns was a due to the company reporting
   earnings that missed expectations with warnings of a slowdown in
   2024. Again I believe the subsequent rebound in returns might
   suggest that the initial sell-off reaction was perhaps exaggerated.
Data Analysis




                                                Rivian        Tesla
           Forecasted Returns MAPE            79.7571     95.56485
           Forecasted Volatility MAPE        84.73849     166.2075
   Table 9: MAPE values for forecasts of returns and volatility for Rivian
   and Tesla
Conclusion - Future Research

   Upon reviewing the results presented in Table 9, it becomes
   evident that both the VAR and GARCH models exhibit noticeably
   high MAPE (Mean Absolute Percentage Error) values. This
   suggests that the forecasts generated by these models may lack
   accuracy. Furthermore, the observed high MAPE values indicate a
   potential lack of explanatory power in the returns of Gasoline,
   Lithium Battery, and EV Charger producer stocks. While the
   MAPE for the forecast of Rivian appears to be relatively decent,
   further research is warranted to ascertain whether this performance
   holds consistently over the entire lifetime of the stock.
   Additionally, it’s crucial to investigate whether this outcome is an
   isolated occurrence, given that the stock exhibited lower volatility
   during the forecast period compared to historical data.
Conclusion - Future Research
    ▶ Future research endeavors should aim to develop a
      VAR-GARCH model capable of leveraging stock volatility data
      to enhance the accuracy of return forecasts.
    ▶ Additionally, there is a need to refine the forecasting horizon
      to shorter periods, such as 1 or 2 days, and evaluate the
      model’s performance on a day-to-day basis to assess its
      precision with a more focused forecast.
    ▶ Exploring the potential explanatory power of the number of
      active EV car chargers in a region could be a valuable avenue
      for investigation. This aspect, not fully captured by stock
      returns alone, suggests the potential benefits of integrating
      geospatial data into the modeling framework. By
      incorporating real-time data on active EV chargers, it may be
      possible to better predict future returns, considering the
      influence of infrastructure development on consumer behavior
      towards electric vehicles.
Conclusion - Future Research

    ▶ Exploring the impact of the implementation of the Federal
      carbon tax on the returns of an EV startup stock is of
      particular interest. Although my analysis was constrained by
      the IPO timing of Rivian, focusing solely on stocks that
      debuted before the introduction of the Federal carbon tax
      would allow for a clearer examination of the policy’s influence
      on EV stock returns.
    ▶ Additionally, investigating the effects of the Federal rebate for
      EV cars presents another intriguing avenue for research. Given
      that this incentive encourages Canadians to purchase EVs, it
      is reasonable to anticipate a positive impact on the returns of
      relevant stocks. Exploring this relationship further could
      provide valuable insights into the dynamics between
      government policies and EV market performance.
Questions
References I


   Cai, Yuzhi, and Julian Stander. 2019. “The Threshold GARCH
      Model: Estimation and Density Forecasting for Financial
      Returns*.” Journal of Financial Econometrics 18 (2): 395–424.
      https://doi.org/10.1093/jjfinec/nbz014.
   Hansen, Peter Reinhard, and Asger Lunde. 2001. “A Forecast
      Comparison of Volatility Models: Does Anything Beat a
      GARCH(1,1)?” SSRN Electronic Journal.
      https://doi.org/10.2139/ssrn.264571.
   Li, Tangrong, and Xuchu Sun. 2023. “Predicting Stock Market
       Returns Using Aggregate Credit Risk.” International Review of
       Economics &Amp; Finance 88 (November): 1087–1103.
       https://doi.org/10.1016/j.iref.2023.07.039.
References II




   Shen, Jiancheng, John Griffith, Mohammad Najand, and Licheng
      Sun. 2021. “Predicting Stock and Bond Market Returns with
      Emotions: Evidence from Futures Markets.” Journal of
      Behavioral Finance 24 (3): 333–44.
      https://doi.org/10.1080/15427560.2021.1975717.
