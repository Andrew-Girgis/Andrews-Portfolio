# ECON607 Assignment 4

_Source: projects/ECON607 Assignment 4.pdf_

ECON 607 Assignment 4
     Andrew Girgis
      October 2023




           1
Contents
1 Neural Networks and Machine Learning                                          4
  1.1 What is Machine Learning? . . . . . . . . . . . . . . . . . . . . .       4
      1.1.1 Supervised Learning . . . . . . . . . . . . . . . . . . . . .       4
      1.1.2 Unsupervised Learning . . . . . . . . . . . . . . . . . . . .       4
      1.1.3 Reinforcement Learning . . . . . . . . . . . . . . . . . . .        4
  1.2 What are Neural Networks? . . . . . . . . . . . . . . . . . . . . .       4
  1.3 3457th image in the test dataset . . . . . . . . . . . . . . . . . .      6

2 Impact of COVID on circular fashion                                           8
  2.1 Considering the circular economy for second-hand clothing, how
      did the COVID-19 pandemic impact Canadian exports? . . . . .               8
  2.2 How did the pandemic impact domestic demand for pre-loved
      textiles in Canada? . . . . . . . . . . . . . . . . . . . . . . . . . .    9
  2.3 How can machine learning help clothing brands reduce excess
      inventory resulting from their in-store buy-back programs? . . .          11

3 Code                                                                          13




                                        2
List of Figures
  1   Visual representation of a neural network . . . . . . . . . . . . .        5
  2   Code used for prediction and output . . . . . . . . . . . . . . . .        6
  3   3457th image in the test dataset . . . . . . . . . . . . . . . . . .       7
  4   Labeled training dataset . . . . . . . . . . . . . . . . . . . . . . .     7
  5   Line chart of Canadian merchandise exports (Statistics Canada,
      2023a) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    9
  6   Line chart of Canadian household consumption on clothing and
      footwear (Statistics Canada, 2023b) . . . . . . . . . . . . . . . .        10
  7   Monthly e-commerce sales vs in-store . . . . . . . . . . . . . . .         10




                                       3
1       Neural Networks and Machine Learning
1.1     What is Machine Learning?
Machine Learning is a branch of Artificial Intelligence (AI) that uses data and
computer algorithms to mimic human learning gradually improving accuracy.
Machine Learning is an important part of data science. Through the use of
statistical methods, algorithms are trained to make classifications or predictions,
and to uncover key insights in data projects (“What is machine learning?”, n.d.).
There are three main branches of machine learning;

    1. Supervised Learning
    2. Unsupervised Learning
    3. Reinforcement Learning

1.1.1    Supervised Learning
Lets start by talking about supervised learning. Supervised learning is a method
of machine learning in which the algorithm is given past labeled data with
outputs, the algorithm then learns the input output pairs to shift the model to
create outputs as accurate as possible.

1.1.2    Unsupervised Learning
Next is unsupervised learning. While with supervised learning you are providing
the algorithm with a labeled data set, unsupervised learning does not use a
labeled data set but instead looks for less obvious patterns within the data.

1.1.3    Reinforcement Learning
Finally there is reinforcement learning. Reinforcement learning algorithm learns
by interacting with its environment and getting a positive or negative reward.
Common algorithms include temporal difference, deep adversarial networks, and
Q-learning (“3 Types of Machine Learning You Should Know”, n.d.).

1.2     What are Neural Networks?
Neural networks are a subset of Machine learning. They are inspired by the way
human brain neurons signal to one another. Neural networks or artificial neural
networks (ANNs) are comprised of a node layers, containing an input layer, one
or more hidden layers, and an output layer (“What are neural networks?”, n.d.).
See Figure 1 for a visual depiction of the layers in a neural network.




                                        4
              Figure 1: Visual representation of a neural network




    In figure 1the first layer is the layer in which inputs are entered. There are
2 internals layers which are also called hidden layers, and one last layer that
contains all the possible outputs(Arnx, 2019). Neural networks use training
data to learn and improve their model and output accuracy over time. Each
node acts as its own linear regression model with input data, weights, a bias,
and an output. The formula looks something like this:
               X
                   wi xi + bias = w1 x1 + w2 x2 + ... + wn xn + bias           (1)

