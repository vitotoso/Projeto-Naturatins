from django.db.models import Count, Q
from django.db.models.functions import TruncMonth
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User

from .models import Processo, Tramitacao
from .permissions import IsCoordenadorOuAdmin, ProcessoPermission
from .serializers import ProcessoSerializer, TramitacaoSerializer, TramitarSerializer


class ProcessoViewSet(viewsets.ModelViewSet):
    serializer_class = ProcessoSerializer
    permission_classes = [ProcessoPermission]

    def get_queryset(self):
        user = self.request.user
        qs = Processo.objects.select_related("criado_por", "responsavel_atual")
        if user.role in (User.Role.COORDENADOR, User.Role.ADMIN):
            return qs
        return qs.filter(Q(criado_por=user) | Q(responsavel_atual=user))

    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user, responsavel_atual=self.request.user)

    @action(detail=True, methods=["post"])
    def tramitar(self, request, pk=None):
        processo = self.get_object()
        serializer = TramitarSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        para_usuario = serializer.validated_data["para_usuario"]

        Tramitacao.objects.create(
            processo=processo,
            de_usuario=request.user,
            para_usuario=para_usuario,
            observacao=serializer.validated_data["observacao"],
        )
        processo.responsavel_atual = para_usuario
        processo.status = Processo.Status.EM_TRAMITE
        processo.save(update_fields=["responsavel_atual", "status"])
        return Response(ProcessoSerializer(processo).data)

    @action(detail=True, methods=["post"], permission_classes=[IsCoordenadorOuAdmin])
    def aprovar(self, request, pk=None):
        processo = self.get_object()
        processo.status = Processo.Status.APROVADO
        processo.save(update_fields=["status"])
        return Response(ProcessoSerializer(processo).data)

    @action(detail=True, methods=["post"], permission_classes=[IsCoordenadorOuAdmin])
    def reprovar(self, request, pk=None):
        processo = self.get_object()
        processo.status = Processo.Status.REPROVADO
        processo.save(update_fields=["status"])
        return Response(ProcessoSerializer(processo).data)

    @action(detail=True, methods=["get"])
    def historico(self, request, pk=None):
        processo = self.get_object()
        tramitacoes = processo.tramitacoes.select_related("de_usuario", "para_usuario")
        return Response(TramitacaoSerializer(tramitacoes, many=True).data)


class DashboardResumoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        qs = Processo.objects.all()
        if user.role not in (User.Role.COORDENADOR, User.Role.ADMIN):
            qs = qs.filter(Q(criado_por=user) | Q(responsavel_atual=user))

        por_status = list(qs.values("status").annotate(total=Count("id")))
        por_municipio = list(
            qs.exclude(municipio="").values("municipio").annotate(total=Count("id")).order_by("-total")[:10]
        )
        por_tecnico = list(
            qs.values("responsavel_atual__username").annotate(total=Count("id")).order_by("-total")
        )
        por_mes = list(
            qs.annotate(mes=TruncMonth("criado_em")).values("mes").annotate(total=Count("id")).order_by("mes")
        )

        return Response(
            {
                "total": qs.count(),
                "por_status": por_status,
                "por_municipio": por_municipio,
                "por_tecnico": por_tecnico,
                "favoravel": qs.filter(opc_ana="Sim").count(),
                "desfavoravel": qs.filter(opc_ana="Nao").count(),
                "por_mes": por_mes,
            }
        )
