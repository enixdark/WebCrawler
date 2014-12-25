import urllib, urllib2, requests
import sys, os
import re
import threading
import multiprocessing
import Queue
import time
from dateutil import parser
from lxml import etree
from configure import *
import model
import MySQLdb
import logging
os.chdir(PATH)

connection = MySQLdb.connect(host = MYSQL_CONFIG['HOST'],
                                             user = MYSQL_CONFIG['USER'],
                                             passwd = MYSQL_CONFIG['PASSWORD'],
                                             db = MYSQL_CONFIG['DB'],
                                             unix_socket=MYSQL_CONFIG['SOCKET'])
cur = connection.cursor()


class ThreadCrawler(threading.Thread):
    def __init__(self,_file,data_input,task):
        self.file = _file
        self.data_input = data_input
        self.task = task
        threading.Thread.__init__(self)

    def run(self):
        while True:

            try:
                data_input = self.data_input.get()
                if self.data_input.empty():
                    self.data_input.task_done()
                    break
                if data_input['pat']:
                    with open('%s.html' % data_input['pat'],'w+') as f:

                        url = requests.get(self.file + SUB_URL_PC % (data_input['pat'],data_input['pat'],data_input['pat']))
                        f.write(url.content)
                        self.task.put(f.name)
                self.data_input.task_done()
            except:
                self.data_input.task_done()
                break


##                thread_lock.release()


class ProcessCrawler(multiprocessing.Process):
    def __init__(self,task_queue,queue):
        multiprocessing.Process.__init__(self)
        self.task_queue = task_queue
        self.queue = queue
        self.daemon = True

    def run(self):
        while True:
            next_task = self.task_queue.get()

            #print next_task
            if next_task is None:
                self.task_queue.task_done()
                break
            else:
                c = Crawler(next_task)
                c.connect()
                c.extract()
                c.updatedb()
                os.remove(next_task)
            self.task_queue.task_done()



class Crawler:
    """A Class simulator for crawler of the website"""

    def __init__(self,url):

        self.url = url
        self.soup = None
        self.patent = []

    def connect(self):
        try:
            with open(self.url) as _data:#urllib2.urlopen(self._item)
                self.soup = _data.read()
        except:
            print sys.exc_info()


    def get_patent(self):
        return self.patent

    def clean(self):
        self.patent = []

    def extract(self):
        try:
            pages_string = self.soup

            #print self.soup
            sign_class = re.findall(r'Current U.S. Class:[\W\s\w]+?</TR>',pages_string).pop()
            class_id = re.findall(r'\d{3}/\d{3}',sign_class)
            self.patent = class_id
        except:
            pass

    def updatedb(self):
        if self.patent:
            sign_class = re.findall(r'<TITLE>United States Patent:\s\d+</TITLE>',self.soup).pop()
            #print "=================================================="
            patent = re.search("\d+",sign_class).group()
            for value in self.patent:
                (class_number,class_id) = value.split('/')
                try:
                    cur.execute('insert into UP_tb_class_patent(patent,class_number,class_id)\
                        values(%s,%s,%s)', (patent,class_number,class_id))
                    cur.connection.commit()
                except:
                    print str(sys.exc_info())
            print 'insert patent %s' % patent




def main1():


    queue = Queue.Queue()

    tasks = multiprocessing.JoinableQueue()
    results = multiprocessing.Queue()
    num_consumers = CORE_PROCESS
    consumers = [ProcessCrawler(tasks,queue)
                  for i in xrange(num_consumers) ]
    print URL_PC
    for i in range(THREAD_NUM):
        t = ThreadCrawler(URL_PC,queue,tasks)
        t.setDaemon(True)
        t.start()

    begin = int(sys.argv[1])
    end = int(sys.argv[2])
    for host in xrange(begin,end):
        queue.put({'pat':host})


    for w in consumers:
        w.start()


    tasks.join()

    queue.join()

    # cur.close()

main1()



