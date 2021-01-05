# import csv

# with open('DataSetSymptoms.csv', 'r') as csv_file:
#     csv_reader = csv.reader(csv_file)
#     # csv_reader = csv.DictReader(csv_file)

#     # print(csv_reader)
#     for row in csv_reader:
#         print(row[1:])

f = open('symptomsList.txt', 'r')
for x in f:
    print(x[:])

# print(f.readline())
# print(f.readline())