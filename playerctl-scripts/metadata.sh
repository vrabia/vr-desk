#!/bin/bash
playerctl metadata --player=$1 --format "{{ artist }}; {{ title }}; {{ duration(mpris:length) }}"
