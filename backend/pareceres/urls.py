from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import DashboardResumoView, ProcessoViewSet

router = DefaultRouter()
router.register("processos", ProcessoViewSet, basename="processo")

urlpatterns = [
    path("dashboard/resumo/", DashboardResumoView.as_view()),
] + router.urls
