import numpy as np




mylist = [10, [1, 2, 3], 8, 5.7, [45,[10, 20, 30]],['Ram','Shayma']]




def flatten(mylist):
    new_list=[]
    for i in mylist:
        if isinstance(i,list):
            new_list.extend(i)
        else:
            new_list.append(i)
    return new_list

print(flatten(mylist))