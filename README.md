# Mega Nice URL

## Install

`npm install mega-nice-url`

## Overview

### Create

```typescript
import Url from 'mega-nice-url'

let url = new Url('http://yourdomain.com:8080/path/to/somehting)

url.protocol == 'http://'
url.domain == 'yourdomain.com'
url.port == '8080'
url.path == ['path', 'to', 'something']
url.parameters == {} // instance of UrlParameters
```

### Modify

```typescript
url.protocol = 'https://'
url.port = undefined
url.path[2] = 'somethingElse'
url.parameters.bidHeight = 5
url.parameters.amount = 1000

url.toString() == 'https://yourdomain.com/path/to/somethingElse?bidHeight=5&amount=1000'
```