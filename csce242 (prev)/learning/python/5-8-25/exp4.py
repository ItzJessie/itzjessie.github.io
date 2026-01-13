# Building an MC Quiz

from Question import Question

question_prompts = [
        "What is your favorite color?\n(a) Red\n(b) Blue\n(c) Green\n(d) Yellow\n",
        "What is your favorite animal?\n(a) Dog\n(b) Cat\n(c) Bird\n(d) Fish\n",
        "What is your favorite food?\n(a) Pizza\n(b) Burger\n(c) Pasta\n(d) Salad\n",
        "What is your favorite season?\n(a) Spring\n(b) Summer\n(c) Fall\n(d) Winter\n",
 ]

questions = [
    Question(question_prompts[0], "a"),
    Question(question_prompts[1], "c"),
    Question(question_prompts[2], "b"),
]

def run_test(questions):
    score = 0
    for question in questions:
        answer = input(question.prompt)
        if answer == question.answer:
            score += 1
    print("You got " + str(score) + "/" + str(len(questions)) + " correct!")
    
run_test(questions)    