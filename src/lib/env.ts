import "server-only"


function requiredEnv(name:string): string{
 const value = process.env[name]?.trim()
 if(!value) {
 throw new Error(`Missing required environment variable: ${name}. ` +
        "Add it to .env.local and restart the Next.js server.",)
 }
 return value
}

export const env = {
 STRAPI_URL : requiredEnv("STRAPI_URL").replace("/\/+$/", ""),
 STRAPI_API_TOKEN : requiredEnv("STRAPI_API_TOKEN")
}