environment = "dev"

api_origin = "api.pond.dev"

env = [
  {
    name  = "AUTH0_AUDIENCE"
    value = "https://pond.dev"
  },
  {
    name  = "AUTH0_CLIENT_ID"
    value = "1RfkEr2kf1BwyOBGCNwHiS9mRZOaXSH6"
  },
  {
    name  = "AUTH0_DOMAIN"
    value = "auth.pond.dev"
  },
  {
    name  = "AUTH0_REDIRECT_URI"
    value = "https://pond.dev/"
  },
  # {
  #   name = "AUTH0_M2M_CLIENT_ID"
  #   value = "acUxN3q5xnK3dFUVCE1FQw2XCP8HKW14"
  # },
  {
    name = "COOKIE_DOMAIN"
    value = ".pond.dev"
  },
  {
    name = "GTAG"
    value = "G-EKHB8NF7SS"
  },
  {
    name = "ENVIRONMENT"
    value = "development"
  },
  {
    name = "SENTRY_DSN"
    value = "https://b2dfb964640046e7931742613f0887d3@o440254.ingest.sentry.io/5415310"
  },
  {
    name = "SNAPENGAGE"
    value = "de83e0c6-199c-4773-98aa-338aa314cfda"
  },
  {
    name = "PENDO"
    value = "77a4beb2-3d2a-42ee-5c54-d4fd20aedfdd"
  },
  {
    name = "FEATURE_FLAGS"
    value = "{\"patientArchive\": true, \"visitAndSessionArchive\": true, \"visitsArchive\": true, \"sessionsArchive\": true, \"patientDetails\": true, \"shareVideoLink\":true,\"videoInvitation\":true,\"editPatientDetails\":false }"
  }
]

instance_count = 1
