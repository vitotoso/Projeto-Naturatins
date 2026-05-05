from django.urls import path
from . import views

app_name = "pareceres"

urlpatterns = [
    path("", views.formulario, name="formulario"),
    path("documento/", views.documento, name="documento"),
]
