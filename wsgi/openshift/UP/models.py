from django.db import models, connection
from models_func import *

# Create your models here.



class PatentManager(models.Manager):
    def title_count(self, keyword=None):
        if keyword == None:
            return self.count()
        return self.filter(patent_icontaints=keyword).count()

class Patent_Assignment_Manager(models.Manager):
    def allobjects(self,patent=None):
        results = []
        if patent:
            pt = tb_patent.objects.filter(patent=patent)
            if pt:
                results = list(pt).pop()

                assignor = filter_assignor(list(results.tb_assignor_set.all().values()))
                assignment = list(results.tb_assignment_set.all().values())
                assignment.sort(key=lambda k: k['reel_frame'])
                for index in range(len(assignment)):
                    assignment[index]['id'] = assignment[index]['_id']
                    assignment[index]['correspondent'] = assignment[index]['correspondent'].split('|')
                    assignment[index]['assignees'] = assignment[index]['assignees'].split('|')
                    assignment[index]['assignors'] =  assignor[index]['assignor']
                #results = results + assignment
                return list(pt.values()) + assignment

        return results



class tb_patent(models.Model):
    patent = models.CharField(max_length=7, primary_key=True, db_column='patent')
    issue = models.DateTimeField()
    application = models.CharField(max_length=8)
    filing = models.DateTimeField()
    inventor = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    objects = PatentManager()

    def __unicode__(self):
        return self.patent


class tb_assignment(models.Model):
    _id = models.IntegerField(db_column='_id')
    patent = models.ForeignKey(tb_patent, db_column='patent')
    reel_frame = models.CharField(max_length=11, db_column='reel_frame')
    recorded = models.DateTimeField()
    conveyance = models.CharField(max_length=255)
    assignees = models.CharField(max_length=1000)
    correspondent = models.CharField(max_length=1000)
    pages = models.SmallIntegerField(max_length=11)

    def __unicode__(self):
        return str(self._id)

    class Meta:
        unique_together = (("_id", "patent", "reel_frame"),)


class tb_assignor(models.Model):
    assignor_id = models.AutoField(primary_key=True)
    patent = models.ForeignKey(tb_patent, db_column='patent')
    reel_frame = models.CharField(max_length=11,db_column='reel_frame')
    name = models.CharField(max_length=255)
    exec_time = models.DateTimeField()
    ass = models.ManyToManyField(tb_assignment,db_column='reel_frame')
    def __unicode__(self):
        return str(self.assignor_id)


class tb_class(models.Model):
    class_number = models.CharField(max_length=10, primary_key=True, db_column='class_number')
    title = models.CharField(max_length=100)

    def __unicode__(self):
        return str(self.class_number)

    def __str__(self):
        return str(self.class_number)


class tb_subclass(models.Model):
    class_number = models.ForeignKey(tb_class, db_column='class_number')
    class_id = models.CharField(max_length=10, db_column='class_id')
    description = models.CharField(max_length=500)
    parent_id = models.CharField(max_length=10)

    class Meta:
        unique_together = (("class_id", "class_number"),)

    def __unicode__(self):
        return str(self.class_id)

    def __str__(self):
        return str(self.class_id)


class tb_class_Patent(models.Model):
    patent = models.ForeignKey(tb_patent, db_column='patent')
    class_number = models.ForeignKey(tb_class, db_column='class_number')
    class_id = models.CharField(max_length=10, db_column='class_id')
    objects = Patent_Assignment_Manager()

    def __unicode__(self):
        return str(self.patent)


    def __str__(self):
        return str(self.patent)






