import type { CaseUnderReview, ReferenceProcess } from '../types';

export const referenceBase: ReferenceProcess[] = [
  {
    id: 'R1',
    numero: '0004412-90.2024.8.26.0100',
    assunto: 'Cobrança de tarifa bancária',
    classe: 'Procedimento Comum Cível',
    categoriaClasse: 'civel',
    foro: 'Foro Central Cível - São Paulo/SP',
    distribuicao: '14/03/2024',
    valorCausa: 12000,
    partes: [
      { papel: 'Autor', nome: 'Helena Rocha Prado', advogado: 'OAB/SP 318.406' },
      { papel: 'Réu', nome: 'Banco Vértice S.A.', advogado: 'OAB/SP 150.227' },
    ],
    movimentos: [
      { data: '14/03/2024', descricao: 'Distribuição por sorteio' },
      { data: '19/03/2024', descricao: 'Citação do réu' },
      { data: '02/04/2024', descricao: 'Sentença: pedido julgado improcedente' },
    ],
    resumo: 'Pedido de restituição de tarifas de conta corrente cobradas sem contratação expressa.',
    trechoPeticao:
      'A autora requer a devolução em dobro das tarifas de manutenção de conta, com base em suposta cobrança indevida desde 2021...',
    classificadoComoAbusivo: true,
  },
  {
    id: 'R2',
    numero: '0018830-12.2023.8.26.0053',
    assunto: 'Inscrição indevida em cadastro de inadimplentes',
    classe: 'Procedimento Comum Cível',
    categoriaClasse: 'civel',
    foro: 'Foro Regional de Santo Amaro - São Paulo/SP',
    distribuicao: '22/11/2023',
    valorCausa: 20000,
    partes: [
      { papel: 'Autor', nome: 'Cláudio Nascimento Lima', advogado: 'OAB/SP 402.113' },
      { papel: 'Réu', nome: 'Financeira Sol Crédito Ltda.', advogado: 'OAB/SP 221.090' },
    ],
    movimentos: [
      { data: '22/11/2023', descricao: 'Distribuição por sorteio' },
      { data: '28/11/2023', descricao: 'Citação do réu' },
      { data: '12/02/2024', descricao: 'Acordo homologado' },
    ],
    resumo: 'Alegação de negativação indevida com pedido de indenização por dano moral.',
    trechoPeticao:
      'O autor sustenta que nunca contratou o serviço que originou a dívida e pede indenização de R$ 20.000,00...',
    classificadoComoAbusivo: true,
  },
  {
    id: 'R3',
    numero: '0002291-66.2024.8.26.0019',
    assunto: 'Indenização por dano moral - falha na prestação de serviço',
    classe: 'Procedimento Comum Cível',
    categoriaClasse: 'civel',
    foro: 'Foro de Americana - Americana/SP',
    distribuicao: '08/02/2024',
    valorCausa: 15000,
    partes: [
      { papel: 'Autor', nome: 'Renata Souza Campos', advogado: 'OAB/SP 412.998' },
      { papel: 'Réu', nome: 'Operadora Telefônica Brasil S.A.', advogado: 'OAB/SP 109.774' },
    ],
    movimentos: [
      { data: '08/02/2024', descricao: 'Distribuição por sorteio' },
      { data: '13/02/2024', descricao: 'Citação do réu' },
      { data: '26/02/2024', descricao: 'Contestação apresentada' },
      { data: '10/05/2024', descricao: 'Extinção por desistência' },
    ],
    resumo: 'Queixa de falhas recorrentes no serviço de telefonia com pedido de dano moral.',
    trechoPeticao:
      'A autora relata interrupções constantes no serviço e requer indenização por dano moral no valor de R$ 15.000,00...',
    classificadoComoAbusivo: true,
  },
  {
    id: 'R4',
    numero: '0009987-21.2022.8.26.0114',
    assunto: 'Fixação de alimentos',
    classe: 'Ação de Alimentos',
    categoriaClasse: 'familia',
    foro: 'Vara de Família - Campinas/SP',
    distribuicao: '05/09/2022',
    valorCausa: 6600,
    partes: [
      { papel: 'Autor', nome: 'Lúcia Ferraz Monteiro', advogado: 'OAB/SP 198.560' },
      { papel: 'Réu', nome: 'Paulo Ferraz Monteiro', advogado: 'OAB/SP 255.031' },
    ],
    movimentos: [
      { data: '05/09/2022', descricao: 'Distribuição por sorteio' },
      { data: '12/09/2022', descricao: 'Fixação de alimentos provisórios' },
      { data: '30/01/2023', descricao: 'Sentença de procedência' },
    ],
    resumo: 'Ação de alimentos em favor de filho menor, com pedido de fixação em 30% do salário mínimo.',
    trechoPeticao:
      'A requerente pede a fixação de alimentos provisórios e definitivos, considerando as necessidades do menor...',
    classificadoComoAbusivo: false,
  },
  {
    id: 'R5',
    numero: '0021056-35.2024.8.26.0002',
    assunto: 'Execução de título extrajudicial - cheque',
    classe: 'Execução de Título Extrajudicial',
    categoriaClasse: 'execucao',
    foro: 'Foro Regional de Santana - São Paulo/SP',
    distribuicao: '17/07/2024',
    valorCausa: 8450,
    partes: [
      { papel: 'Autor', nome: 'Comercial Alvorada Ltda.', advogado: 'OAB/SP 277.345' },
      { papel: 'Réu', nome: 'Investimentos Norte Eireli', advogado: 'OAB/SP 340.612' },
    ],
    movimentos: [
      { data: '17/07/2024', descricao: 'Distribuição por sorteio' },
      { data: '29/07/2024', descricao: 'Citação por edital' },
      { data: '15/10/2024', descricao: 'Penhora de ativos bancários' },
    ],
    resumo: 'Cobrança de cheque sem fundos com pedido de penhora on-line.',
    trechoPeticao:
      'A exequente apresenta cheque no valor de R$ 8.450,00, não honrado na apresentação, e requer a penhora de ativos...',
    classificadoComoAbusivo: false,
  },
  {
    id: 'R6',
    numero: '0005514-08.2025.8.26.0100',
    assunto: 'Indenização por dano moral - atraso de voo',
    classe: 'Procedimento do Juizado Especial Cível',
    categoriaClasse: 'juizado',
    foro: 'Juizado Especial Cível Central - São Paulo/SP',
    distribuicao: '03/04/2025',
    valorCausa: 10000,
    partes: [
      { papel: 'Autor', nome: 'Diego Araújo Martins', advogado: 'OAB/SP 433.017' },
      { papel: 'Réu', nome: 'Companhia Aérea Céu Azul S.A.', advogado: 'OAB/SP 187.902' },
    ],
    movimentos: [
      { data: '03/04/2025', descricao: 'Distribuição por sorteio' },
      { data: '09/04/2025', descricao: 'Citação do réu' },
      { data: '21/05/2025', descricao: 'Audiência de conciliação sem acordo' },
    ],
    resumo: 'Atraso de voo com pedido de indenização por dano moral e material.',
    trechoPeticao:
      'O autor alega atraso de 6 horas no voo e pede indenização por dano moral de R$ 10.000,00...',
    classificadoComoAbusivo: true,
  },
];

