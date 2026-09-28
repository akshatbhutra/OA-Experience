a = ['apple', 'banana', 'apple', 'orange', 'banana', 'banana']

freq = {}
for item in a:
    if item in freq:
        freq[item] += 1
    else:
        freq[item] = 1

print(freq)