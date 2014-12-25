from django.template import Library
from UP.models import *
from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils import simplejson
from django.utils.safestring import mark_safe
from django import template
register = Library()

@register.filter
def get_range( value ):
    """
      Filter - returns a list containing range made from given value
      Usage (in template):

      <ul>{% for i in 3|get_range %}
        <li>{{ i }}. Do something</li>
      {% endfor %}</ul>

      Results with the HTML:
      <ul>
        <li>0. Do something</li>
        <li>1. Do something</li>
        <li>2. Do something</li>
      </ul>

      Instead of 3 one may use the variable set in the views
    """
    return xrange( 1,value + 1)

@register.filter
def get_value_classnumber( value ):
    """
      Filter - returns a list containing range made from given value
      Usage (in template):

      <ul>{% for i in 3|get_range %}
        <li>{{ i }}. Do something</li>
      {% endfor %}</ul>

      Results with the HTML:
      <ul>
        <li>0. Do something</li>
        <li>1. Do something</li>
        <li>2. Do something</li>
      </ul>

      Instead of 3 one may use the variable set in the views
    """
    values = []
    value = list(tb_class.objects.filters(class_number=value)).pop()
    if value:
        values = map(lambda x: str(x),value.tb_subclass_set.all())
    return values


@register.filter(is_safe=True)
def jsonify(object):
    data = map(lambda x: str(x),object)
    return simplejson.dumps(data)

@register.filter(is_safe=True)
def pprint(object):
    return object;


class SetVarNode(template.Node):

    def __init__(self, var_name, var_value):
        self.var_name = var_name
        self.var_value = var_value

    def render(self, context):
        try:
            value = template.Variable(self.var_value).resolve(context)
        except template.VariableDoesNotExist:
            value = ""
        context[self.var_name] = value
        return u""

def set_var(parser, token):
    """
        {% set <var_name>  = <var_value> %}
    """
    parts = token.split_contents()
    if len(parts) < 4:
        raise template.TemplateSyntaxError("'set' tag must be of the form:  {% set <var_name>  = <var_value> %}")
    return SetVarNode(parts[1], parts[3])

register.tag('set', set_var)


from UP.models import VehicleBrand



@register.inclusion_tag("notreaults.html")
def brand_model_select():
    brand_list = VehicleBrand.objects.all()
    return {'brand_list' : brand_list}