import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here'

if (!process.env.ENCRYPTION_KEY) {
  console.warn('Warning: ENCRYPTION_KEY environment variable not set. Using default key for development.')
}

export function encrypt(text: string): { encrypted: string; iv: string; tag: string } {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(ALGORITHM, SECRET_KEY)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const tag = cipher.getAuthTag()
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  }
}

export function decrypt(encryptedData: { encrypted: string; iv: string; tag: string }): string {
  const decipher = crypto.createDecipher(ALGORITHM, SECRET_KEY)
  decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'))
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

export function encryptConfig(config: any): any {
  const encryptedConfig = { ...config }
  
  // Encrypt sensitive fields
  if (config.personalAccessToken) {
    encryptedConfig.personalAccessToken = encrypt(config.personalAccessToken)
  }
  
  if (config.apiToken) {
    encryptedConfig.apiToken = encrypt(config.apiToken)
  }
  
  return encryptedConfig
}

export function decryptConfig(config: any): any {
  const decryptedConfig = { ...config }
  
  // Decrypt sensitive fields
  if (config.personalAccessToken && typeof config.personalAccessToken === 'object') {
    decryptedConfig.personalAccessToken = decrypt(config.personalAccessToken)
  }
  
  if (config.apiToken && typeof config.apiToken === 'object') {
    decryptedConfig.apiToken = decrypt(config.apiToken)
  }
  
  return decryptedConfig
}