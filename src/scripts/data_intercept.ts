/* This code is intended to be injected via a content script 
and is used to intercept data from network responses
*/
const requestBodyMap = new WeakMap<XMLHttpRequest, string>();

(function () {
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  const graphqlURLMatch = (url: string) =>
    url.includes("/graphql") || url.includes("graphql");

  const isGraphQL = new WeakMap<XMLHttpRequest, boolean>();

  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string,
    async?: boolean,
    user?: string | null,
    password?: string | null
  ) {
    isGraphQL.set(this, graphqlURLMatch(url));
    return originalOpen.apply(this, arguments as any);
  };

  XMLHttpRequest.prototype.send = function (body?: Document | BodyInit | null) {
    if (isGraphQL.get(this)) {
      if (typeof body === "string") {
        requestBodyMap.set(this, body);
      }

      this.addEventListener("load", () => {
        try {
          // const rawBody = requestBodyMap.get(this);
          // const parsedBody = rawBody ? JSON.parse(rawBody) : null;
          // console.log("%c[GraphQL XHR Request]", "color: orange;", parsedBody);

          const jsonResponse = JSON.parse(this.responseText);
          const { data } = jsonResponse;
          const url = window.location.href;
          data.sparkieURL = url;

          if (data["animalById"]) {
            console.log("%c[GraphQL XHR Response]", "color: green;", data);
            dispatchSinglePetData(data.animalById);
          }

          if (data["animalMany"]) {
            console.log("%c[GraphQL XHR Response]", "color: green;", data);
            dispatchMultiPetData(data.animalMany);
          }
        } catch (e) {
          console.warn("[GraphQL XHR Interception Error]", e);
        }
      });
    }

    return originalSend.apply(this, arguments as any);
  };

  console.log(
    "%c[XMLHttpRequest Interceptor for GraphQL Active]",
    "color: purple;"
  );

  const dispatchSinglePetData = function (data: any) {
    // // send to background service worker
    // data.created = new Date().toLocaleString();

    document.dispatchEvent(
      new CustomEvent("DISPATCH_SINGLE_PET_DATA", { detail: data })
    );
  };

  const dispatchMultiPetData = function (data: any) {
    // // send to background service worker
    // data.created = new Date().toLocaleString();

    document.dispatchEvent(
      new CustomEvent("DISPATCH_MULTI_PET_DATA", { detail: data })
    );
  };
})();
