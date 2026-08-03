# PSCI_637_Final_Reportv2

_Source: projects/PSCI_637_Final_Reportv2.pdf_

PSCI 637 – LEARNED Behavior
      Adrian Safati - 20353463
      Andrew Girgis - 21108082
    Sanjhanaa Shankar - 21077720
           December 2023




                 1
Contents
1 Summary                                                                      3

2 Data Analysis                                                                3

3 Machine Learning Models                                                      6
  3.1 Support Vector Regression . . . . . . . . . . . . . . . . . . . . . .    6
  3.2 Neural Network . . . . . . . . . . . . . . . . . . . . . . . . . . . .   6
  3.3 Random Forest Regression . . . . . . . . . . . . . . . . . . . . . .     6
  3.4 Extreme Gradient Boosting (XGB) Regression . . . . . . . . . .           7
  3.5 Mixed Effects Model . . . . . . . . . . . . . . . . . . . . . . . . .    7
  3.6 Comparative analysis . . . . . . . . . . . . . . . . . . . . . . . . .   8

4 Conclusion                                                                   8
  4.1 Technological Solution . . . . . . . . . . . . . . . . . . . . . . . .   8
  4.2 Social Media . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   8
  4.3 Policy adjustments concerning assignment deadlines . . . . . . .         9




                                       2
1    Summary
Our objective is to examine the relationship between late night usage of the
LEARN platform of University of Waterloo and students’ academic perfor-
mance. To achieve this, we make use of 11 years of anonymized access logs
for LEARN (2011-2022) and binned end-of-term grades on a 1-20 scale for each
student. We use data visualization tools to identify significant relationships and
trends and employ predictive modelling approaches including machine learning
models to predict academic performance based on late night usage of LEARN.
Our findings indicate a negative correlation between late-night logins and aca-
demic grades. We propose a set of recommendations encompassing technological
interventions, social media engagement and adjustments to policies concerning
assignment deadlines.


2    Data Analysis

Figure 1: Bar Plot of the total time spent on Learn per time from Fall 2011 to
Fall 2022




In Figure 1, we visualize the average time students spent on Learn per term.
The y-axis is scaled, with 10,000 minutes roughly equating to ∼11 hours per
week for a 15-week academic term. There’s a clear upward trend in platform
usage over time. Notably, in the winter term of 2020, amidst the initial wave
of the COVID-19 pandemic, students spent less time on Learn as academic
requirements were relaxed. This trend continued into Spring 2020. However,
with the introduction of ”hybrid” learning in Fall 2020, there was a significant
uptick in platform usage. Instructors began incorporating lecture recordings
and linking to Zoom sessions, contributing to the observed increase.




                                        3
Figure 2: Bar Plot of the average number of times a student has logged into
Learn per term




   In Figure 2, we note a consistent distribution of average late-night logins
(between 2 am and 6 am) from 2012 to 2019. However, during the winter
term of 2020, coinciding with the onset of the COVID-19 pandemic, there is
a sharp decline in average late-night logins. Subsequently, in the fall term of
2020, as students adapted to full remote learning, there is a significant surge
in average late-night logins. This increase is attributed to the flexibility of
remote learning, allowing students to stay up later. Additionally, international
students, adhering to lectures scheduled between 2 am and 6 am in their local
time zones, contribute to this rise.




                                       4
   Using mixed effects modelling we can see the estimated marginal trends for
the effects of course load on end of term grades as well as how the interactions


                                       5
between late night usage and the percentage of time that students are online
during the night effects end of term grades. Course load is correlated with
increased grades as students who are struggling academically and those with
conflicting responsibilities take less classes. The effects of staying up late appear
especially pronounced in those for whom late night behavior is atypical, with
each late-night session corresponding with a .75% drop in the GPA of this group.


3     Machine Learning Models
3.1    Support Vector Regression
SVR, or Support Vector Regression, is a supervised machine learning algorithm
extending the Support Vector Machine (SVM). Unlike SVM’s focus on class
separation, SVR is tailored for regression tasks, predicting continuous values. It
introduces an ϵ-insensitive region around the function (Awad & Khanna, 2015),
enabling the model to prioritize minimizing errors within a specified tolerance.
This ensures a robust approach to regression problems.

                                  M AE : 0.8851
                                 RM SE : 1.1553
                                    R2 : 0.5588

