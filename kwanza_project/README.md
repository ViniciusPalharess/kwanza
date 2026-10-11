### Contextos

O Projeto Kwanza é uma iniciativa do Kenia Clube, sociedade fundada há 65 anos na
zona sul de Joinville, voltada ao desenvolvimento de jovens negros por meio de
atividades presenciais de debate, oratória, leitura, formação técnica, sucessão de
lideranças, ancestralidade, pertencimento e pauta antirracista, sem viés
político-partidário. As aulas acontecem aos sábados, das 9h às 11h.

Hoje o acompanhamento dos participantes é manual e fragmentado: não há histórico
digital de evolução, o controle de frequência é feito à mão e sujeito a erros, a
emissão de certificados e cartas de recomendação não é automatizada e falta
reconhecimento contínuo que mantenha os jovens engajados. O sistema nasce para
resolver esses problemas, registrando e acompanhando a evolução dos participantes,
mapeando competências técnicas e comportamentais, controlando frequência e gerando
documentos comprobatórios para o mercado de trabalho e para a prestação de contas do
projeto perante a lei de incentivo à cultura.

Ficam fora do escopo, por ora, a integração com sistemas externos de prestação de
contas e o controle físico de entrega de pins e medalhas.

### Visão geral do sistema

O sistema web do Projeto Kwanza gerencia matrícula, frequência, conteúdos,
competências, gamificação (pontos, níveis, ranking, medalhas) e emissão de
certificados, cartas de recomendação e relatórios. A estrutura pedagógica não tem
fim: o projeto é organizado em cursos (previsão de quatro por ano), cada curso é
dividido em módulos (por exemplo, Comunicação e Oratória, com quatro sábados, ou
Criatividade e Inovação) e cada módulo concluído gera certificado. O participante
não "conclui" o Kwanza — ele acumula cursos, módulos, pontos e níveis
indefinidamente.

### Perfis de acesso (atores)

O levantamento de requisitos define quatro atores principais. O Professor gerencia
cursos, módulos, conteúdos, frequência, pontuação e certificados, sendo o único
perfil que lança presença e publica conteúdo. A Secretaria realiza matrículas e
cadastro de participantes, anexa documentos e consulta dados, com o mesmo acesso do
Professor exceto frequência e publicação de conteúdo. O Aluno (participante)
acompanha sua própria frequência, conteúdos, pontos, ranking e certificados, entrega
atividades e comenta dúvidas. O Sistema é o ator automatizado responsável por gerar
certificados, relatórios e cálculos de pontuação e nível.

Na plataforma implementada, Professor e Secretaria são tratados operacionalmente
como um perfil único de Administrador, que pode ainda ser detalhado em papéis
internos (Administrador, Coordenador, Professor, Monitor) configuráveis em
Configurações, cada um com permissões próprias sobre participantes, cursos,
frequência e pontuação.

### Requisitos funcionais (RF)

**RF0001 — Autenticar usuário.** O sistema deve permitir login com e-mail e senha.
Ator: todos os perfis. Prioridade alta.

**RF0002 — Criar conta.** O sistema deve permitir a criação de conta de acesso.
Ator: todos os perfis. Prioridade alta.

**RF0003 — Exibir painel inicial.** Após o login, o sistema deve exibir um painel com
atalhos para Frequência, Cursos, Ranking, Relatórios e Certificados, além de resumo
de pontos, horas acumuladas e frequência. Ator: todos os perfis. Prioridade alta.

**RF0004 — Cadastrar participante.** O sistema deve permitir cadastrar o participante
com nome, e-mail, data de nascimento, endereço, foto e dados dos responsáveis
(filiação, telefones). Ator: Professor, Secretaria. Prioridade alta.

**RF0005 — Anexar documentos ao participante.** O sistema deve permitir anexar ao
cadastro documentos digitalizados, como contrato de matrícula e autorização dos
responsáveis. Ator: Secretaria, Professor. Prioridade alta.

**RF0006 — Gerenciar usuários e perfis.** O sistema deve permitir cadastrar usuários
e atribuir perfil de acesso (Participante, Professor, Secretaria). Ator: Professor,
Secretaria. Prioridade alta.

**RF0007 — Gerenciar cursos.** O sistema deve permitir criar, editar e excluir
cursos. Ator: Professor. Prioridade alta.

**RF0008 — Gerenciar módulos.** O sistema deve permitir cadastrar módulos dentro de
um curso, com ementa e carga horária. Ator: Professor. Prioridade alta.