export const casesUnderReview: CaseUnderReview[] = [
  {
    id: 'C1',
    recebidoEm: '10/11/2026',
    processo: {
      id: 'C1',
      numero: '0012457-18.2026.8.26.0100',
      assunto: 'Indenização por dano moral - falha na prestação de serviço',
      classe: 'Procedimento Comum Cível',
      categoriaClasse: 'civel',
      foro: 'Foro Central Cível - São Paulo/SP',
      distribuicao: '09/11/2026',
      valorCausa: 15000,
      partes: [
        { papel: 'Autor', nome: 'Renata Souza Campos', advogado: 'OAB/SP 412.998' },
        { papel: 'Réu', nome: 'Operadora Telefônica Brasil S.A.', advogado: 'OAB/SP 109.774' },
      ],
      movimentos: [
        { data: '09/11/2026', descricao: 'Distribuição por sorteio' },
        { data: '10/11/2026', descricao: 'Petição inicial juntada' },
        { data: '10/11/2026', descricao: 'Concluso para despacho' },
      ],
      resumo: 'Queixa de interrupções no serviço de telefonia com pedido de dano moral no mesmo valor de outro processo.',
      trechoPeticao:
        'A autora relata interrupções constantes no serviço e requer indenização por dano moral no valor de R$ 15.000,00, conforme jurisprudência...',
    },
    analise: {
      riskScore: 92,
      similaridade: 0.91,
      processoRelacionadoId: 'R3',
      evidencias: [
        { titulo: 'Mesmo advogado', detalhe: 'OAB/SP 412.998 atua nos dois processos.', peso: 'alta' },
        { titulo: 'Mesmo valor da causa', detalhe: 'R$ 15.000,00 em ambos os processos.', peso: 'alta' },
        { titulo: 'Texto semelhante', detalhe: '87% dos parágrafos da petição têm conteúdo equivalente.', peso: 'alta' },
        { titulo: 'Mesmo réu', detalhe: 'Operadora Telefônica Brasil S.A. é parte nos dois casos.', peso: 'media' },
      ],
      explicacaoIA:
        'A petição inicial reproduz a estrutura e boa parte do texto de um processo já encerrado por desistência, alterando apenas os dados da parte. O mesmo advogado e o mesmo valor da causa reforçam o padrão. Recomenda-se verificar se houve falha real do serviço antes de qualquer deliberação.',
    },
    status: 'pendente',
  },
  {
    id: 'C2',
    recebidoEm: '08/11/2026',
    processo: {
      id: 'C2',
      numero: '0009821-03.2026.8.26.0100',
      assunto: 'Cobrança de tarifa bancária',
      classe: 'Procedimento Comum Cível',
      categoriaClasse: 'civel',
      foro: 'Foro Central Cível - São Paulo/SP',
      distribuicao: '07/11/2026',
      valorCausa: 12000,
      partes: [
        { papel: 'Autor', nome: 'Helena Rocha Prado', advogado: 'OAB/SP 318.407' },
        { papel: 'Réu', nome: 'Banco Vértice S.A.', advogado: 'OAB/SP 150.227' },
      ],
      movimentos: [
        { data: '07/11/2026', descricao: 'Distribuição por sorteio' },
        { data: '08/11/2026', descricao: 'Petição inicial juntada' },
      ],
      resumo: 'Pedido de devolução de tarifas de conta corrente cobradas sem contratação expressa.',
      trechoPeticao:
        'A autora requer a devolução em dobro das tarifas de manutenção de conta, com base em suposta cobrança indevida desde 2021...',
    },
    analise: {
      riskScore: 78,
      similaridade: 0.84,
      processoRelacionadoId: 'R1',
      evidencias: [
        { titulo: 'Mesma autora', detalhe: 'Helena Rocha Prado com OAB distinta da registrada anteriormente.', peso: 'media' },
        { titulo: 'Mesmo réu e valor', detalhe: 'Banco Vértice S.A. e R$ 12.000,00 em ambos os processos.', peso: 'alta' },
        { titulo: 'Texto semelhante', detalhe: '74% do conteúdo da petição coincide com o processo de referência.', peso: 'media' },
      ],
      explicacaoIA:
        'O pedido e a argumentação são quase idênticos aos de um processo já julgado improcedente. A autora aparece como parte em outro caso com o mesmo réu, o que pode indicar repetição de demanda.',
    },
    status: 'em_analise',
  },
  {
    id: 'C3',
    recebidoEm: '06/11/2026',
    processo: {
      id: 'C3',
      numero: '0034410-77.2026.8.26.0002',
      assunto: 'Execução de título extrajudicial - nota promissória',
      classe: 'Execução de Título Extrajudicial',
      categoriaClasse: 'execucao',
      foro: 'Foro Regional de Santana - São Paulo/SP',
      distribuicao: '05/11/2026',
      valorCausa: 8450,
      partes: [
        { papel: 'Autor', nome: 'Distribuidora Monte Verde Ltda.', advogado: 'OAB/SP 296.441' },
        { papel: 'Réu', nome: 'Investimentos Norte Eireli', advogado: 'OAB/SP 340.612' },
      ],
      movimentos: [
        { data: '05/11/2026', descricao: 'Distribuição por sorteio' },
        { data: '06/11/2026', descricao: 'Título executivo juntado' },
      ],
      resumo: 'Cobrança de nota promissória vencida com pedido de penhora on-line.',
      trechoPeticao:
        'A exequente apresenta nota promissória no valor de R$ 8.450,00 e requer a penhora de ativos do executado...',
    },
    analise: {
      riskScore: 41,
      similaridade: 0.52,
      processoRelacionadoId: 'R5',
      evidencias: [
        { titulo: 'Mesmo réu', detalhe: 'Investimentos Norte Eireli é parte nos dois processos.', peso: 'media' },
        { titulo: 'Valor próximo', detalhe: 'Valores idênticos, mas títulos e autores diferentes.', peso: 'baixa' },
      ],
      explicacaoIA:
        'Há baixa semelhança textual. A coincidência de réu e de valor é o único sinal relevante e, isoladamente, não indica litigância abusiva.',
    },
    status: 'pendente',
  },
  {
    id: 'C4',
    recebidoEm: '03/11/2026',
    processo: {
      id: 'C4',
      numero: '0015573-40.2026.8.26.0114',
      assunto: 'Fixação de alimentos',
      classe: 'Ação de Alimentos',
      categoriaClasse: 'familia',
      foro: 'Vara de Família - Campinas/SP',
      distribuicao: '02/11/2026',
      valorCausa: 6600,
      partes: [
        { papel: 'Autor', nome: 'Juliana Ortega Lopes', advogado: 'OAB/SP 365.218' },
        { papel: 'Réu', nome: 'Marcelo Ortega Lopes', advogado: 'OAB/SP 201.563' },
      ],
      movimentos: [
        { data: '02/11/2026', descricao: 'Distribuição por sorteio' },
        { data: '04/11/2026', descricao: 'Pedido de alimentos provisórios' },
      ],
      resumo: 'Pedido de alimentos para filho menor, com base na renda declarada do genitor.',
      trechoPeticao:
        'A requerente pede a fixação de alimentos provisórios no percentual de 30% do salário mínimo...',
    },
    analise: {
      riskScore: 15,
      similaridade: 0.23,
      processoRelacionadoId: 'R4',
      evidencias: [
        { titulo: 'Assunto comum', detalhe: 'Mesma classe processual, sem outros vínculos entre as partes.', peso: 'baixa' },
      ],
      explicacaoIA:
        'Não foram encontrados sinais relevantes de repetição. O processo relacionado tem assunto parecido, porém partes e fatos distintos.',
    },
    status: 'confirmada',
    parecer:
      'Trata-se de demanda regular de alimentos, sem indícios de abuso processual. Mantido o trâmite normal.',
    avaliadoEm: '05/11/2026',
    magistrado: 'Dra. Patrícia Lacerda',
  },
  {
    id: 'C5',
    recebidoEm: '31/10/2026',
    processo: {
      id: 'C5',
      numero: '0007710-29.2026.8.26.0100',
      assunto: 'Indenização por dano moral - inscrição indevida',
      classe: 'Procedimento Comum Cível',
      categoriaClasse: 'civel',
      foro: 'Foro Central Cível - São Paulo/SP',
      distribuicao: '30/10/2026',
      valorCausa: 20000,
      partes: [
        { papel: 'Autor', nome: 'Cláudio Nascimento Lima', advogado: 'OAB/SP 402.113' },
        { papel: 'Réu', nome: 'Financeira Sol Crédito Ltda.', advogado: 'OAB/SP 221.090' },
      ],
      movimentos: [
        { data: '30/10/2026', descricao: 'Distribuição por sorteio' },
        { data: '31/10/2026', descricao: 'Petição inicial juntada' },
      ],
      resumo: 'Alegação de negativação indevida com pedido de indenização por dano moral.',
      trechoPeticao:
        'O autor sustenta que nunca contratou o serviço que originou a dívida e pede indenização de R$ 20.000,00...',
    },
    analise: {
      riskScore: 67,
      similaridade: 0.73,
      processoRelacionadoId: 'R2',
      evidencias: [
        { titulo: 'Mesmas partes', detalhe: 'Cláudio Nascimento Lima e Financeira Sol Crédito Ltda. já litigaram.', peso: 'alta' },
        { titulo: 'Mesmo valor da causa', detalhe: 'R$ 20.000,00 em ambos os processos.', peso: 'media' },
      ],
      explicacaoIA:
        'As mesmas partes e o mesmo valor aparecem em um processo anterior já encerrado por acordo. A repetição de demanda entre as mesmas partes merece análise do histórico.',
    },
    status: 'rejeitada',
    parecer:
      'O acordo anterior tratou de outra dívida. Os fatos são distintos e não há indício de abuso.',
    avaliadoEm: '04/11/2026',
    magistrado: 'Dra. Patrícia Lacerda',
  },
];

export const entradasPorMes = [
  { mes: 'Jan', base: 96, recebidos: 0 },
  { mes: 'Fev', base: 104, recebidos: 0 },
  { mes: 'Mar', base: 112, recebidos: 0 },
  { mes: 'Abr', base: 98, recebidos: 0 },
  { mes: 'Mai', base: 121, recebidos: 0 },
  { mes: 'Jun', base: 109, recebidos: 0 },
  { mes: 'Jul', base: 117, recebidos: 0 },
  { mes: 'Ago', base: 125, recebidos: 0 },
  { mes: 'Set', base: 118, recebidos: 0 },
  { mes: 'Out', base: 102, recebidos: 3 },
  { mes: 'Nov', base: 74, recebidos: 2 },
];

export const distribuicaoPorClasse = [
  { categoria: 'civel', label: 'Cível', total: 620 },
  { categoria: 'execucao', label: 'Execução', total: 210 },
  { categoria: 'familia', label: 'Família', total: 180 },
  { categoria: 'juizado', label: 'Juizado', total: 96 },
  { categoria: 'sumarissimo', label: 'Sumaríssimo', total: 40 },
  { categoria: 'penal', label: 'Penal', total: 30 },
] as const;

export const abusivosNaBase = 214;
