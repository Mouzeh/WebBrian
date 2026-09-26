<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Panel Admin</h1>
      <p class="login-sub">Ingresa tus credenciales</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="tu@email.com" required />
        </div>
        <div class="field">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="loading" class="btn-login">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
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
    error.value = `Error: ${authError.message}`
    loading.value = false
    return
  }

  router.push('/Brian/dashboard')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1C1A17;
  padding: 20px;
}

.login-card {
  background: #F7F4EF;
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
}

.login-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  color: #1C1A17;
  margin-bottom: 8px;
}

.login-sub {
  color: #6B6355;
  font-size: 14px;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6B6355;
}

.field input {
  padding: 14px 16px;
  border: 1px solid #E5E0D8;
  background: white;
  font-size: 15px;
  transition: border-color 0.2s;
}

.field input:focus {
  outline: none;
  border-color: #2b5f00;
}

.error {
  color: #c53030;
  font-size: 13px;
  margin: 0;
}

.btn-login {
  background: #2b5f00;
  color: white;
  border: none;
  padding: 16px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-login:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
