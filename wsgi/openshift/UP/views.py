from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import *
import models
from django.views.decorators.csrf import csrf_protect
import json
from django.db import connection
from django.contrib import auth
from django.core import serializers
from dateutil import parser
# Create your views here.
from django.core.context_processors import csrf
from django.core.paginator import Paginator

def ip_address_processor(request):
    return {'ip_address': request.META['REMOTE_ADDR']}

from django.template import TemplateDoesNotExist

DATA = None
def result(request):
    def check_avaiable(request,data,name):
        if request.POST[name] != '':
            key = request.POST[name]
            if type(data) is dict:
                if data[name].find(key) == -1:
                    return False
            if type(data) is list:
                items = []
                while data:
                    current = data.pop()
                    items += list(current[name])
                items = filter(lambda d : d.find(key) > -1,items)
                return len(items) > 0
        return True

    data = None
    global DATA
    response = None
    if request.method == "GET":
        page = request.GET.get('page')
        data = DATA.page(page)
        startPage = int(page)
        endPage = startPage
        if startPage <= 5:
            startPage = 1
        endPage = startPage + 4 + 1
        if endPage >= data.paginator.num_pages - 1:
            startPage = data.paginator.num_pages - 5 - 1
            endPage = data.paginator.num_pages

        page_numbers = [n for n in range(startPage, endPage) \
                        if n > 0 and n <= data.paginator.num_pages]

        print startPage,endPage,page_numbers
        response = render_to_response('patent.html', {'page_obj': data,'page_numbers':page_numbers})
    if request.method == "POST":
        data = models.tb_patent.objects
        check = False
        if request.POST['patent_id'] != '':
            data = data.filter(patent=request.POST['patent_id'])
        if request.POST['issue'] != '':
            data = data.filter(issue=parser.parse(request.POST['issue']))
            check = True

        if request.POST['exectime'] != '':
            if check:
                l = filter(lambda x: x.tb_assignor_set.filter(exec_time=parser.parse(request.POST['exectime'])),data)
            else:
                l = map(lambda x: x.patent,
                        models.tb_assignor.objects.filter(exec_time=parser.parse(request.POST['exectime'])))
            data = data.filter(patent__in=l)
            check = True

        if request.POST['inventor'] != '':
            data = data.filter(inventor__icontains=request.POST['inventor'])
            check = True
        if request.POST['assignees'] != '':
            if check:
                l = filter(lambda x : x.tb_assignment_set.filter(assignees__icontains=request.POST['assignees']),data)
            else:
                l = map(lambda x:x.patent,models.tb_assignment.objects.filter(assignees__icontains=request.POST['assignees']))
            data = data.filter(patent__in = l)
            check = True

        if request.POST['inventor'] != '':
            data = data.filter(inventor__icontains=request.POST['inventor'])
            check = True

        if request.POST['correspondent'] !='':
            if check:
                l = filter(lambda x: x.tb_assignment_set.filter(correspondent__icontains=request.POST['correspondent']),
                           data)
            else:
                l = map(lambda x:x.patent,models.tb_assignment.objects.filter(correspondent__icontains=request.POST['correspondent']))
            data = data.filter(patent__in = l)
            check = True


        if request.POST['Class_Number'] != '*':
            if check:
                l = filter(lambda x: x.tb_class_patent_set.filter(class_number=request.POST['Class_Number']),
                           data)
            else:
                l = map(lambda x: x.patent,
                        models.tb_class_Patent.objects.filter(class_number=request.POST['Class_Number']))
            data = data.filter(patent__in=l)
            check = True

        if 'Class_Id' in request.POST and request.POST['Class_Id'] != '*':
            if check:
                l = filter(lambda x: x.tb_class_patent_set.filter(class_id=request.POST['Class_Id']),
                           data)
            else:
                l = map(lambda x: x.patent,
                        models.tb_class_Patent.objects.filter(class_id=request.POST['Class_Id']))
            data = data.filter(patent__in=l)
            check = True

        data = Paginator(data,15)
        DATA = data
        page_numbers = range(1,6) if data.num_pages > 5 else range(1, data.num_pages + 1)
        response = render_to_response('patent.html',{'page_obj':DATA.page(1),'page_numbers':page_numbers})

    return response

def results(request,patent_id):
    data = models.tb_class_Patent.objects.allobjects(patent=patent_id)
    if data:
        patent = data.pop(0)
        return render_to_response('results.html', {'patent': patent, 'data': data})
    return render_to_response('notresults.html')

def notresults(request):
    #brand_list = models.VehicleBrand.objects.all()
    brand_list = models.tb_class.objects.all()
    return render_to_response('notresults.html', {'brand_list': brand_list})

def patent(request):
    return render_to_response('patent.html')

def clone(request):

    import random
    from datetime import datetime
    if request.session.get('last_visit') and request.session.get('data'):
        last_visit_time = request.session.get('last_visit')
        data = request.session.get('data')

        if (datetime.now() - datetime.strptime(last_visit_time[:-7], "%Y-%m-%d %H:%M:%S")).days > 0:
            request.session['data'] = data
            request.session['last_visit'] = str(datetime.now())
        else:
            del request.session['data']
    else:
        print 'yes',request.session.get('data')

        keys = {'Utility':r'[0-9]*','Design':r'D+','Plant':'P+','Reissue':r'R+','Defensive Publication':r'T+',
                'Statutory Invention Registration ':r'H+','Additional Improvement':r'AI+'}
        data = []
        for value in keys.values():
            obj = list(models.tb_patent.objects.filter(patent__regex=value))
            num = len(obj)
            if  num > 3:
                _choice_data = []
                while len(_choice_data) < 3:
                    _choice_data.append(obj.pop(random.randrange(num)))
                    num -=1
                obj =  _choice_data
            else:
                obj = obj + [None]*(3-num)
            data.append(obj)

        data = zip(keys.keys(),data)
        data.reverse()
        #request.session['data'] = dict(data)
        #request.session['last_visit'] = str(datetime.now())
    return render_to_response('clone.html',{'data':data})


def search(request):
    tb_Class = models.tb_class.objects.all()
    return render_to_response('search.html',{"tb_Class":tb_Class},context_instance=RequestContext(request))


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        print username,password
        user = auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
    return render_to_response('home/home.html',{'user':request.user},context_instance=RequestContext(request))


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/")

from django.views.generic import ListView
from models import Msg
ITEMS_PER_PAGE = 2




def all_json_models(request, brand):

    current_brand = models.tb_class.objects.get(class_number=brand)
    # current_brand = VehicleBrand.objects.get(code=brand)
    model = models.tb_subclass.objects.filter(class_number=current_brand)
    json_models = serializers.serialize("json", model)
    return HttpResponse(json_models, mimetype="application/javascript")
