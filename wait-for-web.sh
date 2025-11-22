#!/usr/bin/env bash

API_URL="http://localhost:3333/health"

echo "Aguardando API ficar pronta em $API_URL ..."

# tenta por até 30 segundos
for i in {1..30}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)

  if [ "$STATUS" = "200" ]; then
    echo "API OK! 👍"
    exit 0
  fi

  echo "Ainda não está pronta... ($STATUS)"
  sleep 1
done

echo "ERRO: API não ficou pronta"
exit 1
