#!/usr/bin/python
import requests
from bs4 import BeautifulSoup
from datetime import date, datetime, timedelta
#import mysql.connector
import MySQLdb
import configure

url = "http://www.uspto.gov/web/patents/classification/selectnumwithtitle.htm"
page = requests.get(url)

#get html content from url
soup = BeautifulSoup(page.content)

#find all row have
table = soup.find('table', attrs={'bordercolor':'#000000', 'cellspacing':'1', 'cellpadding':'3'})
 
rows = table.find_all('tr', attrs={'valign':'top'})

cnx = MySQLdb.connect(user=configure.MYSQL_CONFIG['USERNAME'], passwd=configure.MYSQL_CONFIG['PASSWORD'],
                         db=configure.MYSQL_CONFIG['DB'],unix_socket='/opt/lampp/var/mysql/mysql.sock')
cursor = cnx.cursor()
print cursor
for row in rows:
     cells = row.find_all("td")
     r1= cells[2].get_text()
     r2 = cells[3].get_text()

     add = ("INSERT INTO UP_tb_class " \
               "(CLASS_NUMBER, TITLE) " \
               "VALUES (%s, %s)")
     print add % (r1,r2)
     data = (r1, r2)

     cursor.execute(add, data)

cnx.commit()

cursor.close()
cnx.close()
    
