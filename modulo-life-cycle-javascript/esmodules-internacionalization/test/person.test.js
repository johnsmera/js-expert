import { describe, it } from 'mocha'
import { expect } from 'chai'
import Person from '../src/person.js'

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Aviao 2000000 2020-01-01 2020-02-01'
    )

    const expected = {
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Aviao'],
      kmTraveled: "2000000",
      id: '1'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Aviao 2000000 2020-01-01 2020-02-01'
    )

    const result = person.formatted('pt-BR')

    const expected = {
      id: 1,
      vehicles: 'Bike e Aviao',
      kmTraveled: '2.000.000 km',
      from: '01 de janeiro de 2020',
      to: '01 de fevereiro de 2020'
    }

    expect(result).to.be.deep.equal(expected)
  })
})