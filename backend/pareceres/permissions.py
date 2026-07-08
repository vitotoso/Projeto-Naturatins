from rest_framework.permissions import BasePermission

from accounts.models import User


class ProcessoPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.role in (User.Role.COORDENADOR, User.Role.ADMIN):
            return True
        return obj.criado_por_id == user.id or obj.responsavel_atual_id == user.id


class IsCoordenadorOuAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in (User.Role.COORDENADOR, User.Role.ADMIN)
        )
