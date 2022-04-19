import { RequiredStringValidator, Validator } from '@/application/validation'

class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) { }

  static of (params: { value: string, filedName: string }): ValidationBuilder {
    return new ValidationBuilder(params.value, params.filedName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder.of({ value: 'any_value', filedName: 'any_name' }).required().build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })
})
