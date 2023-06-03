const { error } = require("./src/constants");
const File = require("./src/file")
const assert = require("assert")

  ; (async () => {
    // variáveis criadas nesse bloco, só são validas durante a sua execução
    {
      const filePath = './mocks/emptyFile-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/invalid-header.csv'
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result =  File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/fiveItems-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }

    {
      const filePath = './mocks/threeItems-valid.csv'

      const expected = [
        {
          "id": "1",
          "name": "xuxa da silva",
          "profession": "developer",
          "age": "120"
        },
        {
          "id": "2",
          "name": "irineu saulo",
          "profession": "developer",
          "age": "22"
        },
        {
          "id": "3",
          "name": "joao gomes",
          "profession": "qa",
          "age": "30"
        }
      ]

      const result = await File.csvToJSON(filePath)

       assert.deepEqual(result, expected)
    }

  })()