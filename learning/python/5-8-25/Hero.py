class Hero: 
    
    def __init__(self, name, power, counter, city):
        self.name = name
        self.power = power
        self.counter = counter
        self.city = city
        
        
    def on_a_list(self):
        if self.power >= 3.5:
            return True
        else:
            return False