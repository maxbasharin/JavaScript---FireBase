import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../templates/post.template'

export class FavoriteComponent extends Component {
  constructor(id, options) {
    super(id)
    this.loader = options.loader
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this))
  }

  async onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const html = renderList(favorites)
    this.$el.innerHTML = html
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

async function linkClickHandler(event) {
  event.preventDefault()

  if (event.target.classList.contains('js-link')) {
    const postId = event.target.textContent
    this.$el.innerHTML = ''
    this.loader.show()
    try {
      const post = await apiService.fetchPostById(postId)
      this.$el.insertAdjacentHTML('afterbegin', renderPost(post, { withButton: true }))
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      this.loader.hide()
    }
  }
}

function renderList(list = []) {
  if (list.length) {
    return `
      <ul>
        ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
      </ul>
    `;
  }
  return `<p class="center">Вы пока ничего не добавили</p>`;
}