**RF0009 — Matricular participante.** O sistema deve permitir inscrever o
participante no Kwanza e matriculá-lo em cursos. Ator: Professor, Secretaria.
Prioridade alta.

**RF0010 — Registrar frequência.** O sistema deve permitir lançar a presença dos
participantes por aula, dentro de cada curso, usando um calendário que só aceita
registro em dias com aula cadastrada. Ator: Professor. Prioridade alta.

**RF0011 — Visualizar frequência geral.** O sistema deve oferecer uma tela geral,
somente leitura, com a frequência de todos os cursos. Ator: Professor, Secretaria.
Prioridade média.

**RF0012 — Consultar própria frequência.** O sistema deve permitir ao participante
acompanhar sua frequência de forma resumida. Ator: Aluno. Prioridade alta.

**RF0013 — Publicar conteúdo.** O sistema deve permitir publicar conteúdos dentro de
um curso ou módulo: texto, arquivo PDF e link de vídeo. Ator: Professor. Prioridade
alta.

**RF0014 — Acessar conteúdo.** O sistema deve permitir visualizar e baixar os
conteúdos publicados nos cursos em que o usuário participa. Ator: todos os perfis.
Prioridade alta.

**RF0015 — Comentar conteúdo.** O sistema deve oferecer, em cada conteúdo, uma área
de comentários para dúvidas. Ator: todos os perfis. Prioridade média.

**RF0016 — Entregar atividade.** O sistema deve permitir ao participante enviar
atividades e o trabalho final pelo aplicativo. Ator: Aluno. Prioridade alta.

**RF0017 — Aplicar quiz.** O sistema deve permitir criar questionários vinculados a
um conteúdo, e o participante respondê-los. Ator: Professor, Aluno. Prioridade
baixa.

**RF0018 — Atribuir pontuação.** O sistema deve permitir lançar pontos ao
participante por participação e competências demonstradas, como participação verbal
ou liderar uma atividade. Ator: Professor. Prioridade média.

**RF0019 — Exibir ranking.** O sistema deve exibir o ranking dos participantes com
acesso ao detalhe de frequência, origem dos pontos, módulos concluídos e
competências. Ator: todos os perfis. Prioridade média.

**RF0020 — Exibir níveis e medalhas.** O sistema deve exibir o nível, as medalhas e
as competências conquistadas pelo participante. Ator: todos os perfis. Prioridade
média.

**RF0021 — Emitir certificado.** O sistema deve gerar automaticamente o certificado
em PDF do módulo concluído, com ementa e carga horária. Ator: Sistema, Professor.
Prioridade alta.

**RF0022 — Consultar certificados.** O sistema deve permitir ao participante
visualizar e baixar seus certificados. Ator: Aluno. Prioridade alta.

**RF0023 — Emitir carta de recomendação.** O sistema deve gerar carta de
recomendação do participante em PDF. Ator: Professor. Prioridade média.

**RF0024 — Gerar relatório de frequência.** O sistema deve gerar relatório de
frequência por curso, por participante e por período mensal, exportável, para
prestação de contas. Ator: Professor, Secretaria. Prioridade alta.

**RF0025 — Gerar relatórios gerais.** O sistema deve gerar relatórios gerais por
curso e por participante, cobrindo participação, conclusão e pontuação. Ator:
Professor, Secretaria. Prioridade média.

**RF0026 — Gerenciar perfil do usuário.** O sistema deve permitir editar dados
pessoais e foto, exibindo nível ou cargo, data de ingresso, horas acumuladas e
sequência de presença. Ator: todos os perfis. Prioridade média.

**RF0027 — Configurar sistema.** O sistema deve permitir configurar tema claro e
escuro, dados da instituição e regras de pontos e níveis. Ator: Professor
(administrador). Prioridade baixa.

**RF0028 — Registrar liderança.** O sistema deve permitir registrar quando um
participante exerce papel de liderança em atividades ou projetos. Ator: Professor.

**RF0029 — Registrar comunicação.** O sistema deve permitir registrar participações
em apresentações, debates e atividades de comunicação. Ator: Professor.

**RF0030 — Registrar convites.** O sistema deve permitir registrar quantos novos
participantes foram convidados por cada jovem. Ator: Professor.

**RF0031 — Registrar resolução de conflitos.** O sistema deve permitir registrar
quando um participante contribui para a resolução de conflitos dentro da equipe ou
grupo. Ator: Professor.

