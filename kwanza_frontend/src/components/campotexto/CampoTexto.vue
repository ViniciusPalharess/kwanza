<template>
  <div class="campo-texto">
    <label v-if="label" class="campo-texto__label">
      {{ label }}<span v-if="obrigatorio" class="campo-texto__obrigatorio"> *</span>
    </label>
    <textarea
      v-if="multilinha"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="desabilitado"
      :readonly="somenteLeitura"
      :required="obrigatorio"
      :rows="linhas"
      class="campo-texto__input"
      @input="aoDigitar"
    ></textarea>
    <input
      v-else
      :type="tipo"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="desabilitado"
      :readonly="somenteLeitura"
      :required="obrigatorio"
      :list="lista || undefined"
      :min="min ?? undefined"
      :max="max ?? undefined"
      class="campo-texto__input"
      @input="aoDigitar"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  emits: ['update:modelValue'],
})
export default class CampoTexto extends Vue {
  // public
  @Prop({ type: [String, Number], default: '' })
  public modelValue!: string | number
  // public
  @Prop({ type: String, default: '' })
  public label!: string
  // public
  @Prop({ type: String, default: 'text' })
  public tipo!: string
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
  @Prop({ type: String, default: '' })
  public lista!: string
  // public
  @Prop({ type: [String, Number], default: null })
  public min!: string | number | null
  // public
  @Prop({ type: [String, Number], default: null })
  public max!: string | number | null
  // public
  @Prop({ type: Boolean, default: false })
  public multilinha!: boolean
  // public
  @Prop({ type: Number, default: 3 })
  public linhas!: number

  // public
  public aoDigitar(evento: Event) {
    const valorBruto = (evento.target as HTMLInputElement | HTMLTextAreaElement).value
    const valor = this.tipo === 'number' && valorBruto !== '' ? Number(valorBruto) : valorBruto

    this.$emit('update:modelValue', valor)
  }
}
</script>

<style scoped>
.campo-texto {
  display: flex;
  flex-direction: column;
}

.campo-texto__label {
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
}

.campo-texto__obrigatorio {
  color: var(--danger-text);
}

.campo-texto__input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-family: inherit;
}
.campo-texto__input::placeholder {
  color: var(--text-placeholder);
}
.campo-texto__input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-200);
}
.campo-texto__input:disabled {
  opacity: 0.6;
}
.campo-texto__input[readonly] {
  background-color: var(--surface-muted);
  cursor: default;
}
textarea.campo-texto__input {
  resize: vertical;
}
</style>
