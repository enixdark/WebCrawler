"""
setting and configure file for Crawler web
"""
import os
import datetime
CORE_PROCESS = 1 #set number core process for program use multicore
PATH = os.getcwd()+'/datafiles/'
LOG_PATH = os.getcwd()+'/log/' #set log folder for program based on current directory
FOLDER_LOG_NOW = "%s/%s" % (LOG_PATH,datetime.date.today()) #set logpath for program
LOG_FILE_PATH = LOG_PATH + '/%s/log%s.log' % (datetime.date.today(),datetime.datetime.now()) #set logpath for program
THREAD_NUM = 5 #set number thread use for program
URL = "http://assignments.uspto.gov/assignments/q?db=pat"
URL_PC = "http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=1&f=G&l=50&"
SUB_URL_PC = "s1=%s.PN.&OS=PN/%s&RS=PN/%s"
MYSQL_CONFIG = {
        'DB':'ipcrawler',
        'HOST':'localhost',
        'PORT':'3306',
        'USER':'', #please set username from database
        'PASSWORD':'', # #please set password from database
        #'SOCKET':'/var/lib/openshift/53f40d5a4382ec0fda0003da/mysql/socket/mysql.sock'
        'SOCKET':'/opt/lampp/var/mysql/mysql.sock' #set path to file .sock if you use xampp else please remove line
}

"""http://patft.uspto.gov/netacgi/nph-Parser?TERM1=5200000&Sect1=PTO1&Sect2=HITOFF&d=PALL&p=1&u=%2Fnetahtml%2FPTO%2Fsrchnum.htm&r=0&f=S&l=50"""
