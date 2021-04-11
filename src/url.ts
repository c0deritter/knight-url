export default class Url {

  protocol?: string
  domain?: string
  port?: string
  path: string[] = []
  parameters: UrlParameters = new UrlParameters

  constructor(urlString?: string) {
    if (urlString != undefined) {
      let nativeUrl = new URL(urlString)

      this.protocol = nativeUrl.protocol + '//'
      this.domain = nativeUrl.hostname
      this.port = nativeUrl.port
      this.path = nativeUrl.pathname.split('/')
      nativeUrl.searchParams.forEach((value, key) => this.parameters[key] = value)
    }
  }

  toString(): string {
    let urlString = ""

    if (this.protocol != undefined) {
      urlString += this.protocol
    }

    if (this.domain != undefined) {
      urlString += this.domain
    }

    if (this.port != undefined) {
      urlString += this.port
    }

    if (this.path != undefined) {
      urlString += this.path.join('/')
    }

    urlString += this.parameters.toString()

    return urlString
  }
}

class UrlParameters {
  
  [name: string]: any

  get names(): string[] {
    let names = []

    for (let field in this) {
      if (this.hasOwnProperty(field)) {
        names.push(field)
      }
    }

    return names
  }

  count() {
    return this.names.length
  }

  feed(parameters: { [name: string]: any }) {
    for (let field in parameters) {
      if (parameters.hasOwnProperty(field)) {
        this[field] = parameters[field]
      }
    }
  }

  remove(name: string) {
    this[name] = undefined
  }

  toString(): string {
    let parameterString = ""
    let names = this.names

    if (names.length > 0) {
      parameterString = "?"
      let first = true

      for (let name of names) {
        if (! first) {
          parameterString += "&"
        }

        let parameterValue = this[name]

        if (parameterValue != undefined) {
          if (parameterValue instanceof Date) {
            parameterValue = parameterValue.toISOString()
          }
          else if (parameterValue != undefined && typeof parameterValue.toString === 'function') {
            parameterValue = parameterValue.toString()
          }
        }

        parameterString += name + "=" + parameterValue
        first = false
      }
    }

    return parameterString
  }
}