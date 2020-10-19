import csv

pollingInfo = r"Resources\election_data.csv"

candidateD = {}
votes = 0

with open (pollingInfo,"r") as csvfile:
    pollingRead = csv.reader(csvfile, delimiter=',')
    pollingHeader = next(pollingRead)
    #print(f"pollingHeader: {pollingHeader}")

    #total number of votes
    for row in pollingRead:
        votes += 1

        #list of candidates
        candidate =row[2]

        if candidate in candidateD.keys():
            candidateD[candidate] += 1
        else:
            candidateD[candidate] = 1
candWin = max(candidateD, key=candidateD.get)

#percentage of votes for each candidate
percentD = {}

for key in candidateD.keys():
    percentage = candidateD[key]/votes
    percentD[key] = percentage
#print(percentD)

#winner based on popular vote

votePerCand = []
for key in percentD.keys():
    listOfCand = key + ": " + str(round(percentD[key] * 100, 2)) + "% (" + str(candidateD[key]) + ")"
    votePerCand.append(listOfCand)
#print(votePerCand)

#https://stackoverflow.com/questions/14560863/python-join-with-newline
newLineCand= "\n".join(votePerCand)

summary = f"""Election Results
-------------------------
Total Votes: {votes}
-------------------------
{newLineCand}
-------------------------
Winner: {candWin}
-------------------------"""
#print(summary)
with open("final_poll_results.txt", "w") as file1:
    file1.write(summary)
