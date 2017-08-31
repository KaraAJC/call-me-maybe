# PSEUDOCODE:
# a call log has many call records
# a call record consists of:
#  - number, duration(hrs, mins, secs), charge rate, Most-Frequent-Caller Status?
# Goal: return total cost of bill based on call log


# call log class
# - uses parser class, or is parser for log string
# - collection of call records
# - holds info about MFC

# call record class
# - creates instance of record

# duration class?
# - holds logic around hrs/mins/sec.. OR use time class (inherit from?)

# billing class
# - holds logic around rates (including ability to not charge MFC)