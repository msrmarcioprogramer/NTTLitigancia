# Litigância Abusiva

Aplicação de apoio à análise de processos com possíveis indícios de litigância abusiva. O sistema organiza documentos, indicadores e pareceres para apoiar a avaliação do magistrado.

## Funcionalidades por tela

### 1. Login

Tela inicial de acesso ao sistema.

- Solicita usuário e senha.
- Valida as credenciais de demonstração.
- Libera o acesso às telas internas somente após o login.
- Apresenta a identidade institucional e as marcas no rodapé.

> Credenciais da demonstração: `user001` / `demo2026`.

### 2. Enviar processo

Tela para inclusão de um novo processo na aplicação.

- Permite selecionar um arquivo PDF.
- Aceita arquivos de até 50 MB.
- Tenta identificar automaticamente o número do processo na primeira página.
- Permite informar ou corrigir manualmente o número do processo.
- Registra o usuário responsável pelo envio.
- Salva o PDF e disponibiliza o processo na lista de arquivos enviados.

### 3. Casos para análise

Tela principal de acompanhamento dos processos recebidos.

- Lista os processos ordenados pelo indicador de risco.
- Exibe número, assunto, classe, risco, similaridade, processo relacionado e status.
- Permite filtrar por status: todos, pendentes, em análise, confirmados ou rejeitados.
- Permite abrir a análise detalhada de cada processo.

### 4. Comparação entre processos

Tela de análise detalhada de um processo recebido e do processo mais semelhante encontrado na base.

- Exibe os dados processuais dos dois processos.
- Apresenta partes, advogados, movimentações, resumo e trecho da petição.
- Identifica coincidências entre os processos.
- Mostra o indicador de risco e o percentual de similaridade.
- Lista as evidências encontradas e seus níveis de relevância.
- Apresenta a explicação gerada pela análise automatizada.
- Permite abrir os PDFs dos processos lado a lado.
- Permite seguir para o registro do parecer.

### 5. Leitura dos processos

Tela dedicada à leitura dos documentos originais.

- Exibe o processo analisado e o processo relacionado em colunas paralelas.
- Permite rolar cada PDF de forma independente.
- Facilita a consulta simultânea das páginas dos dois documentos.
- Localiza os PDFs pelo número dos processos usados na comparação.
- Informa quando algum documento ainda não está disponível.
- Possui retorno direto para a tela de comparação.

### 6. Avaliação e parecer

Tela para a decisão final do magistrado sobre o caso.

- Mostra um resumo do processo, risco, similaridade e evidências principais.
- Permite confirmar a existência de litigância abusiva.
- Permite rejeitar a indicação e manter o trâmite normal.
- Solicita um parecer com fundamentação de, no mínimo, 30 caracteres.
- Registra a decisão, o texto do parecer, a data e o responsável.
- Em processos já avaliados, apresenta o parecer registrado e o resultado final.

### 7. Histórico de avaliações

Tela de consulta dos processos que já passaram por avaliação.

- Lista processos aguardando avaliação, confirmados e rejeitados.
- Permite filtrar os resultados por situação.
- Permite buscar por número do processo ou assunto.
- Exibe risco, similaridade, decisão e data da avaliação.
- Permite expandir cada item para consultar a explicação da análise e o parecer registrado.

### 8. Visão CODEX

Painel com indicadores gerais da base de litigância e dos processos recebidos.

- Exibe o total de processos na base.
- Apresenta a quantidade de casos identificados como abusivos.
- Mostra o total de processos recebidos e analisados.
- Informa quantos processos ainda aguardam avaliação.
- Apresenta a entrada de processos por mês em gráfico.
- Mostra a distribuição da base por classe processual.
- Resume a situação dos processos recebidos por status.

## Menu principal

Após o login, o menu lateral permite acessar:

1. Enviar processo
2. Casos para análise
3. Histórico de avaliações
4. Visão CODEX

A comparação, a leitura dos documentos e o registro do parecer são acessados a partir de um caso específico.