Where the output is:
                           P                            P
            f (x) = 1 if       w1 x1 + bias ≥ 0; 0 if       w1 x1 + bias < 0
   One thing to notice about this equation is that the output is binary 0 or 1.
This output informs us what decision to make. For example if we are trying to
make a decision whether to go out(1) or to stay in and study(0) we would give
an input of some variables x:
  1. x1 : Is there homework to do? (Yes:0, No:1)
  2. x2 : Are friends going out? (Yes:1, No:0)

  3. x3 : Will it cost over $40 (Yes:0, No:1)
With some weights to determine the importance of each variable.
  1. w1 : 7, since it is very important to make sure you dont have outstanding
     homework before going out.

  2. w2 : 4, since friends going out aswell makes it more appealing to go out.
  3. w3 : 2, since the cost of going out is an important detail however it wont
     make or break a night out.




                                            5
Then we assign a bias to the equation. This is the threshold for whether we go
out or not, if the number given by the formula is greater than or equal to the
bias then we will go out and if the number given by the formula is less than
the threshold we will stay in. Lets assume a bias of -5 and lets say we have a
scenario where;

  1. x1 = 0 since we have homework to do
  2. x2 = 1 since our friends are going out
  3. x3 = 0 since the plan is to go to a pricey restaurant and get drinks
   In this case we have the equation:

                 Ŷ = (0 · 7) + (1 · 4) + (0 · 2) − 5 = 4 − 5 = −1
   Therefore since the formula gives us a number that is less than 0 we say the
output is 0 thus based on these weights and circumstances the decision is to
stay home and study. This is a simple example of how a neural network makes
decisions.

1.3    3457th image in the test dataset
In this assignment we are using supervised learning machine learning algorithm
to train the model to classify the articles of clothing. We do this by first pro-
viding it with a labeled training data set to learn from. We then set up the
layers of the neural network using keras in the Tensorflow library. After we set
up the layers we then compile and train the model using the training dataset.
Finally, we evaluate the model to see how accurately the model performs on the
test dataset. Since python is a 0 based index language, which means the arrays
start counting from 0, to look for the first item we will output the 0th item in
our predictions model. Therefore to look for the 3457th image in the dataset I
used the code seen in figure 2 then input the number 3456 to find the prediction
of the 3457th image.


                Figure 2: Code used for prediction and output




                                        6
   As we can see in the output of the code in figure 2 the predicted is equal
to the actual which tells us that the prediction is correct. To confirm this I
plot the figure of the 3457th image(seen in figure 3) to confirm it matches with
the labeled dataset(seen in figure 4). Since the image produced from plotting
image 3457 and the image linked to pullover in the training dataset are the
same article of clothing, I can confidently say that the prediction made by the
machine learning algorithm is correct.


                  Figure 3: 3457th image in the test dataset




                      Figure 4: Labeled training dataset




                                       7
2     Impact of COVID on circular fashion
2.1    Considering the circular economy for second-hand cloth-
       ing, how did the COVID-19 pandemic impact Cana-
       dian exports?
