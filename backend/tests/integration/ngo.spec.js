/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('NGO', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      .send({
        name: 'APAE',
        email: 'apae@gmail.com',
        password: '1numeroeletras',
        whatsapp: '12345678901',
        city: 'Tatuí',
        uf: 'SP'
      })

    expect(response.body).toHaveProperty('token')
    expect(response.body.token).toHaveLength(137)
  })
})
