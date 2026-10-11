<template>
  <button
    :type="tipo"
    :disabled="desabilitado || carregando"
    :class="[
      'botao',
      acaoClasse,
      tamanhoClasse,
      {
        'botao--somente-icone': somenteIcone,
        'botao--largura-total': larguraTotal,
      },
    ]"
    @click="aoClicar"
  >
    <slot name="icone"></slot>
    <span v-if="!somenteIcone" class="botao__descricao">
      <slot>{{ carregando && descricaoCarregando ? descricaoCarregando : descricao }}</slot>
    </span>
  </button>
</template>

<script lang="ts">
import { AcaoBotao } from '@/enums/AcaoBotao'
import { TamanhoBotao } from '@/enums/TamanhoBotao'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  emits: ['click'],
})
export default class Botao extends Vue {
  // public
  @Prop({ type: String, default: AcaoBotao.padrao })
  public acao!: AcaoBotao
  // public
  @Prop({ type: String, default: 'button' })
  public tipo!: 'button' | 'submit'
  // public
  @Prop({ type: String, default: TamanhoBotao.medio })
  public tamanho!: TamanhoBotao
  // public
  @Prop({ type: Boolean, default: false })
  public desabilitado!: boolean
  // public
  @Prop({ type: Boolean, default: false })
  public carregando!: boolean
  // public
  @Prop({ type: String, default: '' })
  public descricao!: string
  // public
  @Prop({ type: String, default: '' })
  public descricaoCarregando!: string
  // public
  @Prop({ type: Boolean, default: false })
  public larguraTotal!: boolean
  // public
  @Prop({ type: Boolean, default: false })
  public somenteIcone!: boolean

  // public
  public aoClicar(evento: MouseEvent) {
    this.$emit('click', evento)
  }

  // public
  public get acaoClasse() {
    switch (this.acao) {
      case AcaoBotao.salvar:
        return 'botao--primario'
      case AcaoBotao.excluir:
        return 'botao--perigo'
      case AcaoBotao.cancelar:
      case AcaoBotao.fechar:
        return 'botao--secundario'
      case AcaoBotao.adicionar:
        return 'botao--adicionar'
      case AcaoBotao.texto:
        return 'botao--texto'
      default:
        return 'botao--contorno'
    }
  }

  // public
  public get tamanhoClasse() {
    switch (this.tamanho) {
      case TamanhoBotao.pequeno:
        return 'botao--pequeno'
      case TamanhoBotao.grande:
        return 'botao--grande'
      default:
        return 'botao--medio'
    }
  }
}
</script>

<style scoped>
.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    opacity 0.15s ease;
}
.botao:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.botao--pequeno {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}
.botao--medio {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
.botao--grande {
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
}

.botao--primario {
  background-color: var(--accent);
  color: #fff;
}
.botao--primario:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

.botao--secundario {
  background-color: transparent;
  border-color: var(--border);
  color: var(--text-secondary);
  font-weight: 500;
}
.botao--secundario:hover:not(:disabled) {
  background-color: var(--surface-hover);
}

.botao--perigo {
  background-color: var(--danger);
  color: #fff;
}
.botao--perigo:hover:not(:disabled) {
  background-color: var(--danger-hover);
}

.botao--contorno {
  background-color: transparent;
  border-color: var(--border);
  color: var(--text-primary);
  font-weight: 500;
}
.botao--contorno:hover:not(:disabled) {
  background-color: var(--surface-hover);
}

.botao--adicionar {
  background-color: var(--accent);
  color: #fff;
}
.botao--adicionar:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

.botao--texto {
  background-color: transparent;
  border-color: transparent;
  color: var(--text-secondary);
  font-weight: 500;
  padding-left: 0;
  padding-right: 0;
}
.botao--texto:hover:not(:disabled) {
  color: var(--text-primary);
}

.botao--somente-icone {
  padding: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  border-color: transparent;
  background-color: transparent;
}
.botao--somente-icone.botao--pequeno {
  width: 1.75rem;
  height: 1.75rem;
}
.botao--somente-icone.botao--grande {
  width: 2.75rem;
  height: 2.75rem;
}

.botao--somente-icone.botao--secundario,
.botao--somente-icone.botao--contorno,
.botao--somente-icone.botao--texto {
  color: var(--text-faint);
}
.botao--somente-icone.botao--secundario:hover:not(:disabled),
.botao--somente-icone.botao--contorno:hover:not(:disabled),
.botao--somente-icone.botao--texto:hover:not(:disabled) {
  color: var(--text-secondary);
  background-color: var(--surface-hover);
}

.botao--somente-icone.botao--perigo {
  background-color: transparent;
  color: var(--danger-text);
}
.botao--somente-icone.botao--perigo:hover:not(:disabled) {
  background-color: var(--danger-subtle-bg);
}

.botao--somente-icone.botao--primario,
.botao--somente-icone.botao--adicionar {
  background-color: transparent;
  color: var(--accent-text);
}
.botao--somente-icone.botao--primario:hover:not(:disabled),
.botao--somente-icone.botao--adicionar:hover:not(:disabled) {
  background-color: var(--accent-subtle-bg);
}

.botao--largura-total {
  width: 100%;
}

.botao__descricao {
  display: inline-flex;
  align-items: center;
}
</style>
