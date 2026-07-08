from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ANALISTA = "ANALISTA", "Analista"
        COORDENADOR = "COORDENADOR", "Coordenador"
        ADMIN = "ADMIN", "Admin"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.ANALISTA)

    @property
    def is_coordenador_ou_admin(self):
        return self.role in (self.Role.COORDENADOR, self.Role.ADMIN)
