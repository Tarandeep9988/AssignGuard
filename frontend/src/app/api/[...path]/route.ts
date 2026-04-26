
async function proxy(req: Request, params: Promise<{ path : string[]}>) {
  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    console.warn('BACKEND_URL is not defined in environment variables. Please set it to the backend server URL.');
    return new Response('Internal Server Error: BACKEND_URL is not defined', { status: 500 });
  }
  const { search } = new URL(req.url);
  const { path } = await params;

  const urlForBackend = `${BACKEND_URL}/api/${path.join('/')}${search}`;

  console.log(`Proxying request to: ${urlForBackend}`);


  const res = await fetch(urlForBackend, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: ['GET', 'HEAD'].includes(req.method)
      ? undefined
      : await req.text(),
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}




export async function GET(req: Request, { params }: any) {
  console.log("get Hitting");
  return proxy(req, params);
}
export async function POST(req: Request, { params }: any) {
  
  console.log("post Hitting");
  return proxy(req, params);
}
export async function PUT(req: Request, { params }: any) {
  console.log("put Hitting");
  return proxy(req, params);
}
export async function DELETE(req: Request, { params }: any) {
  console.log("delete Hitting");
  return proxy(req, params);
}