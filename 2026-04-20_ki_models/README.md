# Konfiguration von KI-Providern

Dieser Ordner enthält Konfigurationen für verschiedene freie KI-Model-Provider.

## Provider-Konfiguration

Die `providers.txt` enthält die Konfiguration für vier verschiedene KI-Provider:

```
# providers.txt - KI-Provider Konfiguration

PROVIDER_1=openai
PROVIDER_1_URL=https://api.openai.com/v1
PROVIDER_1_KEY=${OPENAI_API_KEY}

PROVIDER_2=anthropic
PROVIDER_2_URL=https://api.anthropic.com/v1
PROVIDER_2_KEY=${ANTHROPIC_API_KEY}

PROVIDER_3=google
PROVIDER_3_URL=https://generativelanguage.googleapis.com/v1
PROVIDER_3_KEY=${GOOGLE_API_KEY}

PROVIDER_4=huggingface
PROVIDER_4_URL=https://api-inference.huggingface.co
PROVIDER_4_KEY=${HUGGINGFACE_API_KEY}
```

## Testdaten

In der `KI_Models_Speed.md` sind die Ergebnisse aus dem Leistungstest dokumentiert.
