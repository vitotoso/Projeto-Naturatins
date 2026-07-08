# Textos jurídicos ligados a cada resposta Sim/Não do parecer.
# Portado 1:1 do dicionário `regras` de frontend/Js/form.js (versão anterior, em vanilla JS).
REGRAS_TEXTO = {
    "opc_doc": {
        "Sim": "O empreendedor apresentou integralmente os documentos exigidos. ",
        "Nao": "O empreendedor não apresentou integralmente os documentos exigidos, sendo necessária complementação. ",
    },
    "opc_car": {
        "Sim": "O Cadastro Ambiental Rural encontra-se ativo e regular. ",
        "Nao": "O Cadastro Ambiental Rural apresenta inconsistências, sendo necessária regularização. ",
    },
    "opc_art": {
        "Sim": "A Anotação de Responsabilidade Técnica encontra-se regular. ",
        "Nao": "A Anotação de Responsabilidade Técnica necessita regularização. ",
    },
    "opc_agua": {
        "Sim": "A atividade faz uso direto de recursos hídricos com autorização válida. ",
        "Nao": "A atividade faz uso direto de recursos hídricos sem autorização, sendo necessária regularização. ",
    },
    "opc_apoio": {
        "Sim": "Verifica-se uso de água para atividades de apoio, devendo ser regularizado. ",
        "Nao": "Não há uso relevante de água para apoio. ",
    },
    "opc_spr": {
        "Sim": "O empreendimento prevê supressão de vegetação. ",
        "Nao": "O empreendimento não prevê supressão de vegetação. ",
    },
    "opc_infr": {
        "Sim": "Foi verificada infraestrutura compatível. ",
        "Nao": "Não foi verificada infraestrutura adequada.",
    },
    "opc_resi": {
        "Sim": "Os resíduos são gerenciados adequadamente. ",
        "Nao": "Não há gestão adequada de resíduos. ",
    },
    "opc_cons": {
        "Sim": "O empreendimento encontra-se inserido em Unidade de Conservação. ",
        "Nao": "O empreendimento não se encontra inserido em Unidade de Conservação. ",
    },
    "opc_ana": {
        "Sim": "Diante do exposto, opina-se de forma favorável à emissão da licença. ",
        "Nao": "Diante do exposto, opina-se de forma desfavorável à emissão da licença. ",
    },
}

CAMPOS_REGRA = list(REGRAS_TEXTO.keys())

CAR_SITUACAO_TEXTO = {
    "Deficit": "Constatou-se déficit de vegetação nativa para reserva legal. ",
    "Conflito": "Constatou-se sobreposição/conflito no Cadastro Ambiental Rural. ",
}

# Campos elegíveis para classificação Pendência/Condicionante quando respondidos "Nao".
# opc_ana fica de fora: é o resultado final da análise, não um achado de conformidade.
CAMPOS_CLASSIFICAVEIS = [c for c in CAMPOS_REGRA if c != "opc_ana"]

PENDENCIA_TEXTO = {
    "opc_doc": "Complementação da documentação exigida para o licenciamento.",
    "opc_car": "Regularização do Cadastro Ambiental Rural (CAR).",
    "opc_art": "Regularização da Anotação de Responsabilidade Técnica (ART).",
    "opc_agua": "Regularização do uso de recursos hídricos (outorga/DUI).",
    "opc_apoio": "Regularização do uso de água para atividades de apoio.",
    "opc_spr": "Apresentação de Autorização de Supressão Vegetal (ASV) e ARD.",
    "opc_infr": "Adequação da infraestrutura do empreendimento.",
    "opc_resi": "Implantação de gestão adequada de resíduos.",
    "opc_cons": "Regularização quanto à Unidade de Conservação.",
}

CONDICIONANTE_TEXTO = {
    "opc_doc": "Apresentar a documentação complementar exigida no prazo estabelecido.",
    "opc_car": "Regularizar o Cadastro Ambiental Rural (CAR) junto ao órgão competente.",
    "opc_art": "Regularizar a Anotação de Responsabilidade Técnica (ART) do responsável técnico.",
    "opc_agua": "Obter e manter regularizada a outorga/DUI para uso de recursos hídricos.",
    "opc_apoio": "Regularizar o uso de água para as atividades de apoio.",
    "opc_spr": "Executar as medidas de recomposição/compensação previstas na Autorização de Supressão Vegetal.",
    "opc_infr": "Adequar a infraestrutura do empreendimento conforme normas vigentes.",
    "opc_resi": "Implantar sistema adequado de gestão de resíduos sólidos e efluentes.",
    "opc_cons": "Observar as restrições aplicáveis por estar inserido em Unidade de Conservação.",
}


def montar_texto(campo, resposta):
    return REGRAS_TEXTO.get(campo, {}).get(resposta, "")


def montar_textos(processo):
    """Monta o texto de cada pergunta Sim/Não, complementado pelas respostas
    condicionais (situação do CAR, justificativas de ART/água/apoio, ARD)."""
    textos = {campo: montar_texto(campo, getattr(processo, campo)) for campo in CAMPOS_REGRA}

    if processo.opc_car == "Nao" and processo.car_situacao:
        textos["opc_car"] += CAR_SITUACAO_TEXTO.get(processo.car_situacao, "")

    if processo.opc_art == "Nao" and processo.art_justificativa:
        textos["opc_art"] += f"Justificativa: {processo.art_justificativa}. "

    if processo.opc_agua == "Sim" and processo.agua_tipo:
        textos["opc_agua"] += f"Enquadramento: {processo.agua_tipo}. "
        if processo.agua_justificativa:
            textos["opc_agua"] += f"Justificativa: {processo.agua_justificativa}. "

    if processo.opc_apoio == "Sim" and processo.apoio_tipo:
        textos["opc_apoio"] += f"Enquadramento: {processo.apoio_tipo}. "
        if processo.apoio_justificativa:
            textos["opc_apoio"] += f"Justificativa: {processo.apoio_justificativa}. "

    if processo.opc_spr == "Sim" and processo.spr_ard:
        textos["opc_spr"] += f"ARD: {processo.spr_ard}. "

    return textos


def montar_pendencias(processo):
    return [
        PENDENCIA_TEXTO[campo]
        for campo in CAMPOS_CLASSIFICAVEIS
        if getattr(processo, campo) == "Nao" and processo.classificacoes.get(campo) == "PENDENCIA"
    ]


def montar_condicionantes_geradas(processo):
    return [
        CONDICIONANTE_TEXTO[campo]
        for campo in CAMPOS_CLASSIFICAVEIS
        if getattr(processo, campo) == "Nao" and processo.classificacoes.get(campo) == "CONDICIONANTE"
    ]