The COVID-19 pandemic had a significant impact on the global economy, in-
cluding the trade of clothing in Canada. The value of Canadian merchandise
exports decreased close to 34% between February and April 2020 (Scarffe, 2022).
After this decrease in merchandise exports, Canada recovered half of their value
by June 2020 and were above 2019 average levels by January 2021. As seen
in figure 5, since 2009 Canadian merchandise exports were on a steady incline
until 2019 where we see a steep decrease in the dollars of Canadian merchan-
dise goods exported until 2020 where we then see a very steep increase from
2021 to 2022. Based on this graph we can see that the pandemic had a strong
initial decrease in Canadian merchandise exports where exports in dollars de-
creases from approximately 600 billion dollars to 525 billion dollars. However
2 years after the pandemic started in mid 2020 Canadian merchandise exports
made a strong recovery increasing from 525 billion dollars to 775 billion dollars
from 2020 to 2022. The sharp decrease in exports due to the pandemic would
have had a negative impact on the circular economy for second-hand clothing
since the clothing production factories slowed down due to closures and lack
of workers once the pandemic started. Along with this, circular economy store
closures also played a negative role in promoting circular fashion. Based on
Salvation Army’s Consolidated Financial statements for the years 2019-2020
”A significant decline was experienced by capital markets in March 2020 as a
result to the COVID-19 pandemic; however, as of mid July 2020 as this re-
port was being finalized, the Army’s investments have fully recovered from the
losses”(“Consolidated Financial Statements Year ended March 2021”, 2021) and
in the Salvation Army’s Consolidated Financial statements for the years 2020-
2021 ”[...] a reduction in sales of donated goods from 161 million last year
to 107 million this year, as a result of store closures during the COVID-19
pandemic”(“Consolidated Financial Statements Year Ended March 31, 2022”,
2022). Therefore, overall the COVID-19 pandemic negatively impacted Cana-
dian exports between the years 2019 and 2020, however merchandise exports
made a strong recovery in the following years. The store closures and lack of
donated goods as a result of COVID-19 had a strong negative impact on the
economy of second hand clothing from 2019 till 2021 which has now, as of 2023
recovered ”The largest increase was in sale of donated goods, which increased
by 17.0%: sales rebounded in fiscal 2023 after several years of negative impacts
from the pandemic...” (“CONSOLIDATED FINANCIAL STATEMENTS Year
Ended March 31, 2023”, 2023).




                                       8
Figure 5: Line chart of Canadian merchandise exports (Statistics Canada,
2023a)




2.2    How did the pandemic impact domestic demand for
       pre-loved textiles in Canada?
The COVID-19 pandemic had various impacts on the domestic demand for pre-
loved textiles. On March 17th 2020, Canada ordered a state of emergency and
held a temporary lockdown for non essential businesses including retail and thrift
stores. This meant during the time of the temporary lockdown individuals were
urged to stay home and since stores were closed household weren’t shopping
as much as prior to the pandemic. A side effect of this was that households
were donating less clothes since individuals couldnt shop at the retail stores
to purchase new clothes then donate their old clothes. As we can see in the
line chart in figure 6, there was a sharp decrease in household consumption of
clothing and footwear in Q2 of 2020 which is exactly when Canada announced
the temporary lockdown. After the lockdown was lifted we can see a increase
in household consumption of clothing and footwear as it slowly grows back to
follow the trend from pre-pandemic. This decrease in consumption due to the
pandemic impacts domestic demand for second hand clothing negatively as not
only are individuals not donating as much while the thift stores are closed,
there was also a strong increase in online options and a large increase in online
consumption over the COVID-19 pandemic. As we can see from the figure
7 provided by (Zanzana & Martin, 2023) many households made the switch
to online shopping during the pandemic around April of 2020 and ended up
continuing to use online shopping even after the lockdown ended as we can see
from the e-commerce line in the graph still continues to trend upwards until


                                        9
July 2022. Therefore the COVID-19 pandemic overall had a negative impact
on the domestic demand for pre-loved textiles in Canada and as we can see
that household consumption ended up recovering back to the original trend
through a W shaped recovery, this recovery could be explained by the increase
in e-commerce sales.

Figure 6: Line chart of Canadian household consumption on clothing and
footwear (Statistics Canada, 2023b)




              Figure 7: Monthly e-commerce sales vs in-store




                                     10
2.3    How can machine learning help clothing brands re-
       duce excess inventory resulting from their in-store
       buy-back programs?
By incorporating machine learning into their operations, clothing brands can
better manage excess inventory generated by buy-back and resale programs.
Some ways that machine learning can assist in mitigating the excess inventory
problem is through personalized recommendations, quality control and market-
place insights.
    Firstly, one area where machine learning is already being widely used is in
marketing as it allows marketers to improve their decision-making by analyz-
ing large data sets and generating insights about the industry, market, societal
trends, and customer profiles. (Ahramovich, n.d.). Some big companies that are
already making use of machine learning algorithms to optimize their business
include Netflix using machine learning to personalize its content recommenda-
tions, Amazon using machine learning to suggest specific products to customers,
and Spotify using machine learning to curate personalized playlists for users. On
the same note clothing brands can use machine learning algorithms to analyze
datasets of users behaviours when shopping to optimize personal recommen-
dations for the user. For example if they notice that in September as fall is
close, more consumers are shopping for sweaters and jackets then they can use
machine learning to recommend personal recommendations of sweaters similar
to the clothing the user has viewed or bought beforehand. If the individual
purchased or viewed many graphic tees in the past it is likely the same user
would shop for a graphic sweater for the fall.
    Secondly, as demonstrated in the exercise performed in Section 1.3 machine
