/* eslint-disable no-undef */
require('../../src/utils/dotenv')
const generateToken = require('../../src/utils/generateToken')

describe('Generate Token', () => {
  it('should generate a token', () => {
    const token = generateToken({ id: 1 })
    expect(token).toHaveLength(137)
  })
})
