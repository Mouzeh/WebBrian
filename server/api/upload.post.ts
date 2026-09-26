import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Verificar que el usuario esté autenticado (simplificado)
  // En producción, validar el token de Supabase

  const formData = await readMultipartFormData(event)
  const file = formData?.find(f => f.name === 'file')

  if (!file || !file.data) {
    throw createError({
      statusCode: 400,
      message: 'No se recibió ningún archivo'
    })
  }

  // Generar nombre único para el archivo
  const ext = file.filename?.split('.').pop() || 'jpg'
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 8)
  const fileName = `${timestamp}-${randomStr}.${ext}`

  // Cliente S3 para R2
  const s3 = new S3Client({
    region: 'auto',
    endpoint: config.r2Endpoint,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey
    }
  })

  // Subir archivo a R2
  try {
    await s3.send(new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: fileName,
      Body: file.data,
      ContentType: file.type || 'image/jpeg'
    }))

    return { fileName }
  } catch (error: any) {
    console.error('Error subiendo a R2:', error)
    throw createError({
      statusCode: 500,
      message: 'Error al subir imagen'
    })
  }
})
