<template>
  <div>
    <!-- Hero -->
    <div class="page-hero">
      <div class="label-row"><div class="label-line"></div><span class="label-text light">Escríbenos</span></div>
      <h1 class="page-title">¿Tienes un proyecto<br><em>en mente?</em></h1>
      <p class="page-desc">Cuéntanos tu idea. Te contactamos en menos de 24 horas hábiles.</p>
    </div>

    <!-- Layout -->
    <div class="contacto-layout">
      <!-- Info -->
      <div class="contacto-left">
        <h2 class="left-title">Hablemos<br>de tu <em>obra</em></h2>
        <p class="left-desc">Nuestro equipo está listo para ayudarte a materializar tu proyecto.</p>
        <div class="cinfo">
          <div class="cinfo-item">
            <div class="cinfo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div><div class="cinfo-lbl">Ubicación</div><div class="cinfo-val">Región de Los Ríos, Chile</div></div>
          </div>
          <div class="cinfo-item">
            <div class="cinfo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <div><div class="cinfo-lbl">Teléfono</div><div class="cinfo-val"><a href="tel:+56959266213">+56 9 5926 6213</a></div></div>
          </div>
          <div class="cinfo-item">
            <div class="cinfo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
            </div>
            <div><div class="cinfo-lbl">Correo</div><div class="cinfo-val"><a href="mailto:inmobiliariayconstructoraryj@gmail.com">inmobiliariayconstructoraryj@gmail.com</a></div></div>
          </div>
          <div class="cinfo-item">
            <div class="cinfo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <div><div class="cinfo-lbl">Horario</div><div class="cinfo-val">Lunes a Viernes · 9:00 – 18:00</div></div>
          </div>
        </div>
      </div>

      <!-- Formulario -->
      <div class="contacto-right">
        <div class="form-title">Solicitar cotización</div>
        <p class="form-sub">Los campos con * son obligatorios.</p>

        <form @submit.prevent="handleSubmit">
          <div class="form-grid">
            <div class="fg">
              <label class="flabel">Nombre *</label>
              <input v-model="form.nombre" type="text" class="finput" placeholder="Juan Pérez" required>
            </div>
            <div class="fg">
              <label class="flabel">Teléfono *</label>
              <input v-model="form.telefono" type="tel" class="finput" placeholder="+56 9 1234 5678" required>
            </div>
            <div class="fg full">
              <label class="flabel">Correo electrónico *</label>
              <input v-model="form.email" type="email" class="finput" placeholder="juan@ejemplo.cl" required>
            </div>
            <div class="fg full">
              <label class="flabel">Tipo de proyecto *</label>
              <div class="fsel-wrap">
                <select v-model="form.tipo" class="fselect" required>
                  <option value="">Selecciona una opción</option>
                  <option>Casa habitación</option>
                  <option>Edificio residencial</option>
                  <option>Obra comercial</option>
                  <option>Remodelación</option>
                  <option>Proyecto industrial</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>
            <div class="fg full">
              <label class="flabel">Ciudad / Región</label>
              <input v-model="form.ciudad" type="text" class="finput" placeholder="Santiago, RM">
            </div>
            <div class="fg full">
              <label class="flabel">Cuéntanos sobre tu proyecto *</label>
              <textarea v-model="form.mensaje" class="ftextarea" placeholder="Superficie aproximada, plazos, detalles relevantes..." required></textarea>
            </div>
            <div class="fg full">
              <label class="fcheck">
                <input v-model="form.privacidad" type="checkbox" required>
                <span>Acepto que mis datos sean utilizados para contactarme sobre mi solicitud, de acuerdo con la política de privacidad.</span>
              </label>
            </div>
            <div class="fg full">
              <!-- Error -->
              <div v-if="errorMsg" class="form-error"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg> {{ errorMsg }}</div>
              <!-- Submit -->
              <button type="submit" class="btn-submit" :disabled="loading || sent">
                <span v-if="loading">Enviando...</span>
                <span v-else-if="sent" class="btn-inline"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg> ¡Enviado!</span>
                <span v-else class="btn-inline">Enviar solicitud <IconArrow /></span>
              </button>
              <!-- Éxito -->
              <Transition name="fade">
                <div v-if="sent" class="form-ok">
                  <strong>¡Solicitud enviada!</strong><br>
                  Te contactaremos en menos de 24 horas hábiles.
                </div>
              </Transition>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
usePaginaSeo({
  titulo: 'Contacto y Cotización de Casas | R&J Constructora',
  descripcion: 'Cotiza la construcción de tu casa en Valdivia y la Región de Los Ríos. Escríbenos por WhatsApp, teléfono o correo. Atención de lunes a viernes de 9:00 a 18:00.'
})

const loading  = ref(false)
const sent     = ref(false)
const errorMsg = ref('')

const form = reactive({
  nombre:     '',
  telefono:   '',
  email:      '',
  tipo:       '',
  ciudad:     '',
  mensaje:    '',
  privacidad: false,
})

