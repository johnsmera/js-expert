import readline from 'readline'
import DraftLog from 'draftlog'

import Person from './person.js'
import chalk from 'chalk'
import chalkTable from 'chalk-table'


export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
    this.terminal = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))

    const table = chalkTable(this.getTableOptions(), data)

    this.print = console.draft(table)
    this.data = data
  }

  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  getTableOptions() {
    const options = {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
        { field: 'from', name: chalk.green('From') },
        { field: 'to', name: chalk.red('To') }
      ]
    }

    return options
  }

  closeTerminal() {
    this.terminal.close()
  }
}