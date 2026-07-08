from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


class NaturatinsUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (("Papel", {"fields": ("role",)}),)
    list_display = UserAdmin.list_display + ("role",)


admin.site.register(User, NaturatinsUserAdmin)