learning algorithms are capable of being given visual data with labels to learn
how to classify articles of clothing, a similar algorithm can be applied for quality
control of the clothing. Instead of having current employees or needing to hire
new employees to sort clothing that are in good condition versus the clothing
that aren’t in good condition machine learning algorithms can help assess the
condition of items returned through buy-back programs. They can automate
the evaluation process, separating items that can be resold in good condition
from those that may need refurbishing.
    Lastly, since machine learning algorithms has the ability to analyze very large
datasets of consumer behaviours. A machine learning algorithm can be imple-
mented to monitor the broader resale market, providing the clothing brands
with insights into trends, pricing, and demand for pre-loved items. Clothing
brands can then adjust their marketing strategies based on the information the
machine learning algorithm provides.
    In conclusion, machine learning is a versatile and practical tool with ap-
plications in business, finance, medical, and many other sectors. For clothing
brands, machine learning can be a invaluable tool that can help the brand en-
hance the profitability and sustainability of their circular economy initiatives.
Futhermore, it allows brands to provide more value to customers while also
contributing to the overall reduction of waste in the fashion industry.


                                        11
References
3 types of machine learning you should know. (n.d.). https://www.coursera.
         org/articles/types-of-machine-learning
Ahramovich, A. (n.d.). Machine learning in marketing: 10 use cases, exam-
         ples amp; tips. https : / / www . itransition . com / machine - learning /
         marketing#: ∼ :text=Machine%20learning%20enables%20marketers%
         20to,content%2C%20products%2C%20and%20services.
Arnx, A. (2019, August). First neural network for beginners explained (with
         code). https : / / towardsdatascience . com / first - neural - network - for -
         beginners-explained-with-code-4cfd37e06eaf
Consolidated financial statements year ended march 2021. (2021, March). https:
         / / salvationarmy. ca / wp - content / uploads / 2023 / 07 / ar consolidated -
         financial-statement 2022-23 Eng.pdf
Consolidated financial statements year ended march 31, 2022. (2022, March).
         https://salvationarmy.ca/wp-content/uploads/2023/07/ar consolidated-
         financial-statement 2022-23 Eng.pdf
Consolidated financial statements year ended march 31, 2023. (2023, March).
         https://salvationarmy.ca/wp-content/uploads/2023/07/ar consolidated-
         financial-statement 2022-23 Eng.pdf
Scarffe, C. (2022). Price or quantity effect? the impacts of the pandemic on
         canadian trade.
Statistics Canada, C. (2023a). Table 12-10-0011-01 international merchandise
         trade for all countries and by principal trading partners, monthly (x
         1,000,000)[data table]. https://www150.statcan.gc.ca/t1/tbl1/en/tv.
         action?pid=1210001101
Statistics Canada, C. (2023b, September). Table 36-10-0124-01 detailed house-
         hold final consumption expenditure, canada, quarterly. https://www150.
         statcan.gc.ca/t1/tbl1/en/tv.action?pid=3610012401
What are neural networks? (n.d.). https : / / www . ibm . com / topics / neural -
         networks
What is machine learning? (n.d.). https : / / www . ibm . com / topics / machine -
         learning
Zanzana, S., & Martin, J. (2023, February). This follow-up study investigates
         how e-commerce and in-store retail sales evolved beyond the early stages
         of the covid-19 pandemic and precedes the transition to the 2022 north
         american industry classification system (naics) in the retail trade indus-
         try. in 2022, retail e-commerce sales continued to remain elevated above
         pre-pandemic levels in some subsectors, while in others, the resumption
         of in-store operations led consumers and businesses to transition closer
         to pre-pandemic shopping preferences. https://www150.statcan.gc.ca/
         n1/pub/11-621-m/11-621-m2023002-eng.htm




                                         12
3   Code
Python Code

# %% [markdown]
# # ECON 607 Assignment 4

# %% [markdown]
# ## Import libraries

