from django.test import TestCase
from rest_framework.test import APIClient

from accounts.models import User

from .models import Processo
from .textos import montar_texto


class MontarTextoTests(TestCase):
    def test_retorna_texto_para_resposta_conhecida(self):
        self.assertIn("regular", montar_texto("opc_car", "Sim"))

    def test_retorna_vazio_para_resposta_desconhecida(self):
        self.assertEqual(montar_texto("opc_car", "NA"), "")
        self.assertEqual(montar_texto("campo_inexistente", "Sim"), "")


class ProcessoPermissaoTests(TestCase):
    def setUp(self):
        self.analista_a = User.objects.create_user("analista_a", password="123", role=User.Role.ANALISTA)
        self.analista_b = User.objects.create_user("analista_b", password="123", role=User.Role.ANALISTA)
        self.coordenador = User.objects.create_user(
            "coordenador", password="123", role=User.Role.COORDENADOR
        )
        self.processo = Processo.objects.create(
            nome_requerente="Fulano",
            criado_por=self.analista_a,
            responsavel_atual=self.analista_a,
        )

    def test_analista_ve_apenas_seus_processos(self):
        client = APIClient()
        client.force_authenticate(self.analista_b)
        resposta = client.get("/api/processos/")
        self.assertEqual(len(resposta.data), 0)

    def test_analista_dono_ve_seu_processo(self):
        client = APIClient()
        client.force_authenticate(self.analista_a)
        resposta = client.get(f"/api/processos/{self.processo.id}/")
        self.assertEqual(resposta.status_code, 200)

    def test_coordenador_ve_todos_processos(self):
        client = APIClient()
        client.force_authenticate(self.coordenador)
        resposta = client.get(f"/api/processos/{self.processo.id}/")
        self.assertEqual(resposta.status_code, 200)

    def test_apenas_coordenador_aprova(self):
        client = APIClient()
        client.force_authenticate(self.analista_a)
        resposta = client.post(f"/api/processos/{self.processo.id}/aprovar/")
        self.assertEqual(resposta.status_code, 403)

        client.force_authenticate(self.coordenador)
        resposta = client.post(f"/api/processos/{self.processo.id}/aprovar/")
        self.assertEqual(resposta.status_code, 200)
        self.processo.refresh_from_db()
        self.assertEqual(self.processo.status, Processo.Status.APROVADO)

    def test_tramitar_atualiza_responsavel_e_gera_historico(self):
        client = APIClient()
        client.force_authenticate(self.analista_a)
        resposta = client.post(
            f"/api/processos/{self.processo.id}/tramitar/",
            {"para_usuario": self.analista_b.id, "observacao": "segue para análise"},
        )
        self.assertEqual(resposta.status_code, 200)
        self.processo.refresh_from_db()
        self.assertEqual(self.processo.responsavel_atual, self.analista_b)
        self.assertEqual(self.processo.tramitacoes.count(), 1)
