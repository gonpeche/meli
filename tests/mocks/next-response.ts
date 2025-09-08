export class NextResponse extends Response {
  static json(data: any, init?: ResponseInit) {
    const response = new Response(JSON.stringify(data), {
      ...init,
      headers: {
        ...init?.headers,
        'content-type': 'application/json',
      },
    })
    return response
  }
}
