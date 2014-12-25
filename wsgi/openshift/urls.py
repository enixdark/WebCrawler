from django.conf.urls import patterns, include, url
from views import *
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from dajaxice.core import dajaxice_autodiscover, dajaxice_config
dajaxice_autodiscover()

from UP.views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'views.home', name='home'),
    url(r'^index/$','views.index'),
    url(r'^results/(?P<patent_id>\d+)/$','UP.views.results'),
    url(r'^demo/$', 'views.listing'),

    url(r'^results/','UP.views.result'),
    url(r'^notresults/$','UP.views.notresults'),
    url(r'^clone/$','UP.views.clone'),
    url(r'^search/$','UP.views.search'),
    url(r'^index2/$', MsgList.as_view()),
    url(r'^logout/$', "UP.views.logout"),
    url(r'^login/$', "UP.views.login"),
    # url(r'^patent/', "UP.views.results",name='patent'),

    # url(r'^openshift/', include('openshift.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^brand/(?P<brand>[-\w]+)/all_json_models/$', 'UP.views.all_json_models'),
)

