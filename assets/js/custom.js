const accessKey = 'vEXnECG_5Bszh_LnLigVGzS96DVrxyWIEN4ZdI_iass'; // Replace with your Unsplash API key

const searchForm = document.getElementById('searchForm');
const imageResults = document.getElementById('imageResults');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('query').value;
  searchImages(query);
});

async function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  imageResults.innerHTML = '';

  if (images.length === 0) {
    imageResults.innerHTML = '<p>No images found.</p>';
    return;
  }

  images.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    imgElement.classList.add('rounded-lg', 'shadow-md');
    imageResults.appendChild(imgElement);
  });
}
