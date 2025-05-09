import pygame
import sys

# Initialize pygame and joystick
pygame.init()
pygame.joystick.init()

# Set up screen
screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Python Learning Game")
font = pygame.font.SysFont(None, 36)

# Set up controller
if pygame.joystick.get_count() == 0:
    print("No controller detected. Connect your PS5 controller and restart.")
    sys.exit()

controller = pygame.joystick.Joystick(0)
controller.init()

# Define lessons
lessons = [
    "Lesson 1: Variables",
    "Lesson 2: Loops",
    "Lesson 3: Functions",
    "Lesson 4: Lists",
    "Lesson 5: Dictionaries"
]

lesson_texts = {
    0: "x = 5\nprint(x)",
    1: "for i in range(5):\n    print(i)",
    2: "def greet(name):\n    print('Hello,', name)",
    3: "my_list = [1, 2, 3]\nprint(my_list)",
    4: "my_dict = {'a': 1, 'b': 2}\nprint(my_dict)"
}

selected_index = 0

def draw_menu():
    screen.fill((20, 20, 20))
    for i, lesson in enumerate(lessons):
        color = (255, 255, 0) if i == selected_index else (200, 200, 200)
        text = font.render(lesson, True, color)
        screen.blit(text, (50, 50 + i * 40))
    pygame.display.flip()

def run_lesson(index):
    screen.fill((0, 0, 0))
    lines = lesson_texts[index].split('\n')
    for i, line in enumerate(lines):
        text = font.render(line, True, (0, 255, 0))
        screen.blit(text, (50, 50 + i * 40))
    pygame.display.flip()
    pygame.time.wait(3000)

# Main loop
running = True
in_lesson = False

while running:
    draw_menu()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.JOYBUTTONDOWN:
            if event.button == 0:  # X
                in_lesson = True
                run_lesson(selected_index)
                in_lesson = False

            elif event.button == 1:  # O
                running = False

        elif event.type == pygame.JOYHATMOTION:
            if event.value[1] == 1:  # D-pad up
                selected_index = (selected_index - 1) % len(lessons)
            elif event.value[1] == -1:  # D-pad down
                selected_index = (selected_index + 1) % len(lessons)

pygame.quit()
