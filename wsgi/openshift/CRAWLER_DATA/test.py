#!/usr/bin/python
import requests
from bs4 import BeautifulSoup
import mysql.connector
import MySQLdb
import re
import configure
url = "http://www.uspto.gov/web/patents/classification/uspc002/sched002.htm"

page = requests.get(url)
soup = BeautifulSoup(page.content)

tables = soup.find_all('table', attrs={'cellspacing':'0', 'cellpadding':'0', 'border':'0'})
c1= []
c3= [[] for i in range(20)]
pre = ''
x = ''
y = ''
# cnx = MySQLdb.connect(user='root', passwd='',
#                       db=configure.MYSQL_CONFIG['DB'], unix_socket='/opt/lampp/var/mysql/mysql.sock')
# cursor = cnx.cursor()
for table in tables:
     rows = table.find_all('tr', attrs={'valign':'top'})

     for row in rows:

          cells2 = row.find("td", attrs={'class':'SubTtl'})
          y = cells2.get_text()

          cells = row.find("td", attrs={'valign':'top','cellpadding':'0'})
          if cells:
               x = cells.get_text()
          else:
               x = cells

          cells = row.find_all('td', attrs={'class':'SubTtl'})
          for a in cells:
               b= a.find('big').findChildren('img')
               if b:
                    pre = re.findall('\d',b[0]['src']).pop()
               else:
                    pre = '0'
     if x:
         if x == u' \xa0':
             x = ' '
         elif u'\xa0' in x:
             x = x.replace(u'\xa0','')
         if [ x ,pre,'NULL'] not in c1:
            c1.append([ x ,pre,'NULL'])


_len = len(c1)
for i in range(_len):
     for j in range(i+1,_len):
         if c1[i][1] < c1[j][1]:
             c1[j][2] = c1[i][0]


     print (c1[i][0], c1[i][1], c1[i][2])
     #cursor.execute(add, data)


