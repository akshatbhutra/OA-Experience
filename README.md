# OA-Experience

24 August 2025 - Gave Online Assessement of SD-1 role at Wokelo AI. (CoderByte Platform)

Questions:

A) MCQ Questions

1. Python slicing syntax sequence[start:stop:step]
    start: Index where the slice begins (inclusive). Defaults to 0 if omitted.

    stop: Index where the slice ends (exclusive). Defaults to the sequence's length if omitted.

    step: Determines the interval between elements. Defaults to 1 if omitted.

       numbers = [10, 20, 30, 40, 50, 60]  

print(numbers[1:4])  
# Output: [20, 30, 40]  

print(numbers[:3])   
# Output: [10, 20, 30]  

print(numbers[::2])  
# Output: [10, 30, 50]  


2. Decorators

Okay, let’s make Python decorators super simple — like telling a story a child would enjoy 😊

🎂 Imagine a Cake

You bake a plain cake (that’s your normal function).

Then you put chocolate icing on top (that’s the decorator).

The cake is still the same inside, but now it looks and tastes better!

🐶 Imagine Your Dog

You have a dog. It can bark: "Woof!" 🐕 (this is your function).

You put a fancy collar on the dog.

Now, when it barks, it also shines ✨ because of the collar.

The bark didn’t change, but you added extra magic. That’s what a decorator does.

💻 In Python

Normally, you write a function:

def say_hello():
    print("Hello!")


Now we create a decorator — a function that wraps around another function to add something extra:

def my_decorator(func):
    def wrapper():
        print("🌟 Before the function runs")
        func()
        print("🌟 After the function runs")
    return wrapper


Use it like icing on a cake:

@my_decorator
def say_hello():
    print("Hello!")


Now when you call:

say_hello()


You get:

🌟 Before the function runs
Hello!
🌟 After the function runs

🌈 The Magic

Function = cake/dog

Decorator = icing/collar

Result = same function, but with extra powers

Decorators in Python can accept arguments from the function they wrap, and even modify those arguments or the result.

Let’s keep it simple with a child-friendly example 👇

🥤 Imagine a Juice Shop

You ask for a juice: "Mango".

The shop owner (decorator) always adds ice ❄️ before giving it to you.

You still get "Mango Juice", but colder!

💻 In Python

A normal function with arguments:

def greet(name):
    print(f"Hello {name}!")


A decorator that accepts arguments:

def polite_decorator(func):
    def wrapper(name):
        print("😊 Please be polite!")
        func(name)   # call the original function
        print("🙌 Thank you!")
    return wrapper


Now decorate:

@polite_decorator
def greet(name):
    print(f"Hello {name}!")


Call it:

greet("Akshat")


Output:

😊 Please be polite!
Hello Akshat!
🙌 Thank you!

🪄 Modifying the Arguments

Yes, decorators can also change the input:

def shout_decorator(func):
    def wrapper(name):
        name = name.upper()  # modify the argument
        return func(name)
    return wrapper

@shout_decorator
def greet(name):
    print(f"Hello {name}!")


Now:

greet("akshat")


Output:

Hello AKSHAT!


✅ So yes:

A decorator can accept arguments of the function

It can change inputs or outputs

It can add extra behavior before/after

4. A lambda is just a tiny shortcut function in Python.
Instead of writing:

def add(a, b):
    return a + b


You can write:

add = lambda a, b: a + b

5. Let’s make pickling in Python super easy to understand.

🥒 Think of Real Pickles

When we make real pickles:

You take a vegetable 🥕 (data).

You put it into a jar 🫙 with oil and spices (storage format).

Later, you can open the jar and eat it again (load the data back).

💻 In Python

Pickling is the same idea but for Python objects:

Pickling = Saving a Python object into a special byte format (so it can be stored in a file or sent over the internet).

Unpickling = Taking that byte format and turning it back into the original Python object.

🖥 Example
import pickle

# Our Python object
data = {"name": "Akshat", "age": 20, "hobbies": ["coding", "reading"]}

# --- Pickling (save into bytes) ---
pickled_data = pickle.dumps(data)
print(pickled_data)  # looks weird, like b'\x80\x04...'

# --- Unpickling (get back original object) ---
unpickled_data = pickle.loads(pickled_data)
print(unpickled_data)


Output:

{'name': 'Akshat', 'age': 20, 'hobbies': ['coding', 'reading']}

📂 Saving to a File
# Save
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

# Load
with open("data.pkl", "rb") as f:
    loaded = pickle.load(f)

print(loaded)

🌟 Why is it useful?

Store Python objects for later use

Send data between programs

Cache results without recomputing

⚠️ Important safety note:
Never unpickle data from an untrusted source (like random internet files) — it can run harmful code.

6. In Postman, the feature that allows you to see the history of requests you made is called the History tab.

📌 Where to find it:

On the left sidebar of Postman, below Collections, you’ll see History.

It automatically keeps track of every request you’ve made (URL, method, timestamp).

You can click any past request to re-run it, save it to a collection, or inspect its details.

7. A lot of people get confused between Collections and Environments in Postman. Let’s clear it up in a simple way 👇

📂 Collections

Think of a collection like a folder of requests.

A collection groups related API requests together.

Example: You are testing a User Management API. You may keep requests like:

POST /login

GET /users

POST /users

DELETE /users/:id

➡️ You can save, organize, and share all of them as one collection.
➡️ Collections also allow adding pre-request scripts, test scripts, and documentation for APIs.

🌍 Environments

Think of an environment like a set of variables for your requests.

Example:

Development environment → base_url = http://localhost:5000

Testing environment → base_url = https://test.api.com

Production environment → base_url = https://api.com

Now in your requests you write:

