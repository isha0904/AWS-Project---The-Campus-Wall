// -- API ENDPOINTS --
var API_ENDPOINT= "https://rxk4fglqj6.execute-api.eu-north-1.amazonaws.com/prod";

// ================= INDEX PAGE =================
const wall = document.getElementById("wall");

// GET POSTS
async function renderPosts(filter = "all") {
  if (!wall) return;

  wall.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${API_ENDPOINT}/posts`);
    const posts = await res.json();

    wall.innerHTML = "";

    posts.forEach((post) => {
      if (filter !== "all" && post.tag !== filter) return;

      const card = document.createElement("div");
      card.className = "post-card";
      card.onclick = () => openModal(post);

      card.innerHTML = `
        <span class="tag ${post.tag}">${post.tag}</span>
        <h3>${post.title}</h3>
        <p class="preview">${post.content.slice(0, 100)}...</p>
        <button class="delete-btn" onclick="deletePost('${post.postid}', event)">
          Delete
        </button>
      `;

      wall.appendChild(card);
    });
  } catch (err) {
    wall.innerHTML = "<p>Error loading posts</p>";
    console.error(err);
  }
}

// DELETE POST
async function deletePost(postid, event) {
  event.stopPropagation();

  if (!confirm("Delete this post?")) return;

  try {
    await fetch(`${API_ENDPOINT}/posts/${postid}`, {
      method: "DELETE",
    });

    const activeFilter =
      document.querySelector(".filter.active")?.dataset.filter || "all";

    renderPosts(activeFilter);
  } catch (err) {
    alert("Failed to delete post");
    console.error(err);
  }
}

// MODAL
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
  document.getElementById("postModal").style.display = "none";
}

// FILTER BUTTONS
document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((btn) =>
      btn.classList.remove("active")
    );
    button.classList.add("active");

    renderPosts(button.dataset.filter);
  });
});

// ================= CREATE PAGE =================
async function savePost() {
  const tag = document.querySelector("select")?.value.toLowerCase();
  const title = document.querySelector("input")?.value;
  const content = document.querySelector("textarea")?.value;

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  try {
    await fetch(`${API_ENDPOINT}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag, title, content }),
    });

    window.location.href = "index.html";
  } catch (err) {
    alert("Failed to create post");
    console.error(err);
  }
}

// ================= INITIAL LOAD =================
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});
