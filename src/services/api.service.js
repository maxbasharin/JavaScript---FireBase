class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async createPost(post) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' } // Добавьте заголовок, чтобы указать тип содержимого
      });
      return await useRequest(request);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  async fetchPosts() {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'GET'
      });
      return await useRequest(request);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
}

async function useRequest(request) {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Вызовите json() как функцию
  } catch (error) {
    console.error('Error with fetch operation:', error);
    throw error; // Пробросите ошибку дальше
  }
}

export const apiService = new ApiService('https://max-blog-js-default-rtdb.europe-west1.firebasedatabase.app/');