# %%
import __future__
print(__future__.all_feature_names)

from __future__ import absolute_import, division, print_function, unicode_literals

#tensorflow and keras
import tensorflow as tf
from tensorflow import keras

#helper libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas

# %% [markdown]
# ## Ensure tensorflow has been loaded corrently

# %%
print(tf.__version__)

# %% [markdown]
# ## Import the MNIST dataset

# %%
fashion_mnist = keras.datasets.fashion_mnist
(train_images, train_labels), (test_images, test_labels) = fashion_mnist.load_data()

# %% [markdown]
# ## Create labels

# %% [markdown]
# ### Classify the Image groups

# %%
class_names = [’T-shirt/top’, ’Trouser’, ’Pullover’, ’Dress’, ’Coat’, ’Sandal’, ’Shirt’, ’Sn


                                  13
# %% [markdown]
# ## Data Preprocessing

# %% [markdown]
# ### Inspect source Data

# %%
plt.figure()
plt.imshow(train_images[0])
plt.colorbar()
plt.grid(False)
plt.show()


# %% [markdown]
# ### Scale Pixel Values

# %%
train_images = train_images / 255.0
test_images = test_images / 255.0

# %% [markdown]
# ### Inspect Data

# %%
plt.figure(figsize=(10,10))
for i in range(0,25):
     plt.subplot(5,5,i+1)
     plt.xticks([])
     plt.yticks([])
     plt.grid(False)
     plt.imshow(train_images[i], cmap=plt.cm.binary)
     plt.xlabel(class_names[train_labels[i]])
plt.show()

# %% [markdown]
# ## Building the NN Model

# %% [markdown]
# ### Set up the model layers

# %%
model = keras.Sequential([
     keras.layers.Flatten(input_shape=(28, 28)),
     keras.layers.Dense(128, activation=’relu’),


                                14
     keras.layers.Dense(10, activation=’softmax’)
])

# %% [markdown]
# ### Compile the model

# %% [markdown]
# #### During the compile step the following are added:
# • Optimizer: how the model is updated based on the data it sees and
# its loss function
# <br>
# • Loss function: how accurate the model is during training
# <br>
# • Metrics: monitors the training and testing steps

# %%
model.compile(optimizer=’adam’,
              loss=’sparse_categorical_crossentropy’,
              metrics=[’accuracy’])

# %% [markdown]
# ### Train the model

# %%
model.fit(train_images, train_labels, epochs=10)

# %% [markdown]
# ### Evaluate the accuracy

# %% [markdown]
# #### Compare how the model performs on the test dataset
# • The accuracy of the test data is less than the training data
# <br>
# • Overfitting: The gap between training accuracy and test accuracy

# %%
test_acc = model.evaluate(test_images, test_labels, verbose=2)
print("Test Accuracy:", test_acc)

# %% [markdown]
# ### Evaluate the first item

# %%
predictions = model.predict(test_images)
print(predictions[0])
image_index = np.argmax(predictions[0])


                                15
print("Predicted:", image_index, "Actual:", test_labels[0])
print(class_names[image_index])

# %% [markdown]
# ### Question 1

# %%
plt.figure()
plt.imshow(test_images[3456])
plt.colorbar()
plt.grid(False)
plt.show()

# %%
predictions_Q1 = model.predict(test_images)
print(predictions_Q1[3456])
image_index = np.argmax(predictions[3456])
print("Predicted:", image_index, "Actual:", test_labels[3456])
print(class_names[image_index])

# %%

R code

library("readr")
library(ggplot2)

expdata = read.table("/Users/andrew/Downloads/UW courses/ECON 607/Assignment 4/expdata.csv",

exp_num = expdata$Exports/1000


plot(expdata$Year, exp_num)
lines(exp_num)

plot1 = ggplot() +
  geom_line(aes(y = exp_num, x = expdata$Year), data = expdata, color=’Red’) +
  scale_x_continuous(breaks = seq(2008, 2022, 2)) +
  theme(text=element_text(family = "Tahoma"))

plot1 + labs(title = "Canadian Merchandise Export data",
             x = "Year", y = "Dollars of goods exported in billions",
             caption = "Graph created in R using data from Statistics Canada 2023")




                                 16
