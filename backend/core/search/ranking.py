# ranking results for standard sorting
# using primary (for example title)
# and secondary (main content)

def rank(primary, secondary, query):

    rank = 0
    p, s = primary.lower(), secondary.lower()

    # full phrase => 15 points
    if query.lower() in p:
        rank += 15

    for word in query.lower().split(" "):

        # word in primary => 5 points
        if word in p:
            rank += 5

        # x times in secondary => x points
        rank += s.count(word)

    return rank