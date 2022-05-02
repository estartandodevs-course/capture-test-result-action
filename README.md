# capture-test-result-action

Uma GitHub action para capturar o resultado dos testes do jest exportados para um arquivo `.json`.

Essa ação foi criada para ajudar a avaliar os trabalhos dos alunos.

## Configuração para jest

```json
"scripts": {
    "test": "jest --json --outputFile=/tmp/result.json"
  }
```

## Como usar

```yml
on:
  pull_request:
    branches: [main]

jobs:
  evaluator:
    runs-on: ubuntu-latest
    name: Evaluator JOB
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: "14.x"
      - name: Install dependencies
        run: npm install
      - name: Test
        run: npm rum test
      - name: Read result with capture-test-result-action
        id: resultOutput
        uses: estartandodevs-course/capture-test-result-action@v1.0.0
        with:
          resultPath: /tmp/result.json

```

## Usando valores capturados
>obs: O valor retornado é o [valor gerado pelo jest](https://jestjs.io/pt-BR/docs/configuration#testresultsprocessor-string) que é lido e retornado com `JSON.stringify` 

```yml
      - name: Create comment
        uses: peter-evans/create-or-update-comment@v2
        with:
          token: ${{ secrets.GH_TOKEN }}
          issue-number: ${{ github.event.number }}
          body:  ${{ steps.resultOutput.outputs.resultOfOutputTests }}

```

### Valores de entrada

| Name | Description | Default |
| --- | --- | --- |
| `resultPath` | caminho para o arquivo exportado pelo jest | `./result.json` |

