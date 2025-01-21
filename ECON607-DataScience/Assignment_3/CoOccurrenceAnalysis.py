import pandas as pd

# https://gephi.org/users/download/
# pandas
# scikit-learn

def Preprocessing(corpus):
    # Convert corpus (lines of comments) to an array of comments
    documentText = []
    corpus = corpus.splitlines()
    for row in corpus:
        documentText.append(row)      
    return documentText

def GenerateMatrix(cleanData, fileName):
    # sklearn countvectorizer
    from sklearn.feature_extraction.text import CountVectorizer
    # Convert a collection of text documents to a matrix of token counts
    cv = CountVectorizer(ngram_range=(1,1), stop_words = 'english', max_features=20)
    # matrix of token counts
    X = cv.fit_transform(cleanData)
    Xc = (X.T * X) # matrix manipulation
    Xc.setdiag(0) # set the diagonals to be zeroes as it's pointless to be 1
    names = cv.get_feature_names_out() # This are the entity names (i.e. keywords)
    df = pd.DataFrame(data = Xc.toarray(), columns = names, index = names)
    #print(df)
    print(fileName)
    df.to_csv(fileName)
    
def ProcessCorpus():
    fileName = "Assignment 3/PositiveCommentsMatrix.csv"
    with open (fileName, "r", encoding='unicode_escape') as myfile:
        data = myfile.read()
        cleanData = Preprocessing(data)
        GenerateMatrix(cleanData, "PositiveCommentsMatrix.csv")

    fileName = "Assignment 3/NegativeCommentsMatrix.csv"
    with open (fileName, "r", encoding='unicode_escape') as myfile:
        data = myfile.read()
        cleanData = Preprocessing(data)
        GenerateMatrix(cleanData, "NegativeCommentsMatrix.csv")

ProcessCorpus()

