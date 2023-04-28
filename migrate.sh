#!/bin/bash

echo -e 'Enter commit command: ';

read COMMIT_COMMAND;

flask --app Posts db migrate -m "$COMMIT_COMMAND";

flask --app Posts db upgrade;