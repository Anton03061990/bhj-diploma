/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const {url, headers, data, responseType, method, callback} = options;  
    const requestUrl = new URL('http:/localhost:8000' + url);
    
    if (method === 'GET')
      for (const key in data) {
        requestUrl.searchParams.set(key, data[key]);
      }
    
    const request = new XMLHttpRequest;
    request.withCredentials = true; 
    
    try {
      request.open(method, requestUrl);
      for (const header in headers)
        request.setRequestHeader(header, headers[header]);
      request.responseType = responseType;
  
      if (method === 'GET') {
        request.send();
      } else {
        const formData = new FormData;
        for (const key in data)
          formData.append(key, data[key]);
        request.send(formData);
      }
    } catch(e) {
      callback(e);
    }
}