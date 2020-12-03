export default function({ $axios, store }) {
  let loadingCount = 0;
  $axios.onRequest(config => {
    loadingCount++;
    console.log("request");
    // store.commit("showloading", true);
    return config;
  });

  $axios.onResponse(response => {
    console.log(store.state)
    if (--loadingCount < 1) {
      // store.commit("showloading", false);
    }
    if (response.status === 200) {
      return response.data;
    }
  });

  $axios.onError(error => {
    // store.commit("showloading", false);
    return Promise.reject(error);
  });
}
