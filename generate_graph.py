# -*- coding: utf-8 -*-
"""
Created on Sat Sep 15 19:59:04 2018

@author: Adam Dixon
"""

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import MaxNLocator
# =============================================================================================
# format example: 
# Sat Sep 15 2018 19:34:34 GMT-0700 (PDT),
# Sat Sep 15 2018 19:48:34 GMT-0700 (PDT), 
# Sat Sep 15 2018 20:14:34 GMT-0700 (PDT), 
# Sat Sep 15 2018 21:00:30 GMT-0700 (PDT), 
# Sat Sep 15 2018 22:34:29 GMT-0700 (PDT), 
# Sat Sep 15 2018 23:23:23 GMT-0700 (PDT)
# =============================================================================================
def parse_dates(data):
    ugly_data = data.split(',')
    parsed_data = []
    
    for idx, val in enumerate(ugly_data):
        parsed_data.append(find_between(ugly_data[idx], '', ' 2018'))
    return get_day_points(parsed_data)


def get_day_points(use_list):
    dic = {}
    dic.setdefault('Mon', 0)
    dic.setdefault('Tues', 0)
    dic.setdefault('Wed', 0)
    dic.setdefault('Thurs', 0)
    dic.setdefault('Fri', 0)
    dic.setdefault('Sat', 0)
    dic.setdefault('Sun', 0)
    use_list[0] = '\n' + use_list[0]
    
    for idx, val in enumerate(use_list):
        day = get_day(val)
        dic[day] = dic[day] + 1
    
    l = []
    
    for key, value in dic.items():  
        l.append(value)
        
    return l

def get_day(data):
    return find_between(data, '\n', ' ')
    
# =============================================================================================
# Return the string between the two strings "first" and "last"
# =============================================================================================
def find_between( s, first, last ):
    try:
        start = s.index( first ) + len( first )
        end = s.index( last, start )
        return s[start:end]
    except ValueError:
        return ""

# =============================================================================================
# Given a text file path, read the file (format : {date, date, date, ...}) create and output
# a graph which shows the users progress using Swerve
# =============================================================================================
def create_graph(file_name):
    
    dates = {}
    with open(file_name) as f:
        dates = parse_dates(f.read())
    
    #labels = "Mon Tues Weds Thurs Fri Sat Sun".split()
    ax = plt.figure().gca()
    ax.yaxis.set_major_locator(MaxNLocator(integer=True))
    plt.xticks(np.arange(7), ('Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'))
    plt.plot(dates)
    plt.title("Swerve Weekly Report")
    plt.ylabel("Number of swerves")
    plt.xlabel("Day of the week")
    fig1 = plt.gcf()
    plt.draw()
    fig1.savefig('swerve.png', dpi=100)
    plt.show()

    

    
    return None

create_graph('data_points.txt')