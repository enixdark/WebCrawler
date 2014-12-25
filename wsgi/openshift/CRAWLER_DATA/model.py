# import peewee
# import datetime
# from configure import *
# import MySQLdb
#
# db = peewee.MySQLDatabase(MYSQL_CONFIG['DB'], user=MYSQL_CONFIG['USER'],passwd=MYSQL_CONFIG['PASSWORD'],
#                           unix_socket=MYSQL_CONFIG['SOCKET'])
# try:
#     db.connect()
# except peewee.DataError:
#     MySQLdb.connect(username=MYSQL_CONFIG['USER'],passwd=MYSQL_CONFIG['PASSWORD']).cursor().execute('create databases %s' % MYSQL_CONFIG['DB'])
#     db.connect()
#
#
# class BaseModel(peewee.Model):
#     class Meta:
#         database = db
#
# class tb_patent(BaseModel):
#     patent = peewee.CharField(max_length=7)
#     issue = peewee.DateField()
#     application = peewee.CharField(max_length=8)
#     filing = peewee.DateField()
#     inventor = peewee.CharField()
#     title = peewee.CharField()
#
#
# ##class tb_assignor(BaseModel):
# ##    id_assignor = peewee.CharField(max_length=3)
# ##    name = peewee.CharField()
# ##
# ##
# ##class tb_assignee(BaseModel):
# ##    id_assignee = peewee.CharField(max_length=3)
# ##    name = peewee.CharField()
# ##
# ##
# ##def tb_correspondent(BaseModel):
# ##    id_correspondent = peewee.CharField(max_length=3)
# ##    name = peewee.CharField()
#
#
# class tb_assignment(BaseModel):
#     _id = peewee.IntegerField()
#     patent = peewee.ForeignKeyField(tb_patent,db_column='patent')
#     reel_frame = peewee.CharField(max_length=11)
#     recorded = peewee.DateField()
#     conveyance = peewee.CharField()
#     assignors = peewee.CharField()
#     assignees = peewee.CharField()
#     correspondent = peewee.CharField()
#     pages = peewee.IntegerField()
#
# class exec_time_tb(BaseModel):
#     assignors = peewee.ForeignKeyField(tb_assignment,db_column='assignors')
#     name = peewee.CharField()
#     #peewee.ForeignKeyField(tb_assignor,db_column='name')
#     exec_time = peewee.DateField()
#
# """
# if not tb_patent.table_exists():
#     tb_patent.create_table()
# if not exec_time_tb.table_exists():
#     exec_time_tb.create_table()
# if not tb_assignment.table_exists():
#     tb_assignment.create_table()
# """






    


        
    
