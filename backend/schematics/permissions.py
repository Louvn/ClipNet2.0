from enum import Enum

class EditPermission(int, Enum):
    everyone = 1
    contributors = 2