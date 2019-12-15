import ApiUrls from "./ApiUrls";

class Api {
  static headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      dataType: "json"
    };
  }

  static get(route) {
    return this.callApi(route, null, "GET");
  }

  static put(route, params) {
    return this.callApi(route, params, "PUT");
  }

  static post(route, params) {
    return this.callApi(route, params, "POST");
  }

  static postWithToken(route, params, token) {
    return this.callApi(route, params, token, "POST");
  }

  static delete(route, params) {
    return this.callApi(route, params, "DELETE");
  }


  
  static callApi(route, params, verb) {
    /* global fetch */
    const host = ApiUrls.hostURL;
    const url = `${host}${route}`;
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    );
    options.headers = Api.headers();
    return fetch(url, options)
      .then(resp => {
        const json = resp.json();
        if (resp.ok) {
          return json;
        }
        return json.then(err => {
          throw err;
        });
      })
      .then(json => json);
  }
}
export default Api;
