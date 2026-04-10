from ...schematics.content_type import ContentType

# This file provides dictionaries for all use cases in the search
# every dict contains the right columns for the specific type

# EXAMPLE
# if you want to sort using the date an article/user was created
# but the column names are not the same, they are for example date_created/date_joined
# you can simply use a dict like CREATION_DATE provided in this file and get the right column
# using the type (article/user) as the key

PRIMARY_CONTENT_FOR_RANKING = {
    ContentType.article: "current_revision.title",
    ContentType.user: "username"
}

SECONDARY_CONTENT_FOR_RANKING = {
    ContentType.article: "current_revision.content",
    ContentType.user: "username" # TODO: Change this to description as soon as I implemented it
}

CREATED_AT_COLUMN = {
    ContentType.article: "current_revision.created_at",
    ContentType.user: "created_at"
}