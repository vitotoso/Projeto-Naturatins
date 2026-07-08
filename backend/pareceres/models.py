from django.conf import settings
from django.db import models


class Processo(models.Model):
    class Status(models.TextChoices):
        RASCUNHO = "RASCUNHO", "Rascunho"
        EM_TRAMITE = "EM_TRAMITE", "Em trâmite"
        APROVADO = "APROVADO", "Aprovado"
        REPROVADO = "REPROVADO", "Reprovado"

    class SimNaoNA(models.TextChoices):
        SIM = "Sim", "Sim"
        NAO = "Nao", "Não"
        NA = "NA", "Não se aplica"

    class Porte(models.TextChoices):
        PEQUENO = "Pequeno", "Pequeno"
        MEDIO = "Médio", "Médio"
        GRANDE = "Grande", "Grande"

    class CarSituacao(models.TextChoices):
        DEFICIT = "Deficit", "Déficit de Reserva Legal"
        CONFLITO = "Conflito", "CAR em Conflito"

    class TipoUsoAgua(models.TextChoices):
        DUI = "DUI", "DUI"
        OUTORGA = "Outorga", "Outorga"

    class Atividade(models.TextChoices):
        SILVICULTURA = "Silvicultura", "Silvicultura"
        AGRICULTURA = "Agricultura", "Agricultura"
        PECUARIA = "Pecuária", "Pecuária"
        SUINOCULTURA = "Suinocultura", "Suinocultura"

    cod_processo = models.CharField(max_length=100, blank=True)
    cod_car = models.CharField(max_length=100, blank=True)
    requerimento = models.CharField(max_length=255, blank=True)
    nome_requerente = models.CharField(max_length=255, blank=True)
    ato_administrativo = models.CharField(max_length=255, blank=True)
    atividade = models.CharField(max_length=20, choices=Atividade.choices, default=Atividade.PECUARIA)
    porte = models.CharField(max_length=20, choices=Porte.choices, blank=True)
    area_propriedade = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    area_atividade = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    municipio = models.CharField(max_length=150, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    data_chegada = models.DateField(null=True, blank=True)

    opc_doc = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_car = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_art = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_agua = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_apoio = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_spr = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_infr = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_resi = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_cons = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)
    opc_ana = models.CharField(max_length=3, choices=SimNaoNA.choices, blank=True)

    # Respostas condicionais, reveladas conforme as opções acima (opc_car=Nao, opc_art=Nao etc).
    car_situacao = models.CharField(max_length=20, choices=CarSituacao.choices, blank=True)
    art_justificativa = models.TextField(blank=True)
    agua_tipo = models.CharField(max_length=20, choices=TipoUsoAgua.choices, blank=True)
    agua_justificativa = models.TextField(blank=True)
    apoio_tipo = models.CharField(max_length=20, choices=TipoUsoAgua.choices, blank=True)
    apoio_justificativa = models.TextField(blank=True)
    spr_ard = models.TextField(blank=True)

    # Para cada pergunta acima respondida "Nao", o analista classifica o achado
    # como Pendência (falta algo pro licenciamento seguir) ou Condicionante
    # (vira uma condição da licença). Ex.: {"opc_car": "CONDICIONANTE"}.
    classificacoes = models.JSONField(default=dict, blank=True)

    observacao = models.TextField(blank=True)
    condicionante = models.TextField(blank=True)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.RASCUNHO)
    criado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="processos_criados", on_delete=models.PROTECT
    )
    responsavel_atual = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="processos_na_fila", on_delete=models.PROTECT
    )

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.cod_processo} - {self.nome_requerente}"


class Tramitacao(models.Model):
    processo = models.ForeignKey(Processo, related_name="tramitacoes", on_delete=models.CASCADE)
    de_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="tramitacoes_enviadas",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    para_usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="tramitacoes_recebidas", on_delete=models.PROTECT
    )
    observacao = models.TextField(blank=True)
    data_hora = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["data_hora"]

    def __str__(self):
        return f"{self.processo_id}: {self.de_usuario} -> {self.para_usuario}"
