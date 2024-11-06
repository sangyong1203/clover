import { assign, get, isEmpty, isNil  } from 'lodash'
import camelcaseKeys from 'camelcase-keys'
import type { AxiosResponse } from 'axios'

export class APIResponse {
  public headers = {}
  public result = 0 
  public message = ''
  // public total = -1 //< pagination api용
  public data: any | null = null
  public parameters: string[] | null = null

  constructor(res?: Partial<AxiosResponse>) {
    
    if (isNil(res)) {
      console.error(`[Croms error]: Response Undefined\n${res}`)
      return
    }
    const result = get(res.data, 'result')
    assign(this, camelcaseKeys(result ? res.data : { data: res.data }))

    if (!isNil(res.headers)) {
      assign(this.headers, camelcaseKeys(res.headers))
    }

    if (isNil(result)) {
      this.result = res.status === 200 ? 200 : 0     
    }
}

  get isError(): boolean {
    return this.result === 200
  }

  get isFail(): boolean {
    return this.isError || isNil(this.data) || isEmpty(this.data)
  }
  
}


export const ErrorResponse = () => new APIResponse()
