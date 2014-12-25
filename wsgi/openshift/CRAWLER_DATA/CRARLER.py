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

#move to $PATH
os.chdir(PATH)

#init column name from patent table
tb_patent = ['Patent','Issue','Application','Filing','Inventor','Title']
#init column name from assignmenr table
tb_assignment = ['Reel/Frame','Recorded','Pages','Conveyance','Assignor','Assignee','Correspondent']

connection = MySQLdb.connect(host = MYSQL_CONFIG['HOST'],
                                             user = MYSQL_CONFIG['USER'],
                                             passwd = MYSQL_CONFIG['PASSWORD'],
                                             db = MYSQL_CONFIG['DB'],
                                             unix_socket=MYSQL_CONFIG['SOCKET'])

cur = connection.cursor()



def parse(tag):
    return etree.XML(tag).xpath("string()").strip()


#Return list dictionary or a collection JSON after extract data from html content
def filter_Crawler(soup):

    patent_column = map(lambda clean: clean.getText().split()[0].encode('utf-8')[:-1],
                        soup.findAll(['div','span'],attrs={'class':'t3'}))
    patent_row = map(lambda clean: clean.getText().strip().encode('utf-8'),
                     soup.findAll(['div','span'],attrs={'class':'p1'}))

    _len = len(patent_column)


    if _len==len(patent_row) or _len > 1:
        if 'Assignors' in patent_column or 'Assignor' in patent_column:
            patent_row += ['']*((_len-1)*2-len(patent_row))
            time = filter(lambda x: x=='' or re.match('[0-9]+\/[0-9]+\/[0-9]{4}',x),patent_row)
            assignors = filter(lambda x: not re.match('[0-9]+\/[0-9]+\/[0-9]{4}',x),patent_row)
            patent_row = [zip(assignors,time)]
            patent_column = [patent_column.pop(0)]
        return dict(zip(patent_column,patent_row))
    else:
        return dict(zip(patent_column,[patent_row]))



def filter_Crawler1(html):
    query = '%s[\s\w\W]+?%s'
    regex_list = tb_assignment + ['[\w\W\s]+']
    _list = []
    start = tb_assignment[0]
    for attr in regex_list[1:]:
        query_regex = query % (start,attr)
        r = re.findall(query_regex,html).pop()
        _crawler_list = re.findall(r'<\w{3,4}\sclass="p1">[\s\w\W]+?</\w{3,4}>',r)
        if len(_crawler_list) > 1:
            value = [parse(i) for i in _crawler_list]
        else:
            value = parse(_crawler_list.pop())
        _list.append(value)
        start = attr
        if start == regex_list[-1]:
            break
    return dict(zip(tb_assignment,_list))


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
                        url = requests.post(self.file,data_input)
                        f.write(url.content)
                        self.task.put(f.name)
                self.data_input.task_done()
            except:
                self.data_input.task_done()
                break


##                thread_lock.release()


class ProcessCrawler(multiprocessing.Process):
    def __init__(self,task_queue,queue,log):
        multiprocessing.Process.__init__(self)
        self.task_queue = task_queue
        self.queue = queue
        self.daemon = True
        self.log = log
       # self.process_queue = process_queue

    def run(self):
        #global filelog
        while True:
            next_task = self.task_queue.get()

            #print next_task
            if next_task is None:
                self.task_queue.task_done()
                break
            else:
                c = Crawler(next_task,self.log)
                c.connect()
                c.extract()
                c.updatedb()
                os.remove(next_task)
            self.task_queue.task_done()



class Crawler:
    """A Class simulator for crawler of the website"""

    def __init__(self,url,log):

        self.url = url
        self.soup = None
        self.patent = []
        self.log = log

    def connect(self):
        try:
            with open(self.url) as _data:#urllib2.urlopen(self._item)
                self.soup = _data.read()
        except:
            #print sys.exc_info()
            self.log.error(str(sys.exc_info()))

    def get_patent(self):
        return self.patent

    def clean(self):
        self.patent = []

    def extract(self):

        try:
            pages_string = str(self.soup).strip()
            m = pages_string.split("Assignment:")
            value = [parse(i) for i in re.findall(r'<\w{3,4}\sclass="p1">[\s\w\W]+?</\w{3,4}>',m[0])]
            self.patent.append(dict(zip(tb_patent,value)))
            #print "==================================================="

            for p in m[1:]:
                value = filter_Crawler1(p)

                self.patent.append(value)

        except:
            self.log.error(str(sys.exc_info()))

    def updatedb(self):
        #print self.patent

        if self.patent:
            try:
                patent = self.patent.pop(0)
