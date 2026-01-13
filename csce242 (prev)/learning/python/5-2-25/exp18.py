# A guessing game

secret_word = "Huntress"
guess = ""
guess_count = 0
guess_limit = 3
out_of_guesses = False

while guess != secret_word and not out_of_guesses:
    if guess_count < guess_limit:
        guess = input("Please Guess: ")
        guess_count += 1
    else:
        out_of_guesses = True
           
if out_of_guesses:
    print("You Lose! Back To The Lobby! Beach!")
else:
    print("You Win!")    