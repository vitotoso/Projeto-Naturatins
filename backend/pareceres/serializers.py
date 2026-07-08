from rest_framework import serializers

from accounts.models import User
from accounts.serializers import UserSerializer

from .models import Processo, Tramitacao
from .textos import montar_condicionantes_geradas, montar_pendencias, montar_textos


class ProcessoSerializer(serializers.ModelSerializer):
    criado_por = UserSerializer(read_only=True)
    responsavel_atual = UserSerializer(read_only=True)
    textos = serializers.SerializerMethodField()
    pendencias = serializers.SerializerMethodField()
    condicionantes_geradas = serializers.SerializerMethodField()

    class Meta:
        model = Processo
        fields = "__all__"
        read_only_fields = ["status", "criado_por", "responsavel_atual"]

    def get_textos(self, obj):
        return montar_textos(obj)

    def get_pendencias(self, obj):
        return montar_pendencias(obj)

    def get_condicionantes_geradas(self, obj):
        return montar_condicionantes_geradas(obj)


class TramitacaoSerializer(serializers.ModelSerializer):
    de_usuario = UserSerializer(read_only=True)
    para_usuario = UserSerializer(read_only=True)

    class Meta:
        model = Tramitacao
        fields = ["id", "processo", "de_usuario", "para_usuario", "observacao", "data_hora"]


class TramitarSerializer(serializers.Serializer):
    para_usuario = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    observacao = serializers.CharField(required=False, allow_blank=True, default="")
