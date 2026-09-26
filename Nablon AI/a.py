The issue with your function stems from using a mutable default argument (extended_list=[]). In Python, default arguments are evaluated only once when the function is defined, not every time the function is called. This means the same list instance is reused across multiple function calls, leading to unexpected behavior where data accumulates.❌ The Problem Codepythondef extend(value, extended_list=[]):
    extended_list.append(value)
    return extended_list

print(extend(1))  # Output: [1]
print(extend(2))  # Output: [1, 2] (Expected)
Use code with caution.The Fixed CodeTo fix this, use None as the default value and instantiate a new list inside the function if no list is provided.pythondef extend(value, extended_list=None):
    if extended_list is None:
        extended_list = []
    extended_list.append(value)
    return extended_list

print(extend(1))  # Output: [1]
print(extend(2))  # Output: [2]
Use code with caution.Why this worksNone is immutable, so it is safe to use as a default argument.The expression extended_list = [] executes inside the function scope, ensuring a brand new list is created on every call where extended_list isn't explicitly provided.