**RF0032 — Registrar sugestões e iniciativas.** O sistema deve permitir registrar
sugestões, dinâmicas ou iniciativas propostas pelos participantes durante os
encontros. Ator: Professor.

**RF0033 — Indicar para o mercado de trabalho.** O sistema deve permitir identificar
e filtrar participantes por competências técnicas e comportamentais específicas,
facilitando a indicação qualificada para vagas de emprego. Ator: Professor,
Secretaria.

**RF0034 — Exibir destaque por competência.** O sistema deve permitir visualizar,
por categoria de competência (liderança, comunicação, resolução de conflitos, entre
outras), quais participantes se destacam em cada área. Ator: todos os perfis.

**RF0035 — Controlar carga horária de conteúdos.** O sistema deve registrar e exibir
a carga horária acumulada pelo participante na realização de cursos e materiais,
permitindo comprovação de horas para fins curriculares. Ator: Sistema, Professor,
Secretaria.

### Requisitos não funcionais (RNF)

**RNF0001 — Segurança e LGPD.** O sistema deve estar em conformidade com a LGPD,
tratando dados de menores de idade com consentimento dos responsáveis e registrando
esse consentimento.

**RNF0002 — Controle de acesso por perfil.** O acesso às funcionalidades deve ser
controlado por perfil de usuário.

**RNF0003 — Proteção de credenciais.** Senhas devem ser armazenadas com hash e as
comunicações devem usar HTTPS.

**RNF0004 — Usabilidade para público jovem.** A interface deve ser simples e
intuitiva para público jovem, com navegação por cards a partir do painel inicial.

**RNF0005 — Tema claro e escuro.** O sistema deve oferecer tema claro e escuro.

**RNF0006 — Responsividade.** O sistema deve ser responsivo e funcionar em
computadores, tablets e smartphones, incluindo navegadores de desktop e celular.

**RNF0007 — Geração de documentos em PDF.** Certificados, cartas de recomendação e
relatórios devem ser gerados em PDF, com exportação também em planilha quando
aplicável.

**RNF0008 — Upload de arquivos.** O sistema deve aceitar upload de arquivos PDF e
imagens — documentos, materiais e entregas — com limite de tamanho por arquivo.

**RNF0009 — Disponibilidade.** O sistema deve estar disponível 24 horas por dia,
exceto em períodos de manutenção, com atenção especial à disponibilidade durante os
encontros de sábado, das 9h às 11h, horário de maior uso simultâneo.

**RNF0010 — Auditoria e rastreabilidade.** Alterações em frequência e pontuação
devem ser registradas com usuário e data, garantindo rastreabilidade para prestação
de contas.

**RNF0011 — Plataforma web.** O sistema deve ser acessado por navegadores de
internet, sem necessidade de instalação.

**RNF0012 — Desempenho.** As páginas devem carregar em até três segundos em
condições normais de uso.

**RNF0013 — Integridade dos dados.** O sistema deve garantir que os dados
cadastrados não sejam perdidos ou corrompidos, com backup periódico das informações
armazenadas.

**RNF0014 — Identidade visual.** O sistema deve seguir a identidade visual do Kenia
Clube, utilizando elementos visuais relacionados à cultura africana.

**RNF0015 — Escalabilidade.** O sistema deve permitir crescimento do número de
usuários sem perda significativa de desempenho.

**RNF0016 — Compatibilidade de navegadores.** O sistema deve ser compatível com os
principais navegadores modernos.

### Regras de negócio (RN)

**RN0001 — Estrutura curso e módulo.** Todo curso é composto por um ou mais módulos;
todo conteúdo, frequência e certificado pertence a um módulo de um curso.

**RN0002 — Frequência mínima.** O participante só tem direito ao certificado do
módulo com frequência mínima de 75%.

**RN0003 — Trabalho final obrigatório.** Além da frequência mínima, o participante
deve ter entregue o trabalho final do módulo para ser certificado.

**RN0004 — Certificação por módulo.** O certificado é emitido ao final de cada
módulo, e não apenas ao fim do curso.

**RN0005 — Conteúdo do certificado.** O certificado deve conter nome do
participante, curso, módulo, ementa e carga horária cumprida.

