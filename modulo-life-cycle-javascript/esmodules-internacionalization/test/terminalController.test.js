import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import TerminalController from '../src/terminalController.js'

describe('TerminalController', () => {
  it('should update table data', () => {
    const terminalController = new TerminalController()
    terminalController.initializeTerminal([], 'pt-BR')

    terminalController.updateTable('any data')

    const expected = terminalController.data.find(item => item === 'any data')

    expect(expected).to.be.ok
  })

  it('should call the close method of the terminal', () => {
    const terminalController = new TerminalController()
    terminalController.initializeTerminal([], 'pt-BR')

    const spy = sinon.spy(terminalController.terminal, terminalController.terminal.close.name)

    terminalController.closeTerminal()

    expect(spy.calledOnce).to.be.ok
  })

  it('should return table options', () => {
    const terminalController = new TerminalController()
    terminalController.initializeTerminal([], 'pt-BR')

    const expected = {
      leftPad: 2,
      columns: [
        { field: 'id', name: '' },
        { field: 'vehicles', name: '' },
        { field: 'kmTraveled', name: '' },
        { field: 'from', name: '' },
        { field: 'to', name: '' }
      ]
    }

    sinon.stub(terminalController, terminalController.getTableOptions.name).returns(expected)

    const result = terminalController.getTableOptions()

    expect(result).to.be.equal(expected)
  })

  it('should format data when inicialize', () => {
    const terminalController = new TerminalController()

    sinon.spy(terminalController, terminalController.setFormattedData.name)

    const data = [
      {
        id: 1,
        vehicles: ['Ferrari', 'Bugatti'],
        kmTraveled: '10',
        from: '2000-01-01',
        to: '2000-01-03'
      },
      {
        id: 2,
        vehicles: ['Ferrari', 'Bugatti'],
        kmTraveled: '10',
        from: '2000-01-01',
        to: '2000-01-03'
      },
    ]

    terminalController.initializeTerminal(data, 'pt-BR')

    expect(terminalController.setFormattedData.callCount).to.be.equal(1)
  })

  it('should return empty string when question method is called without msg', async () => {
    const terminalController = new TerminalController()
    terminalController.initializeTerminal([], 'pt-BR')

    const result = await terminalController.question()

    expect(result).to.be.equal('')
  })

  it('should call the question method of the terminal with msg provided', () => {
    const terminalController = new TerminalController()
    terminalController.initializeTerminal([], 'pt-BR')

    sinon.spy(terminalController.terminal, terminalController.terminal.question.name)

    terminalController.question('any msg')

    expect(terminalController.terminal.question.calledOnce).to.be.ok
  })

})
