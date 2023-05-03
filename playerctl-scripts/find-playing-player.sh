#!/bin/bash

players=$(playerctl --list-all)
for player in $players; do
    status=$(playerctl --player=$player status 2>/dev/null)
    if [[ $status == "Playing" ]]; then
        echo $player
        exit 0
    fi
done

exit 1
