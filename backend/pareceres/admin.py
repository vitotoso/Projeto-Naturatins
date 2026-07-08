from django.contrib import admin

from .models import Processo, Tramitacao

admin.site.register(Processo)
admin.site.register(Tramitacao)
