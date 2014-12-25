import os
from django.shortcuts import render_to_response,RequestContext
from django.contrib import auth
from django.core.context_processors import csrf
from UP.models import *
# def home(request):
#     if request.method == 'POST':
#         username = request.POST.get('username', '')
#         password = request.POST.get('password', '')
#         user = auth.authenticate(username=username, password=password)
#         if user is not None:
#             auth.login(request, user)
#             return render_to_response('home/home.html', {'user': request.user},context_instance=RequestContext(request))
#
#     return render_to_response('home/home.html', {'user': request.user},
#                                       context_instance=RequestContext(request))

def home(request):
    import random
    from datetime import datetime
    data = []

    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
    # if not request.user.is_anonymous():
    #     keys = {'Utility':r'[0-9]*','Design':r'D+','Plant':'P+','Reissue':r'R+','Defensive Publication':r'T+',
    #             'Statutory Invention Registration ':r'H+','Additional Improvement':r'AI+'}
    #     for value in keys.values():
    #         obj = list(tb_patent.objects.filter(patent__regex=value))
    #         num = len(obj)
    #         if  num > 3:
    #             _choice_data = []
    #             while len(_choice_data) < 3:
    #                 _choice_data.append(obj.pop(random.randrange(num)))
    #                 num -=1
    #             obj =  _choice_data
    #         else:
    #             obj = obj + [None]*(3-num)
    #         data.append(obj)
    #
    #     data = zip(keys.keys(),data)
    #     data.reverse()
    return render_to_response('home/home.html', {'user': request.user},context_instance=RequestContext(request))
    # return render_to_response('home/home.html',{'data':data,'user': request.user},context_instance=RequestContext(request))

def index(request):
    return render_to_response('index.html')

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def listing(request):
    from dateutil import parser
    contact_list = tb_patent.objects.filter(issue=parser.parse('04/06/1993'))
    paginator = Paginator(contact_list, 2) # Show 25 contacts per page

    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)
    return render_to_response('demo.html', {"contacts": contacts})