const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Use environment variable for Unsplash API key

const searchForm = document.getElementById("searchForm");
const imageResults = document.getElementById("imageResults");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("query").value;
  searchImages(query);
});

async function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Improved error handling
    }
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error("Error fetching images:", error); // Check for network issues or API errors
    alert(
      "Failed to fetch images. Please check your network connection and API key."
    ); // User-friendly error message
  }
}

function displayImages(images) {
  imageResults.innerHTML = "";

  if (images.length === 0) {
    imageResults.innerHTML = "<p>No images found.</p>";
    return;
  }

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    imgElement.classList.add("rounded-lg", "shadow-md");
    imageResults.appendChild(imgElement);
  });
}
