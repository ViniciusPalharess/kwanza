<template>
  <div class="campo-lista">
    <label v-if="label" class="campo-lista__label">
      {{ label }}<span v-if="obrigatorio" class="campo-lista__obrigatorio"> *</span>
    </label>
    <select
      :value="modelValue"
      :disabled="desabilitado || somenteLeitura"
      :required="obrigatorio"
      class="campo-lista__select"
      @change="aoSelecionar"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opcao in opcoes" :key="opcao.valor" :value="opcao.valor">
        {{ opcao.texto }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

export interface OpcaoCampoLista {
  valor: string | number
  texto: string
}

@Component({
  emits: ['update:modelValue'],
})
export default class CampoLista extends Vue {
  // public
  @Prop({ type: [String, Number], default: '' })
  public modelValue!: string | number
  // public
  @Prop({ type: Array, required: true })
  public opcoes!: OpcaoCampoLista[]
  // public
  @Prop({ type: String, default: '' })
  public label!: string
  // public
  @Prop({ type: String, default: '' })
  public placeholder!: string
  // public
  @Prop({ type: Boolean, default: false })
  public obrigatorio!: boolean
  // public
  @Prop({ type: Boolean, default: false })
  public desabilitado!: boolean
  // public
  @Prop({ type: Boolean, default: false })
  public somenteLeitura!: boolean

  // public
  public aoSelecionar(evento: Event) {
    const valorBruto = (evento.target as HTMLSelectElement).value
    const valor = typeof this.modelValue === 'number' ? Number(valorBruto) : valorBruto

    this.$emit('update:modelValue', valor)
  }
}
</script>

<style scoped>
.campo-lista {
  display: flex;
  flex-direction: column;
}

.campo-lista__label {
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
}

.campo-lista__obrigatorio {
  color: var(--danger-text);
}

.campo-lista__select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-family: inherit;
}
.campo-lista__select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-200);
}
.campo-lista__select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
