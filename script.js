const productsContainer = document.querySelector(".products")
const searchInput = document.querySelector(".search")
const categoriesContainer = document.querySelector(".cats")
const priceRange = document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")


const data = [
  {
    id: 1,
    name: "BENYAR Mens Watch Analog Quartz",
    img: "https://m.media-amazon.com/images/I/71kr300JDCL._AC_UX569_.jpg",
    price: 39,
    cat: "Sport"
  },

  {
    id: 2,
    name: "Timex Easy Reader",
    img: "https://m.media-amazon.com/images/I/61563iDEhOL._AC_UY679_.jpg",
    price: 67,
    cat: "Leather"
  },

  {
    id: 3,
    name: "Beeasy Digital Watch",
    img: "https://m.media-amazon.com/images/I/71VB3NUkC9L._AC_UX679_.jpg",
    price: 27,
    cat: "Stopwatch"
  },

  {
    id: 4,
    name: "OLEVS Automatic Watch",
    img: "https://m.media-amazon.com/images/I/71BIcWVj6gL._AC_UY679_.jpg",
    price: 156,
    cat: "Sport"
  },

  {
    id: 5,
    name: "AMAZTIM Smart Watch",
    img: "https://m.media-amazon.com/images/I/71Q7JMrurtL._AC_SX425_.jpg",
    price: 195,
    cat: "Sport"
  },

  {
    id: 6,
    name: "BEN NEVIS",
    img: "https://m.media-amazon.com/images/I/61QeNWSSHaL._AC_UX679_.jpg",
    price: 129,
    cat: "Leather"
  }
]

// Display products from data array
const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts.map(product => 
    `
      <div class="product">
        <img src=${product.img} alt="">
        <span class="name">${product.name}</span>
        <span class="priceText">$${product.price}</span>
      </div>
  `).join("")
}

displayProducts(data)


// display categories
const setCategories = () => {
  const allCats = data.map(item => item.cat)
 const categories = ["All", ...allCats.filter((item, i) => {
    return allCats.indexOf(item) === i
  })]

  categoriesContainer.innerHTML = categories.map(cat => 
    `
    <span class="cat">${cat}</span>
    `
    ).join("")

    categoriesContainer.addEventListener("click", (e) => {
      const selectedCat = e.target.textContent

      selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter((item) => item.cat === selectedCat))
    })
}

setCategories()

// Search product
const search = (e) => {
  const value = e.target.value.toLowerCase()

  if(value) {
    displayProducts(data.filter(item => item.name.toLocaleLowerCase().indexOf(value) !==-1))
  }else {
    displayProducts(data)
  }
}

// set range prices
const setPrices = () => {
  const priceList = data.map((item) => item.price)
  const minPrice = Math.min(...priceList)
  const maxPrice = Math.max(...priceList)

  priceRange.min = minPrice
  priceRange.max = maxPrice
  priceRange.value = maxPrice
  priceValue.textContent = "$" + maxPrice

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value
    displayProducts(data.filter((item) => item.price <= e.target.value))
  })
}
setPrices()

searchInput.addEventListener("keyup", search)