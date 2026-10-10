import { createRouter, createWebHistory } from 'vue-router'
import { useUsuarioStore } from '@/stores/usuario'

const routes = [
  {
    path: '/',
    name: 'cadastro',
    component: () => import('@/views/cadastro/CadastroView.vue'),
    meta: { public: true },
  },
  {
    path: '/criar-conta',
    name: 'criarConta',
    component: () => import('@/views/criarconta/CriarContaView.vue'),
    meta: { public: true },
  },
  {
    path: '/retorno-autenticacao',
    name: 'retornoAutenticacao',
    component: () => import('@/views/retornoautenticacao/RetornoAutenticacaoView.vue'),
    meta: { public: true },
  },
  {
    path: '/painel',
    name: 'painel',
    component: () => import('@/views/painel/PainelView.vue'),
  },
  {
    path: '/pessoas',
    name: 'pessoas',
    component: () => import('@/views/pessoas/PessoasView.vue'),
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: () => import('@/views/cursos/CursosView.vue'),
  },
  {
    path: '/cursos/:id',
    name: 'detalheCurso',
    component: () => import('@/views/cursos/views/DetalheCursoView.vue'),
    props: true,
  },
  {
    path: '/conteudos',
    name: 'conteudos',
    component: () => import('@/views/conteudos/ConteudosView.vue'),
    props: { title: 'Conteúdos' },
  },
  {
    path: '/frequencia',
    name: 'frequencia',
    component: () => import('@/views/frequencia/FrequenciaView.vue'),
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('@/views/ranking/RankingView.vue'),
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: () => import('@/views/relatorios/RelatoriosView.vue'),
  },
  {
    path: '/certificados',
    name: 'certificados',
    component: () => import('@/views/certificados/CertificadosView.vue'),
  },
  {
    path: '/cartas',
    name: 'cartas',
    component: () => import('@/views/cartas/CartasView.vue'),
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: () => import('@/views/configuracoes/ConfiguracoesView.vue'),
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('@/views/perfil/PerfilView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const usuarioStore = useUsuarioStore()
  if (!to.meta.public && !usuarioStore.isAuthenticated) {
    return { name: 'cadastro' }
  }
})

export default router
