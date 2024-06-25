## GIT

Criar branch

```bash
git checkout -b nome-branch
```

Deletar branch

```bash
git branch -D nome-branch
```

Histórico detalhado do repositório

```bash
git reflog
```

Log com gráfico de commits

```bash
git log --graph
```

Criar branch com base em um commit específico, para recuperar branchs apagadas

```bash
git checkout -b nome-branch hash-commit
```

## curl

Rodar comando de forma silenciosa:

```bash
curl -s https://site/api/v1/status
```

Formatar saída JSON:

```bash
curl -s https://site/api/v1/status | jq

OR

curl -s https://site/api/v1/status | python3 -m json.tool
```

Executar o comando a cada 1 segundo

```bash
watch -n 1 'curl -s https://site/api/v1/status | jq'
```

## EMOJIS

Atalho para inserir emojis no Windows: `🪟 + .`
