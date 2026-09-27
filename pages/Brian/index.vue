<template>
  <div class="login">
    <div class="login-card">
      <img src="/images/logosinfondo.png" alt="Logo" class="login-logo" />
      <h1 class="login-title">Panel de administración</h1>
      <p class="login-sub">Ingresa con tu cuenta para gestionar proyectos y modelos.</p>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">Email</label>
          <div class="input-icono">
            <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <input id="email" v-model="email" type="email" autocomplete="email" placeholder="tu@email.com" required />
          </div>
        </div>

        <div class="field">
          <label for="password">Contraseña</label>
          <div class="input-icono">
            <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
            <input
              id="password"
              v-model="password"
              :type="verPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Tu contraseña"
              required
            />
            <button
              type="button"
              class="btn-ver"
              :aria-label="verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="verPassword = !verPassword"
            >
              <svg v-if="!verPassword" class="ic" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else class="ic" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
              </svg>
            </button>
          </div>
        </div>

        <p v-if="error" class="error">
          <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <path d="M12 9v4M12 17h.01" />
          </svg>
          {{ error }}
        </p>

        <button type="submit" :disabled="loading" class="btn-login">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <NuxtLink to="/" class="volver">
        <svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Volver al sitio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Ingresar — Panel de administración',
  // El panel no usa el preloader del sitio: sin esta clase, <main> queda oculto
  bodyAttrs: { class: 'preloader-done' }
})
useSeoMeta({ robots: 'noindex, nofollow' })

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const verPassword = ref(false)
const loading = ref(false)
const error = ref('')

// Verificar si ya está logueado
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    router.push('/Brian/dashboard')
  }
})

async function handleLogin() {
  loading.value = true
  error.value = ''

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (authError) {
    console.error('Auth error:', authError)
    error.value = authError.message === 'Invalid login credentials'
      ? 'Email o contraseña incorrectos'
      : `Error: ${authError.message}`
    loading.value = false
    return
  }

  router.push('/Brian/dashboard')
}
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background:
    radial-gradient(circle at 20% 20%, rgba(43, 95, 0, 0.35), transparent 45%),
    radial-gradient(circle at 80% 90%, rgba(43, 95, 0, 0.2), transparent 40%),
    #1c1a17;
  font-family: 'DM Sans', system-ui, sans-serif;
}

.login *,
.login *::before,
.login *::after {
  box-sizing: border-box;
}

.ic {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px 36px 28px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  text-align: center;
}

.login-logo {
  display: block;
  width: 200px;
  height: auto;
  margin: 0 auto 18px;
}

.login-title {
  margin: 0 0 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 30px;
  font-weight: 800;
  text-transform: uppercase;
  color: #1c1a17;
}

.login-sub {
  margin: 0 0 28px;
  font-size: 14px;
  color: #7a746b;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field label {
  font-size: 12px;
  font-weight: 700;
  color: #2d2a26;
}

.input-icono {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icono > .ic {
  position: absolute;
  left: 13px;
  width: 17px;
  height: 17px;
  color: #9a948a;
  pointer-events: none;
}

.input-icono input {
  width: 100%;
  padding: 13px 44px 13px 40px;
  border: 1px solid #e6e1d8;
  border-radius: 10px;
  background: #f7f5f1;
  font: inherit;
  font-size: 15px;
  color: #1c1a17;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}

.input-icono input:focus {
  outline: none;
  border-color: #2b5f00;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(43, 95, 0, 0.12);
}

.btn-ver {
  position: absolute;
  right: 6px;
  display: flex;
  padding: 8px;
  border: none;
  background: transparent;
  color: #9a948a;
  cursor: pointer;
}

.btn-ver:hover {
  color: #2b5f00;
}

.error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 11px 13px;
  border-radius: 10px;
  background: #fdf1ef;
  color: #b0321f;
  font-size: 13px;
}

.btn-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #2b5f00;
  color: #ffffff;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-login:hover:not(:disabled) {
  background: #234e00;
}

.btn-login:disabled {
  opacity: 0.75;
  cursor: wait;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

.volver {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  font-size: 13px;
  color: #7a746b;
  text-decoration: none;
}

.volver .ic {
  width: 15px;
  height: 15px;
}

.volver:hover {
  color: #2b5f00;
}
</style>
