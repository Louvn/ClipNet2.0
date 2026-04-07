# This function helps getting attributes
# but it can go multiple layers like 'current_revision.content'
# This is helpful when using core/search/dynamic_columns.py

def deep_getattr(obj, attr_name):
    
    current_object = obj

    for attr in attr_name.split("."):
        current_object = getattr(current_object, attr)

    return current_object