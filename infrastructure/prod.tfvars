environment = "prod"

api_origin = "api.pond.md"

env = [
  {
    name  = "AUTH0_AUDIENCE"
    value = "https://pond.md"
  },
  {
    name  = "AUTH0_CLIENT_ID"
    value = "W8IrKaMEresHMDGbIx1DK3LaiPzAiGrU"
  },
  {
    name  = "AUTH0_DOMAIN"
    value = "auth.pond.md"
  },
  {
    name  = "AUTH0_REDIRECT_URI"
    value = "https://pond.md/"
  },
  # {
  #   name = "AUTH0_M2M_CLIENT_ID"
  #   value = "LZISfyFi0pwssZwmbmHgwYzdMDZCsVXR"
  # },
  {
    name = "COOKIE_DOMAIN"
    value = ".pond.md"
  },
  {
    name = "GTAG"
    value = "G-EKHB8NF7SS"
  },
  {
    name = "ENVIRONMENT"
    value = "production"
  },
  {
    name = "SENTRY_DSN"
    value = "https://c74903878ed140e28db9c9e079ecc12b@o440254.ingest.sentry.io/5415310"
  },
  {
    name = "SNAPENGAGE"
    value = "3f8f5c84-3340-4010-a894-8a48909830bf"
  },
  {
    name = "PENDO"
    value = "77a4beb2-3d2a-42ee-5c54-d4fd20aedfdd"
  },
  {
    name = "FEATURE_FLAGS"
    value = "{\"patientArchive\": true, \"visitAndSessionArchive\": true, \"visitsArchive\": true, \"sessionsArchive\": true, \"patientDetails\": true, \"shareVideoLink\":[19, 6],\"videoInvitation\":false,\"editPatientDetails\":false }"
  }
]

instance_count = 3