**RN0006 — Lançamento de frequência exclusivo.** Somente o Professor pode registrar
ou alterar frequência; a Secretaria apenas visualiza. Na prática administrativa da
plataforma, esse registro fica restrito a administradores e facilitadores — o
próprio participante nunca pode registrar a própria presença.

**RN0007 — Frequência só em dia de aula.** Não é permitido registrar presença em
datas sem aula cadastrada no calendário do curso.

**RN0008 — Publicação exclusiva.** Somente o Professor pode publicar, editar ou
excluir conteúdos.

**RN0009 — Visibilidade do conteúdo.** Conteúdos são visíveis para Professor,
Secretaria e participantes matriculados no curso.

**RN0010 — Matrícula.** Professor e Secretaria podem matricular participantes; o
participante deve estar inscrito no Kwanza antes de ser matriculado em um curso.

**RN0011 — Dados restritos do participante.** O participante vê somente as próprias
informações de frequência, pontos e certificados, não acessando dados de outros
participantes, exceto a posição no ranking.

**RN0012 — Dados sensíveis.** Dados pessoais e dos responsáveis só podem ser
acessados por Professor e Secretaria.

**RN0013 — Participante menor de idade.** Para participante menor de 18 anos, é
obrigatório informar ao menos um responsável e anexar autorização assinada antes de
concluir a matrícula.

**RN0014 — Pontuação por competência.** Pontos são atribuídos por participação e por
competências demonstradas, como participação verbal ou liderar uma atividade. Cada
tipo de atividade ou comportamento registrado gera pontuação em sua respectiva
categoria — assiduidade, liderança, comunicação, convites, conclusão de cursos —
compondo a pontuação total do participante. O ranking é ordenado pelo total de
pontos.

**RN0015 — Progressão de nível.** O participante avança de nível conforme acumula
pontuação obtida por assiduidade, liderança, comunicação, convites realizados e
conclusão de atividades. Ao atingir as faixas de pontuação definidas pelos
administradores, o participante sobe de nível e pode receber medalha ou pin, também
entregue fisicamente.

**RN0016 — Projeto contínuo.** O participante não conclui o Kwanza; ele acumula
cursos, módulos, pontos e níveis indefinidamente.

**RN0017 — Calendário letivo.** As aulas ocorrem aos sábados, das 9h às 11h; a carga
horária do módulo é calculada a partir das aulas realizadas.

**RN0018 — Atribuição de competências por administrador.** Somente administradores
ou facilitadores podem registrar competências, conquistas e iniciativas nos perfis
dos participantes — o participante não pode se autoavaliar.

**RN0019 — Elegibilidade para carta de recomendação.** A carta de recomendação
somente pode ser gerada para participantes que atingirem o nível de evolução e o
conjunto de competências previamente definidos pelos administradores.

**RN0020 — Indicação para vaga de emprego.** Um participante somente pode ser
indicado para uma vaga de emprego se possuir as competências técnicas e
comportamentais compatíveis com os requisitos da oportunidade, conforme registrado
no sistema.

**RN0021 — Carga horária de cursos.** A carga horária acumulada pelo participante em
cursos e materiais somente é contabilizada após a conclusão integral do conteúdo,
registrada pelo administrador ou validada pelo próprio sistema.

**RN0022 — Perfil de participante.** Cada participante deve possuir um único
cadastro no sistema, contendo obrigatoriamente foto, dados pessoais e vinculação ao
Projeto Kwanza.

**RN0023 — Período de avaliação.** O sistema deve suportar avaliação e premiação por
período definido, semestral ou anual, permitindo que os administradores identifiquem
os participantes mais destacados ao final de cada ciclo.

**RN0024 — Controle de prestação de contas.** O sistema deve manter registros
auditáveis de presença e participação, pois o Projeto Kwanza opera com aplicação de
recursos que exige comprovação formal das atividades realizadas.

### Casos de uso (UC)

A lista a seguir resume os casos de uso identificados, cada um amarrado aos
requisitos funcionais que implementa: realizar login (todos os perfis; RF0001,
RF0002, RF0003); cadastrar participante (Secretaria; RF0004, RF0005); matricular
participante em curso (Secretaria, Professor; RF0009); gerenciar curso e módulos
(Professor; RF0007, RF0008); registrar frequência (Professor; RF0010); publicar
conteúdo (Professor; RF0013, RF0017); acessar conteúdo e entregar atividade (Aluno;
RF0014, RF0015, RF0016); atribuir pontuação (Professor; RF0018, RF0020); consultar
ranking (todos os perfis; RF0019); emitir certificado de módulo (Sistema; RF0021,
RF0022); gerar relatório de frequência (Professor, Secretaria; RF0024).

