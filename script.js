// ---------- COMMON ----------
function $(selector) {
  return document.querySelector(selector);
}

// ---------- INDEX PAGE LOGIC ----------
const wall = document.getElementById("wall");

function renderPosts(filter = "all") {
  if (!wall) return; // prevents errors on create.html

  wall.innerHTML = "";

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.forEach((post) => {
    if (filter !== "all" && post.tag !== filter) return;

    const card = document.createElement("div");
    card.className = "post-card";
    card.onclick = () => openModal(post);

    card.innerHTML = `
      <span class="tag ${post.tag}">${post.tag}</span>
      <h3>${post.title}</h3>
      <p class="preview">${post.content.slice(0, 100)}...</p>
      <button class="delete-btn" onclick="deletePost(${post.id}, event)">Delete</button>
    `;

    wall.appendChild(card);
  });
}

function deletePost(postId, event) {
  event.stopPropagation();

  if (!confirm("Delete this post?")) return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(posts));

  const activeFilter =
    document.querySelector(".filter.active")?.dataset.filter || "all";

  renderPosts(activeFilter);
}

function openModal(post) {
  const modal = document.getElementById("postModal");
  if (!modal) return;

  modal.style.display = "flex";

  modal.querySelector(".tag").innerText = post.tag;
  modal.querySelector(".tag").className = `tag ${post.tag}`;
  modal.querySelector("h2").innerText = post.title;
  modal.querySelector(".full-text").innerText = post.content;
}

function closeModal() {
  const modal = document.getElementById("postModal");
  if (modal) modal.style.display = "none";
}

// ---------- FILTER LOGIC ----------
const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    renderPosts(filter);
  });
});

// ---------- CREATE PAGE LOGIC ----------
function savePost() {
  const tag = document.querySelector("select")?.value;
  const title = document.querySelector("input")?.value;
  const content = document.querySelector("textarea")?.value;

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  const post = {
    id: Date.now(),
    tag: tag.toLowerCase(),
    title,
    content,
  };

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  window.location.href = "index.html";
}

// ---------- INITIAL LOAD ----------
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});
