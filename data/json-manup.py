import json

duplicate = 0


#Duplicate Check
# with open('json.json') as json_file:
#     data = json.load(json_file)
#     leng = len(data)
#     for ind, dat in enumerate(data):
#         _id = dat['_id']
#         for i in range(ind+1, leng):
#         	if _id == data[i]['_id']:
#         		duplicate+=1

# Tweet Count
with open('json.json') as json_file:
    data = json.load(json_file)
    for dat in data:
        user = dat['_source']['username']
        users[user] = users.get(user, 0)+1

print ({k: v for k, v in sorted(users.items(), key=lambda item: item[1])})

# print (users)