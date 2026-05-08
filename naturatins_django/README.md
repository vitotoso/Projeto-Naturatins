# Naturatins - Parecer Técnico

Projeto Django para geração de Pareceres Técnicos do NATURATINS.

## Como rodar

```bash
# 1. Instalar dependências
pip install django

# 2. Entrar na pasta do projeto
cd naturatins

# 3. Rodar o servidor
python manage.py runserver
```

## Acesse no navegador

| Página        | URL                          |
|---------------|------------------------------|
| Formulário    | http://localhost:8000/        |
| Documento     | http://localhost:8000/documento/ |

## Estrutura do projeto

```
naturatins/               ← configurações do projeto Django
pareceres/
├── templates/
│   └── pareceres/
│       ├── formulario.html
│       └── documento.html
├── static/
│   └── pareceres/
│       ├── css/
│       │   ├── style.css
│       │   └── documento.css
│       ├── js/
│       │   ├── form.js
│       │   ├── doc.js
│       │   └── municipios.js
│       └── images/       ← coloque suas imagens aqui
├── views.py
└── urls.py
manage.py
```

## Imagens necessárias

Coloque as imagens na pasta `pareceres/static/pareceres/images/`:
- `1-1024x1024.png` (logo NATURATINS)
- `Tocantins-Governo-do-Estado.png` (logo Governo do Tocantins)

## Observação

Os dados continuam sendo salvos via **localStorage** no navegador,
sem alteração alguma na lógica JavaScript existente.