3.2    Neural Network
A neural network comprises input, hidden, and output layers. Nodes pro-
cess weighted inputs, apply activation functions, and yield outputs. In our
regression-focused neural network model, we initialize three hidden layers, each
with 100 nodes, using the ReLU activation function. This enhances the model’s
ability to capture intricate data relationships

                                  M AE = 0.9046
                                 RM SE = 1.1630
                                    R2 = 0.552

3.3    Random Forest Regression
Random forest is an ensemble method that consists of a collection of multiple
decision trees that work together to arrive at the final decision or outcome.
Hence, random forests are more effective and robust than a single decision tree.

                                  M AE = 1.081
                                  RM SE = 1.52
                                     R2 = 0.44


                                         6
3.4   Extreme Gradient Boosting (XGB) Regression
XGB is a type of ensemble machine learning method that uses weaker decision
trees to build a strong predictive model. Each new decision tree corrects the
errors of the previous tree. It is known for its speed and robustness when it
comes to large datasets.

                               M AE = 1.078


                               RM SE = 1.51


                                  R2 = 0.44

3.5   Mixed Effects Model
To try something a little different we tried integrating machine learning with
mixed effects models. We used random forest regression to estimate the fixed
effects component of a model, and GPBoost a tree ensemble library to train the
random effects component of another model. While our use of GPBoost allowed
us to examine the importance of features and interactions between features,
neither of these modelling approaches had very strong predictive power.




                                      7
               Model                MAE     RMSE      R squared
               SVR                  0.89     1.16        0.56
               Neural Network       0.90     1.16        0.55
               Random Forest        1.080    1.52        0.44
               XGB                  1.078    1.51        0.44
               Random forest II      1.64    2.17        0.10
               GPBoost               1.23    1.74        0.42

              Table 1: Performance Metrics of Different Models


3.6    Comparative analysis
The comparative analysis of various machine learning models, as shown in Table
1, reveals that the Support Vector Regression (SVR) model outperforms other
models in key performance metrics. Specifically, SVR demonstrates a lower
Mean Absolute Error (MAE) of 0.89 and Root Mean Squared Error (RMSE)
of 1.16, coupled with a higher R2 value of 0.56. These metrics indicate that
the SVR model provides a more accurate and precise prediction of the target
variable compared to alternative models. Given its superior performance, we
have chosen the SVR model as the most suitable algorithm for addressing the
research problem at hand, aiming to optimize predictive accuracy and enhance
the overall effectiveness of our regression model.


4     Conclusion
4.1    Technological Solution
Our analysis uncovered adverse effects of late-night study sessions on academic
performance, highlighting the link between poor sleep habits and outcomes. To
enhance student well-being, we recommend policymakers implement an Auto-
mated Gentle Warnings System on Learn. This automated system issues gentle
warnings to students logging in during late-night hours, utilizing a machine
learning algorithm that learns individual study behaviors. By recognizing pat-
terns and aligning with natural circadian rhythms, the system aims to mitigate
negative effects, promote healthier study habits, and optimize the overall learn-
ing experience on the Learn platform.

4.2    Social Media
We propose using the influence of social media platforms to share reminders
with students emphasizing the benefits of healthy sleeping habits. Insights from
existing research can also be shared highlighting the direct positive impact of
adequate sleep on students’ academic performance. These suggestions, imple-
mented by means of visually appealing and engaging content, will help promote
awareness among students and reinforce positive behavioral change.



                                       8
4.3    Policy adjustments concerning assignment deadlines
We advocate for a student-centric approach that recognizes the diverse sched-
ules and responsibilities individuals may have. Emphasizing mental well-being,
we propose the incorporation of small incentives (like a 1% bonus mark) to
encourage students to set self-imposed deadlines that align with their optimal
productivity times(Ariely & Wertenbroch, 2002). This flexible approach ensures
that students with additional responsibilities are not penalized for completing
schoolwork during irregular hours, fostering an inclusive and supportive learning
environment that accommodates the diverse needs of our student body.




                                       9
References
Ariely, D., & Wertenbroch, K. (2002). Procrastination, deadlines, and perfor-
        mance: Self-control by precommitment. Psychological Science, 13 (3),
        219–224. https://doi.org/10.1111/1467-9280.00441
Awad, M., & Khanna, R. (2015). Support vector regression. In Efficient learning
        machines: Theories, concepts, and applications for engineers and system
        designers (pp. 67–80). Apress. https://doi.org/10.1007/978- 1- 4302-
        5990-9 4




                                      10