#### UC0002 — Cadastrar participante

Ator: Secretaria, ou Professor. Pré-condição: usuário autenticado com perfil
Secretaria ou Professor. Fluxo principal: o ator acessa Participantes e clica em
Adicionar; informa nome, e-mail, data de nascimento, endereço e foto; se o
participante for menor de idade, informa os dados dos responsáveis; anexa contrato
de matrícula e autorização assinada; o sistema valida e salva o cadastro. Fluxo
alternativo: participante menor sem responsável ou sem autorização leva o sistema a
bloquear a conclusão do cadastro, conforme RN0013. Pós-condição: participante
inscrito no Kwanza, apto a ser matriculado em cursos.

#### UC0005 — Registrar frequência

Ator: Professor. Pré-condição: curso com participantes matriculados e aula
cadastrada na data. Fluxo principal: o professor acessa o curso e abre Frequência;
seleciona a data no calendário; marca presença ou falta de cada participante; clica
em salvar, e o sistema registra e atualiza o percentual. Fluxo alternativo: data sem
aula cadastrada impede o registro, conforme RN0007. Pós-condição: frequência
gravada com usuário e data, conforme RNF0010.

#### UC0006 — Publicar conteúdo

Ator: Professor. Pré-condição: curso e módulo cadastrados. Fluxo principal: o
professor entra no curso e seleciona o módulo; clica em novo conteúdo e informa
título e descrição; anexa PDF ou link de vídeo, podendo opcionalmente criar um quiz
ou uma atividade com entrega; publica, e o conteúdo fica visível aos matriculados.
Pós-condição: conteúdo disponível com área de comentários.

#### UC0007 — Acessar conteúdo e entregar atividade

Ator: Aluno. Pré-condição: participante matriculado no curso. Fluxo principal: o
participante acessa Cursos e abre o módulo; visualiza o conteúdo, baixa o PDF ou
assiste ao vídeo; envia a atividade ou responde ao quiz; opcionalmente deixa uma
dúvida nos comentários. Pós-condição: entrega registrada para avaliação do
professor.

#### UC0010 — Emitir certificado de módulo

Ator: Sistema, disparado ao encerrar o módulo. Pré-condição: módulo encerrado.
Fluxo principal: o sistema verifica a frequência do participante no módulo; verifica
a entrega do trabalho final; atendidas as regras RN0002 e RN0003, gera o PDF com
ementa e carga horária; disponibiliza o certificado na aba Certificados do
participante. Fluxo alternativo: frequência abaixo de 75% ou ausência de trabalho
final impede a geração do certificado, e o motivo fica visível ao professor.
Pós-condição: certificado disponível para download.

#### UC0011 — Gerar relatório de frequência

Ator: Professor, ou Secretaria. Fluxo principal: o ator acessa Relatórios e escolhe
Frequência; filtra por curso, participante e período, como um mês; o sistema gera o
relatório e permite exportar em PDF. Pós-condição: relatório pronto para anexar à
prestação de contas do projeto de incentivo à cultura.

### Fluxos do sistema

O fluxo do participante segue a sequência: login, dashboard, cursos e conteúdos,
participação nas atividades, registro de frequência e competências, acúmulo de XP e
evolução de nível, medalhas e ranking, conclusão de cursos, certificados e cartas de
recomendação. O dashboard funciona como ponto central, reunindo progresso, metas,
pontuação, frequência, cursos, competências e conquistas; a partir dele o
participante navega para as demais áreas conforme a necessidade.

O fluxo do administrador segue a sequência: login, painel administrativo,
participantes, cursos, frequência, competências, ranking, conteúdos, relatórios,
certificados, cartas de recomendação e configurações. Esse fluxo é voltado ao
gerenciamento e acompanhamento do projeto como um todo: o administrador visualiza
indicadores gerais e executa as ações necessárias para manter atualizados os dados
dos participantes, cursos, avaliações e documentos.

### Telas e módulos do sistema

O menu lateral de navegação reúne os principais módulos do sistema — Dashboard,
Painel Administrativo, Participantes, Cursos, Conteúdos, Frequência, Competências,
Ranking, Relatórios, Certificados, Cartas e Configurações — e as opções exibidas
variam conforme o perfil e as permissões do usuário.

