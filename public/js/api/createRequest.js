/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const {url, data, responseType, method, callback} = options;  
    const requestUrl = new URL(window.location.protocol + "//" + window.location.host + url);
    
    if (method === 'GET')
      for (const key in data) {
        requestUrl.searchParams.set(key, data[key]);
      }
    
    const request = new XMLHttpRequest();
      request.responseType = responseType;

      request.onload = function() {
        callback(request.response);
    };

    const formData = new FormData();

    try {
      request.open(method, requestUrl);
      if (method === 'GET') {
        request.send();
      } else {
        for (const key in data)
          formData.append(key, data[key]);
        request.send(formData);
      }
    } catch(e) {
      callback(e);
    }
}