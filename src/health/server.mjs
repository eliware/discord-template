import { createServer } from "node:http";

function respond(response, status, body) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json",
  });
  response.end(JSON.stringify({ status: body }));
}

export function createHealthServer({
  host = "0.0.0.0",
  port = 1030,
  serverFactory = createServer,
} = {}) {
  let ready = false;
  let closePromise;
  const server = serverFactory((request, response) => {
    const path = request.url?.split("?", 1)[0];
    if (request.method !== "GET") {
      response.writeHead(405, {
        allow: "GET",
        "cache-control": "no-store",
        "content-type": "application/json",
      });
      response.end(JSON.stringify({ status: "method not allowed" }));
      return;
    }
    if (path === "/health") {
      respond(response, 200, "ok");
      return;
    }
    if (path === "/ready") {
      respond(response, ready ? 200 : 503, ready ? "ready" : "not ready");
      return;
    }
    respond(response, 404, "not found");
  });

  return {
    start: () =>
      new Promise((resolve, reject) => {
        const onError = (error) => {
          server.off("listening", onListening);
          reject(error);
        };
        const onListening = () => {
          server.off("error", onError);
          resolve();
        };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port, host);
      }),
    close: () => {
      if (!closePromise) {
        closePromise = new Promise((resolve, reject) => {
          if (!server.listening) {
            resolve();
            return;
          }
          server.close((error) => (error ? reject(error) : resolve()));
        });
      }
      return closePromise;
    },
    setReady(value) {
      ready = Boolean(value);
    },
    address: () => server.address(),
  };
}