O Dashboard é a tela principal do participante, concentrando nível, XP, posição no
ranking, sequência de participação, pontuação, horas acumuladas, frequência,
convites realizados, próximo objetivo, medalhas, cursos em andamento, competências
e atividades recentes. O Painel Administrativo apresenta a visão geral do projeto:
quantidade de participantes, participantes ativos, cursos, horas cadastradas e
certificados emitidos, além de gráficos de evolução de XP, frequência mensal,
competências médias e ranking geral.

A área de Participantes é usada para consultar e gerenciar os jovens cadastrados,
com busca por nome ou e-mail, filtro por status e visualização de nível, pontos e
frequência. Cursos organiza as trilhas de aprendizado, com categoria, título,
descrição, professor responsável, carga horária e progresso de cada curso. Conteúdos
reúne os materiais educacionais e recursos de apoio aos cursos.

Frequência permite acompanhar a participação nos encontros, exibindo presentes,
ausentes, taxa de presença, duração média, calendário dos encontros e lista de
participantes para check-in; no perfil do participante, essa área mostra apenas os
próprios registros. Competências registra e acompanha habilidades como liderança,
comunicação, oratória, resolução de conflitos, participação, proatividade, trabalho
em equipe, responsabilidade e criatividade, permitindo ao administrador lançar novas
avaliações que passam a compor o histórico de desenvolvimento do participante.

Ranking utiliza a pontuação acumulada para classificar os participantes, destacando
os primeiros colocados e apresentando a classificação completa, com visualização por
período mensal, semestral ou anual. Relatórios apresenta análises e indicadores do
projeto, com filtros por participante, curso, período e competência, gráficos de
distribuição, inscrições, evolução de XP, frequência e horas acumuladas, e
exportação em PDF ou planilha.

Certificados permite acompanhar os documentos emitidos, participantes elegíveis e
pendências, com prévia do certificado e opção de visualizar ou baixar o PDF. Cartas
de recomendação usa os dados da jornada do participante — nível, pontuação,
frequência e competências — para gerar um documento de destaque voltado a vagas,
estágios e outras oportunidades, com opção de visualizar, imprimir ou gerar o PDF.
Configurações é destinada à gestão da instituição e da plataforma: dados do Kenia
Clube, logo, nome do projeto, usuários e permissões, níveis e faixas de XP,
aparência do sistema e recursos de backup e restauração.

### Mecânicas de gamificação

O ciclo de gamificação transforma cada ação do participante em progresso visível,
seguindo a sequência: o participante se cadastra na plataforma, realiza atividades e
missões, ganha pontos por cada tarefa concluída, sobe de nível ao acumular pontos,
recebe medalhas por conquistas especiais, aparece no ranking geral e conquista
certificados e cartas de recomendação. As mecânicas que sustentam esse ciclo são a
pontuação por cada atividade concluída, as medalhas por marcos especiais, os níveis
por acúmulo de pontos, o ranking como competição saudável entre pares, as missões
como desafios personalizados por etapa e os destaques como reconhecimento público
dos melhores participantes em cada competência.

### Permissões por perfil

No cadastro de participantes e no anexo de documentos, Professor e Secretaria têm
acesso completo; o Aluno não tem acesso a essa função. Na visualização de dados
sensíveis do participante, Professor e Secretaria veem tudo, enquanto o Aluno só vê
os próprios dados. Na matrícula em curso, Professor e Secretaria podem matricular; o
Aluno não pode. No gerenciamento de cursos e módulos e no lançamento de frequência,
apenas o Professor tem acesso. Na visualização de frequência, Professor e Secretaria
veem todos os participantes, enquanto o Aluno vê apenas a própria frequência.

Na publicação de conteúdo, apenas o Professor tem acesso; na visualização e
comentário de conteúdo, Professor e Secretaria veem tudo e o Aluno vê os cursos em
que está matriculado. Na entrega de atividades, apenas o Aluno tem acesso. Na
atribuição de pontos, apenas o Professor tem acesso. No ranking, Professor e
Secretaria veem a classificação completa, e o Aluno vê as posições gerais mais o
próprio detalhe. Na emissão de certificados e cartas, apenas o Professor emite, e o
Aluno só baixa os próprios documentos. Na geração de relatórios, Professor e
Secretaria têm acesso; o Aluno não. Nas configurações do sistema, apenas o Professor
(administrador) tem acesso completo; o Aluno só configura o próprio perfil e o tema.
