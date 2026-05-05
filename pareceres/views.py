from django.shortcuts import render


def formulario(request):
    return render(request, "pareceres/formulario.html")


def documento(request):
    return render(request, "pareceres/documento.html")