##                cur = model.tb_patent(patent=patent['patent'],issue=patent['issue'],
##                                      application=patent['application'],fill=patent['fill'],
##                                     invertors=patent['invertor'],title=patent['title'])
##                cur = model.tb_patent()
##                cur.patent = patent['patent']
##                cur.issue = patent['issue']
##                cur.application = patent['application']
##                cur.filing = patent['filing']
##                cur.inventor = patent['inventor']
##                cur.title = patent['title']
##                cur.save()
                try:
                    cur.execute('insert into UP_tb_patent(patent,issue,application,filing,inventor,title)\
                           values(%s,%s,%s,%s,%s,%s)' , (patent['Patent'],parser.parse(patent['Issue']),
                                patent['Application'],parser.parse(patent['Filing']),
                                patent['Inventor'],patent['Title']))
                except MySQLdb.Error, e:
                    self.log.error(str(sys.exc_info()))


                assignment_id = 0
                while self.patent:
                    assignment_id += 1
                    assignment = self.patent.pop(0)
                    #print '======================================'
                    #print assignment
                    assignors = zip(assignment['Assignor'][0::2],assignment['Assignor'][1::2])

                    for name,times in assignors:
                        try:
                            cur.execute(r'insert into UP_tb_assignor(patent,reel_frame,name,exec_time) values(%s,%s,%s,%s)' ,
                                        (patent['Patent'],assignment['Reel/Frame'],name,parser.parse(times)))
                        except MySQLdb.Error, e:
                            print str(sys.exc_info())+"\n"

                    try: 
                        cur.execute('insert into UP_tb_assignment(_id,patent,reel_frame,recorded,conveyance,assignees,correspondent,pages)\
                 values(%s,%s,%s,%s,%s,%s,%s,%s)' , (assignment_id,patent['Patent'],assignment['Reel/Frame'],
                                parser.parse(assignment['Recorded']),''.join(assignment['Conveyance']),
                                ' | '.join(assignment['Assignee']),' | '.join(assignment['Correspondent']),assignment['Pages']))

                    except MySQLdb.Error, e:
                        self.log.debug(str(sys.exc_info())+"\n")
                        
                    

                cur.connection.commit()
                print 'insert %s into ' % patent['Patent']
                #self.log.debug('insert %s into ' % patent['Patent'])
            except:
                pass
                #self.log.error(str(sys.exc_info())+"\n")

#queue = multiprocessing.Queue()
#the_pool = multiprocessing.Pool(3, worker_main,())


class LOG:
    def __init__(self,PATH):
        log = logging.StreamHandler()
        log.setLevel(logging.DEBUG)
        _file = logging.FileHandler(PATH)

        formatter = logging.Formatter('%(asctime)s:%(name)s - %(levelname)s - %(message)s')
        log.setFormatter(formatter)
        self.logger = logging.getLogger('MySQL')
        self.logger.setLevel(logging.DEBUG)
    def debug(self,message,):
        self.logger.debug(message)

    def error(self,message,):
        self.logger.error(message)


import datetime
#m = Queue.Queue()
#filelog = open(LOG_PATH+'log%s.log' % datetime.datetime.now(),'w+')
#logging.basicConfig(filename=LOG_PATH+'log%s.log' % datetime.datetime.now(),level=logging.DEBUG)
def main1():

    if not os.path.exists(FOLDER_LOG_NOW):
        os.mkdir(FOLDER_LOG_NOW)

    log = LOG(LOG_FILE_PATH)
    queue = Queue.Queue()

    tasks = multiprocessing.JoinableQueue()
    results = multiprocessing.Queue()
    num_consumers = CORE_PROCESS#COREmultiprocessing.cpu_count()/2
    consumers = [ProcessCrawler(tasks,queue,log)
                  for i in xrange(num_consumers) ]

    for i in range(THREAD_NUM):
        t = ThreadCrawler(URL,queue,tasks)
        t.setDaemon(True)
        t.start()

    begin = int(sys.argv[1])
    end = int(sys.argv[2])
    for host in xrange(begin,end):
        queue.put({'pat':host})

    #for w in consumers:
    #    queue.put(None)

    for w in consumers:
        w.start()


    #for i in xrange(num_consumers):
    #    tasks.put_nowait(None)
    tasks.join()

    queue.join()
    #try:
    #    cur.connection.commit()
    #except MySQLdb.Error, e:
    #    log.error(e)

    #exit(0)
    cur.close()



if __name__ == "__main__":
    start = time.time()

    main1()
    print "===================================================="
    print "Elapsed Time: %ss" % (time.time() - start)


                                                                       
