from django.contrib import admin
import models
# Register your models here.


from models import *

class ModelAssignment(admin.ModelAdmin):
    list_display = ['_id','patent','reel_frame']

admin.site.register(tb_assignment,ModelAssignment)
admin.site.register(tb_patent)
admin.site.register(tb_assignor)
admin.site.register(Msg)
admin.site.register(VehicleModel)
admin.site.register(VehicleBrand)