GET {{base_url}}/users


And depending on which environment is active, Postman replaces {{base_url}} automatically.

➡️ This saves time because you don’t need to edit every request when switching between Dev/Test/Prod.

🧩 Quick Analogy

Collection = Your recipe book (all the steps/requests saved in one place).

Environment = Your ingredients (variables like API URL, tokens, keys that change depending on the kitchen).

✅ So:

Collections = organize requests

Environments = manage variables/configurations

8. What is TDD?

TDD = Test-Driven Development.
It’s a software development process where you write tests before writing the actual code.

The cycle is simple:

Write a Test – Think about what your code should do.

Run the Test – It should fail initially because the code isn’t written yet.

Write Code – Write just enough code to make the test pass.

Refactor – Clean up the code while ensuring the test still passes.

Repeat – Add more tests for new features.

🏃 Why it’s useful

Ensures your code works correctly from the start.

Helps you catch bugs early.

Makes your code easier to maintain.

Gives you confidence to refactor without breaking things.

📊 Influence of TDD

Better code quality – Since you think about edge cases first.

Faster debugging – Bugs are caught immediately in tests.

Design guidance – Writing tests first often leads to simpler, more modular code.

Documentation – Tests act as live documentation of how the code should behave.

Team confidence – Developers know they aren’t breaking existing features when adding new ones.

🌈 Child-friendly analogy

Imagine building a Lego house:

Before building, you draw a plan (test).

Then you start building just enough to match the plan.

Keep checking with the plan at each step → If something doesn’t match, fix it immediately.

In the end, your Lego house is solid and exactly like the plan.

9. What is Mocking in TDD?

Mocking is when you pretend some part of your program exists, so you can test your code without relying on the real thing.

Sometimes your code depends on:

A database

An API

A file system

These can be slow, unavailable, or messy for tests.

A mock acts like a fake version of that dependency, so your tests are fast and reliable.

🛠 Example in Python (unittest.mock)
# imagine a function that fetches user data from an API
import requests

def get_user_name(user_id):
    response = requests.get(f"https://api.com/users/{user_id}")
    return response.json()['name']


If we test this directly, it will make a real API call 😬

Use a Mock instead:
from unittest.mock import patch

@patch('requests.get')  # mock requests.get
def test_get_user_name(mock_get):
    # define what the mock should return
    mock_get.return_value.json.return_value = {'name': 'Akshat'}
    
    # call the function
    result = get_user_name(1)
    
    assert result == 'Akshat'

test_get_user_name()


✅ Here, requests.get never actually calls the API. The mock fakes it.

🌟 Why mocking is important in TDD

Isolate tests – test one thing at a time.

Speed – no real network or database calls.

Predictable – you control what the dependency returns.

Covers edge cases – easily simulate errors or weird responses.

🧸 Child-friendly analogy

Imagine you’re testing a toy robot that talks to a toy phone.

You don’t want to call a real phone every time.

So, you use a fake phone that gives the robot the answers you want.

Now you can test the robot without needing a real phone.

B) Coding Questions

**Problem Statement 1: (Reference: https://leetcode.com/problems/minimum-window-substring/)
**
Have the function StringChallenge(strArr) take the array of strings stored in strArr, which will contain only two strings.

The first parameter is the string N.

The second parameter is the string K, which is a set of characters.

Your goal is to determine the smallest substring of N that contains all the characters in K.

**Example 1:
**If strArr is ["aaabaaddae", "aed"], then the smallest substring of N that contains the characters a, e, and d is "dae", which is located at the end of the string.
So for this example, your program should return the string:

dae

**Example 2:
**If strArr is ["aabdccdbcacd", "aad"], then the smallest substring of N that contains all the characters in K is "aabd", which is located at the beginning of the string.
So for this example, your program should return the string:

aabd


**Constraints:
**
Both parameters will be strings ranging in length from 1 to 50 characters.

All of K's characters will exist somewhere in the string N.

Both strings will contain only lowercase alphabetic characters.

**Final Step:
**Once your function is working, take the final output string and:

Concatenate it with your ChallengeToken.


**Problem Statement 2:
**
Imagine you are writing a function within a Django application to parse JSON data.

In the Python file, write a program to perform a GET request on the following route:

http://coderbyte.com/api/challenges/json/json-cleaning


After retrieving the data, clean the JSON object according to the following rules:

Remove all keys that have values of "N/A", "-", or an empty string "".

If one of these values appears in an array, remove only that single item from the array.

Finally, print the modified object as a string.

**Example Input:
**
{"name":{"first":"Daniel","middle":"N/A","last":"Smith"},"age":45}


**Example Output:
**
{"name":{"first":"Daniel","last":"Smith"},"age":45}


**Starter Code (to be completed):
**
import requests
import json

def clean_data():
    r = requests.get('https://coderbyte.com/api/challenges/json/json-cleaning')
    return r.json()

Replace every third character in this new string with the character 'X'.


**Problem Statement 3:
**
Have the function ArrayChallenge(strArr) take the parameter strArr, which will be an array containing:

One letter representing a Tetris piece type (capital letter).

Followed by 12 numbers representing the fill levels for the 12 columns of the Tetris board.

Your goal is to calculate the greatest number of horizontal lines that can be completed when the given piece is dropped onto the board.

Assume the piece is dropped immediately after being rotated and moved horizontally from the top.

Complicated combinations of vertical and horizontal adjustments (like sliding after partial descent) are excluded.

**Example:
**
Input:

["L","3","4","4","5","6","2","0","6","5","3","6","6"]


The board will look something like this:

(columns filled to the given heights)


In this case, the L piece can be rotated and dropped in columns 6–7, which completes 3 full rows of blocks.

Output:

3
