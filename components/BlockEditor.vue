<template>
  <div class="block-editor">
    <!-- Texto plano (cuando no es JSON válido) -->
    <p v-if="isPlainText" class="plain-text">{{ plainText }}</p>

    <!-- Bloques de EditorJS -->
    <template v-else v-for="block in blocks" :key="block.id">

      <!-- Párrafo -->
      <p v-if="block.type === 'paragraph'" v-html="block.data.text"></p>

      <!-- Encabezados -->
      <h2 v-else-if="block.type === 'header' && block.data.level === 2" v-html="block.data.text"></h2>
      <h3 v-else-if="block.type === 'header' && block.data.level === 3" v-html="block.data.text"></h3>
      <h4 v-else-if="block.type === 'header' && block.data.level >= 4" v-html="block.data.text"></h4>

      <!-- Lista -->
      <ul v-else-if="block.type === 'list' && block.data.style === 'unordered'">
        <li v-for="item in block.data.items" :key="item" v-html="item"></li>
      </ul>
      <ol v-else-if="block.type === 'list' && block.data.style === 'ordered'">
        <li v-for="item in block.data.items" :key="item" v-html="item"></li>
      </ol>

      <!-- Lista anidada (nestedlist) -->
      <ul v-else-if="block.type === 'nestedlist' && block.data.style === 'unordered'">
        <li v-for="item in block.data.items" :key="item.content">
          <span v-html="item.content"></span>
          <ul v-if="item.items && item.items.length">
            <li v-for="sub in item.items" :key="sub.content" v-html="sub.content"></li>
          </ul>
        </li>
      </ul>
      <ol v-else-if="block.type === 'nestedlist' && block.data.style === 'ordered'">
        <li v-for="item in block.data.items" :key="item.content">
          <span v-html="item.content"></span>
        </li>
      </ol>

      <!-- Imagen -->
      <figure v-else-if="block.type === 'image'" class="be-image">
        <NuxtImg :src="block.data.file?.url || block.data.url" :alt="block.data.caption || ''" />
        <figcaption v-if="block.data.caption">{{ block.data.caption }}</figcaption>
      </figure>

      <!-- Quote -->
      <blockquote v-else-if="block.type === 'quote'">
        <p v-html="block.data.text"></p>
        <cite v-if="block.data.caption">{{ block.data.caption }}</cite>
      </blockquote>

      <!-- Delimiter -->
      <hr v-else-if="block.type === 'delimiter'" class="be-delimiter" />

      <!-- Table -->
      <div v-else-if="block.type === 'table'" class="be-table">
        <table>
          <thead v-if="block.data.withHeadings">
            <tr>
              <th v-for="cell in block.data.content[0]" :key="cell" v-html="cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in (block.data.withHeadings ? block.data.content.slice(1) : block.data.content)" :key="ri">
              <td v-for="cell in row" :key="cell" v-html="cell"></td>
            </tr>
          </tbody>
        </table>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: any // El campo descripcion_completa (puede ser JSON de EditorJS o texto plano)
}>()

// Parsear contenido de forma segura
const parsedContent = computed(() => {
  if (!props.content) {
    return { isPlainText: false, blocks: [], plainText: '' }
  }

  // Si es string, intentar parsear como JSON
  if (typeof props.content === 'string') {
    try {
      const data = JSON.parse(props.content)
      return { isPlainText: false, blocks: data?.blocks ?? [], plainText: '' }
    } catch {
      // No es JSON válido, tratar como texto plano
      return { isPlainText: true, blocks: [], plainText: props.content }
    }
  }

  // Si es objeto, usar directamente
  return { isPlainText: false, blocks: props.content?.blocks ?? [], plainText: '' }
})

const isPlainText = computed(() => parsedContent.value.isPlainText)
const plainText = computed(() => parsedContent.value.plainText)
const blocks = computed(() => parsedContent.value.blocks)
</script>

<style scoped>
.block-editor { font-size: 16px; line-height: 1.85; color: var(--texto-suave); font-weight: 300; }
.block-editor :deep(b), .block-editor :deep(strong) { font-weight: 700; color: var(--texto); }
.block-editor :deep(i), .block-editor :deep(em) { font-style: italic; }
.block-editor :deep(u) { text-decoration: underline; }
.block-editor :deep(mark) { background: rgba(200,134,42,0.2); padding: 1px 4px; }
.block-editor :deep(a) { color: var(--acento); text-decoration: underline; }
.block-editor p { margin-bottom: 18px; }
.block-editor h2 { font-family: var(--f-display); font-size: 28px; font-weight: 800; text-transform: uppercase; color: var(--texto); margin: 32px 0 12px; }
.block-editor h3 { font-family: var(--f-display); font-size: 22px; font-weight: 700; color: var(--texto); margin: 24px 0 10px; }
.block-editor h4 { font-size: 18px; font-weight: 600; color: var(--texto); margin: 20px 0 8px; }
.block-editor ul, .block-editor ol { padding-left: 22px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 7px; }
.block-editor ul { list-style: none; padding-left: 0; }
.block-editor ul li { padding-left: 18px; position: relative; }
.block-editor ul li::before { content: '→'; position: absolute; left: 0; color: var(--acento); font-size: 13px; }
.block-editor ul ul { margin-top: 7px; padding-left: 18px; }
.block-editor ol { list-style: decimal; }
.block-editor blockquote { border-left: 3px solid var(--acento); padding: 16px 24px; margin: 24px 0; background: rgba(200,134,42,0.05); }
.block-editor blockquote p { margin: 0; font-style: italic; }
.block-editor blockquote cite { font-size: 12px; color: var(--borde-medio); margin-top: 8px; display: block; }
.block-editor .be-delimiter { border: none; border-top: 1px solid var(--borde); margin: 32px 0; }
.block-editor .be-image { margin: 24px 0; }
.block-editor .be-image img { width: 100%; }
.block-editor .be-image figcaption { font-size: 12px; color: var(--borde-medio); margin-top: 8px; text-align: center; }
.block-editor .be-table { overflow-x: auto; margin: 24px 0; }
.block-editor table { width: 100%; border-collapse: collapse; font-size: 14px; }
.block-editor th { background: var(--texto); color: var(--fondo); padding: 10px 16px; text-align: left; font-family: var(--f-display); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
.block-editor td { padding: 10px 16px; border-bottom: 1px solid var(--borde); }
.block-editor .plain-text { white-space: pre-wrap; }
</style>
