# import csv
import pandas as pd

data = pd.read_csv('DataSetSymptoms.csv')

symptoms = data.iloc[2:0]
# test = symptoms(1)
print(test)
# print(symptoms)

# with open('DataSetSymptoms.csv', 'r') as csv_file:
#     csv_reader = csv.reader(csv_file)
#     # csv_reader = csv.DictReader(csv_file)

#     # print(csv_reader)
#     for row in csv_reader:
#         print(row[1:0])
