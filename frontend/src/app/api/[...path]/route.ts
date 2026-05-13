import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000/api/v1';

async function handleProxy(req: NextRequest) {
  try {
    // Extract the path from the request URL, removing the '/api' prefix
    const path = req.nextUrl.pathname.replace(/^\/api/, '');
    const url = `${BACKEND_API_URL}${path}${req.nextUrl.search}`;

    // Forward the headers, especially the cookie
    const headers = new Headers();
    req.headers.forEach((value, key) => {
      // Do not forward host header to avoid resolving issues
      if (key.toLowerCase() !== 'host') {
        headers.set(key, value);
      }
    });

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      redirect: 'manual',
      // cache: 'no-store' is important so Next.js doesn't try to aggressively cache backend responses
      cache: 'no-store',
    };

    // Forward the body for mutation requests
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const body = await req.text();
      fetchOptions.body = body;
    }

    const backendResponse = await fetch(url, fetchOptions);

    // Read the response body
    const responseBody = await backendResponse.text();

    // Create the Next.js response
    const response = new NextResponse(responseBody, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
    });

    // Forward the response headers (crucially including Set-Cookie)
    backendResponse.headers.forEach((value, key) => {
      // Content-encoding should be handled by Next.js
      if (key.toLowerCase() !== 'content-encoding') {
        response.headers.append(key, value);
      }
    });

    return response;
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Proxy Error' }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
