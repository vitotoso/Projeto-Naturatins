from django.shortcuts import render

def formulario(request):
     if request.method == 'POST':
         dados = request.POST
         return render(request, 'parecer/documento.html', {'dados': dados})
     return render(request, 'parecer/formulario.html')

def documento(request):
     return render(request, 'parecer/documento.html')