async function handleSubmit() {
  loading.value  = true
  errorMsg.value = ''

  try {
    // Llama a /server/api/contact.post.ts
    await $fetch('/api/contact', {
      method:  'POST',
      body: {
        nombre:   form.nombre,
        telefono: form.telefono,
        email:    form.email,
        tipo:     form.tipo,
        ciudad:   form.ciudad,
        mensaje:  form.mensaje,
      },
    })

    sent.value = true
    Object.assign(form, { nombre: '', telefono: '', email: '', tipo: '', ciudad: '', mensaje: '', privacidad: false })

    // Reset después de 6 segundos
    setTimeout(() => { sent.value = false }, 6000)

  } catch (err: any) {
    errorMsg.value = err?.data?.message || 'Error al enviar. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-hero {
  padding: 140px 6vw 80px;
  background: var(--texto);
  position: relative; overflow: hidden;
}
.page-hero::before {
  content: 'CONTACTO'; position: absolute; bottom: -20px; right: 4vw;
  font-family: var(--f-display); font-size: clamp(80px, 12vw, 160px);
  font-weight: 900; color: rgba(255,255,255,0.04); pointer-events: none;
}
.label-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.label-line { width: 30px; height: 2px; background: var(--acento); }
.label-text.light { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--borde-medio); }
.page-title { font-family: var(--f-display); font-size: clamp(48px, 6vw, 88px); font-weight: 900; text-transform: uppercase; color: white; line-height: 0.93; letter-spacing: -0.02em; margin-bottom: 18px; }
.page-title em { font-style: normal; color: var(--acento); }
.page-desc { font-size: 16px; color: var(--borde-medio); font-weight: 300; max-width: 480px; }

.contacto-layout { display: grid; grid-template-columns: 1fr 1.2fr; min-height: 600px; }

.contacto-left { background: var(--texto); padding: 72px 5vw; position: relative; overflow: hidden; }
.contacto-left::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.1); }
.left-title { font-family: var(--f-display); font-size: clamp(32px, 4vw, 52px); font-weight: 900; text-transform: uppercase; color: white; line-height: 1; margin-bottom: 14px; position: relative; }
.left-title em { font-style: normal; color: var(--acento); }
.left-desc { font-size: 15px; color: var(--borde-medio); font-weight: 300; margin-bottom: 44px; position: relative; }
.cinfo { display: flex; flex-direction: column; gap: 18px; position: relative; }
.cinfo-item { display: flex; align-items: center; gap: 14px; }
.cinfo-icon { width: 40px; height: 40px; background: rgba(74, 124, 35, 0.15); border: 1px solid rgba(74, 124, 35, 0.25); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--acento); }
.cinfo-icon svg { width: 18px; height: 18px; }
.cinfo-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--borde-medio); margin-bottom: 3px; }
.cinfo-val { font-size: 14px; color: rgba(247,244,239,0.8); font-weight: 300; }
.cinfo-val a { color: rgba(247,244,239,0.8); text-decoration: none; }
.cinfo-val a:hover { color: var(--acento); }

.contacto-right { background: var(--fondo-puro); padding: 72px 5vw; }
.form-title { font-family: var(--f-display); font-size: 30px; font-weight: 800; text-transform: uppercase; color: var(--texto); margin-bottom: 6px; }
.form-sub { font-size: 13px; color: var(--texto-suave); margin-bottom: 30px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fg { display: flex; flex-direction: column; gap: 5px; }
.fg.full { grid-column: span 2; }
.flabel { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--texto-suave); }
.finput, .fselect, .ftextarea {
  width: 100%; padding: 13px 14px;
  border: 1.5px solid var(--borde); background: var(--fondo);
  font-family: var(--f-body); font-size: 14px; color: var(--texto);
  outline: none; transition: border-color 0.2s; border-radius: 0; appearance: none;
}
.finput:focus, .fselect:focus, .ftextarea:focus { border-color: var(--acento); }
.ftextarea { min-height: 110px; resize: vertical; }
.fsel-wrap { position: relative; }
.fsel-wrap::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--texto-suave); pointer-events: none; }
.fcheck { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
.fcheck input { width: 17px; height: 17px; accent-color: var(--acento); flex-shrink: 0; margin-top: 2px; }
.fcheck span { font-size: 12px; color: var(--texto-suave); line-height: 1.5; }
.btn-submit {
  width: 100%; padding: 17px; background: var(--acento); border: none;
  font-family: var(--f-display); font-size: 16px; font-weight: 800;
  letter-spacing: 0.12em; text-transform: uppercase; color: white;
  cursor: pointer; transition: opacity 0.2s, transform 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.btn-submit:hover:not(:disabled) { opacity: 0.85; transform: translateY(-2px); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-inline { display: inline-flex; align-items: center; gap: 8px; }
.form-error svg { vertical-align: -3px; margin-right: 4px; }
.form-error { background: #fff5f5; border: 1.5px solid #fca5a5; padding: 12px 16px; font-size: 13px; color: #b91c1c; margin-bottom: 8px; }
.form-ok { background: #f0fdf4; border: 1.5px solid #86efac; padding: 16px 18px; font-size: 14px; color: #166534; margin-top: 14px; line-height: 1.6; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s, transform 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }

@media (max-width: 960px) {
  .contacto-layout { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .fg.full { grid-column: span 1; }
}
</style>
