#!/bin/bash

echo -e 'Enter commit message: ';

read COMMIT_MESSAGE;

flask --app Posts db migrate -m "$COMMIT_MESSAGE";

flask --app Posts db upgrade;