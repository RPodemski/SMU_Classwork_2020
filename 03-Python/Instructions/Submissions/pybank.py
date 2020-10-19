import csv
import numpy as np

bankInfo = r"Resources\budget_data.csv"

tMonths = 0
tProfitsLosses = 0

firstRow = True
lastRowPL = 0
changeD = {}

with open(bankInfo, "r") as csvfile:
    bankReader = csv.reader(csvfile, delimiter=",")
    bankHeader = next(bankReader)
    #print(bankHeader)

    
    #total number of months
    #total amount of profits/losses
    for row in bankReader:

        tMonths += 1
        tProfitsLosses += int(row[1])

        if firstRow:
            lastRowPL = int(row[1])
            firstRow = False
        else:
            change = int(row[1]) - lastRowPL
            changeD[row[0]] = change
            lastRowPL = int(row[1])

#rounded average change in profts/losses
avgChange = np.mean(list(changeD.values()))
roundedAvgChange = round(avgChange, 2)

#greatest increase in proftis
#greatest decrease in losses
maxChangeMon = max(changeD, key=changeD.get)
maxChangePL = changeD[maxChangeMon]
minChangeMon = min(changeD, key=changeD.get)
minChangePL = changeD[maxChangeMon]
    

summaryBank = f"""Financial Analysis
----------------------------
Total Months: {tMonths}
Total: $ {tProfitsLosses}
Average  Change: ${roundedAvgChange}
Greatest Increase in Profits: {maxChangeMon} (${maxChangePL})
Greatest Decrease in Profits: {minChangeMon} ($-{minChangePL})"""

#print(summaryBank)

with open("final_bank_results.txt", "w") as file1:
    file1.write(summaryBank)